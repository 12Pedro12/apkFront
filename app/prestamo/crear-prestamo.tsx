import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

type Cliente = { id: number; nombre: string };
type Cobrador = { id: number; nombre: string };

export default function CrearPrestamo() {
  const [monto, setMonto] = useState('');
  const [tasaInteres, setTasaInteres] = useState('');
  const [plazo, setPlazo] = useState('');
  const [estado, setEstado] = useState<'Activo' | 'Pagado' | 'Vencido'>('Activo');
  const [clientId, setClientId] = useState<number | null>(null);
  const [cobradorId, setCobradorId] = useState<number | null>(null);

  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cobradores, setCobradores] = useState<Cobrador[]>([]);

  useEffect(() => {
    fetch('http://192.168.100.115:8000/administrativo/clients/')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(() => Alert.alert('Error', 'No se pudieron cargar los clientes'));

    fetch('http://192.168.100.115:8000/administrativo/cobrador/')
      .then(res => res.json())
      .then(data => setCobradores(data))
      .catch(() => Alert.alert('Error', 'No se pudieron cargar los cobradores'));
  }, []);

  const handleCrearPrestamo = async () => {
    if (!monto || !tasaInteres || !plazo || !clientId || !cobradorId) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/prestamo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monto,
          tasa_interes: tasaInteres,
          plazo,
          fecha_inicio: fechaInicio.toISOString().split('T')[0],
          fecha_fin: fechaFin.toISOString().split('T')[0],
          estado,
          client_id: clientId,
          cobrador_id: cobradorId
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Préstamo creado correctamente');
        setMonto('');
        setTasaInteres('');
        setPlazo('');
        setClientId(null);
        setCobradorId(null);
      } else {
        const data = await response.json();
        Alert.alert('Error', JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Préstamo</Text>

      <TextInput placeholder="Monto" style={styles.input} value={monto} onChangeText={setMonto} keyboardType="numeric" />
      <TextInput placeholder="Tasa de Interés (%)" style={styles.input} value={tasaInteres} onChangeText={setTasaInteres} keyboardType="numeric" />
      <TextInput placeholder="Plazo (meses)" style={styles.input} value={plazo} onChangeText={setPlazo} keyboardType="numeric" />

      {/* Fecha Inicio */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowInicioPicker(true)}>
        <Text>Fecha Inicio: {fechaInicio.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showInicioPicker && (
        <DateTimePicker
          value={fechaInicio}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowInicioPicker(false);
            if (selectedDate) setFechaInicio(selectedDate);
          }}
        />
      )}

      {/* Fecha Fin */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowFinPicker(true)}>
        <Text>Fecha Fin: {fechaFin.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showFinPicker && (
        <DateTimePicker
          value={fechaFin}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowFinPicker(false);
            if (selectedDate) setFechaFin(selectedDate);
          }}
        />
      )}

      {/* Cliente */}
      <Picker selectedValue={clientId} onValueChange={(value) => setClientId(value)}>
        <Picker.Item label="Selecciona un cliente" value={null} />
        {clientes.map(c => <Picker.Item key={c.id} label={c.nombre} value={c.id} />)}
      </Picker>

      {/* Cobrador */}
      <Picker selectedValue={cobradorId} onValueChange={(value) => setCobradorId(value)}>
        <Picker.Item label="Selecciona un cobrador" value={null} />
        {cobradores.map(c => <Picker.Item key={c.id} label={c.nombre} value={c.id} />)}
      </Picker>

      {/* Estado */}
      <Picker selectedValue={estado} onValueChange={(value) => setEstado(value)}>
        <Picker.Item label="Activo" value="Activo" />
        <Picker.Item label="Pagado" value="Pagado" />
        <Picker.Item label="Vencido" value="Vencido" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleCrearPrestamo}>
        <Text style={styles.buttonText}>Crear Préstamo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#516566ff'},
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  input: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  dateButton: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#1e90ff', paddingVertical: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
