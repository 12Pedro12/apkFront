import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type Prestamo = { id: number; plazo: number };
type Cuota = { id: number; numero: number; descripcion?: string };
type Cobrador = { id: number; nombre: string };

export default function CrearPago() {
  const [monto, setMonto] = useState('');
  const [prestamoId, setPrestamoId] = useState<number | undefined>(undefined);
  const [cuotaId, setCuotaId] = useState<number | undefined>(undefined);
  const [cobradorId, setCobradorId] = useState<number | undefined>(undefined);
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'transferencia' | 'qr'>('efectivo');
  const [fechaPago, setFechaPago] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [cobradores, setCobradores] = useState<Cobrador[]>([]);

  // 🔹 Cargar préstamos y cobradores
  useEffect(() => {
    fetch('http://192.168.100.115:8000/administrativo/prestamo/')
      .then(res => res.json())
      .then(setPrestamos)
      .catch(() => Alert.alert('Error', 'No se pudieron cargar los préstamos'));

    fetch('http://192.168.100.115:8000/administrativo/cobrador/')
      .then(res => res.json())
      .then(setCobradores)
      .catch(() => Alert.alert('Error', 'No se pudieron cargar los cobradores'));
  }, []);

  // 🔥 Cargar cuotas según préstamo seleccionado
  useEffect(() => {
    if (!prestamoId) {
      setCuotas([]);
      setCuotaId(undefined);
      return;
    }

    fetch(`http://192.168.100.115:8000/administrativo/cuota/?prestamo=${prestamoId}`)
      .then(res => res.json())
      .then(setCuotas)
      .catch(() => Alert.alert('Error', 'No se pudieron cargar las cuotas'));
  }, [prestamoId]);

  // 🔹 Crear pago
  const handleCrearPago = async () => {
    if (!monto || !prestamoId || !cuotaId || !cobradorId) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/pago/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monto,
          fecha_pago: fechaPago.toISOString().split('T')[0],
          metodo_pago: metodoPago,
          cuota_id: cuotaId,
          cobrador_id: cobradorId,
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Pago registrado correctamente');
        setMonto('');
        setPrestamoId(undefined);
        setCuotaId(undefined);
        setCobradorId(undefined);
        setMetodoPago('efectivo');
        setFechaPago(new Date());
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
      <Text style={styles.title}>Crear Pago</Text>

      <TextInput
        placeholder="Monto"
        style={styles.input}
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />

      {/* Fecha de pago */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text>Fecha de Pago: {fechaPago.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={fechaPago}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowDatePicker(false);
            if (selectedDate) setFechaPago(selectedDate);
          }}
        />
      )}

      {/* Seleccionar Préstamo */}
      <Picker selectedValue={prestamoId} onValueChange={setPrestamoId} style={styles.picker}>
        <Picker.Item label="Selecciona un préstamo" value={undefined} />
        {prestamos.map(p => (
          <Picker.Item key={p.id} label={`Préstamo #${p.id} (${p.plazo} meses)`} value={p.id} />
        ))}
      </Picker>

      {/* Seleccionar Cuota */}
      <Picker selectedValue={cuotaId} onValueChange={setCuotaId} style={styles.picker}>
        <Picker.Item label="Selecciona una cuota" value={undefined} />
        {cuotas.map(c => (
          <Picker.Item
            key={c.id}
            label={c.descripcion ?? `Cuota #${c.numero ?? c.id}`}
            value={c.id}
          />
        ))}
      </Picker>

      {/* Seleccionar Cobrador */}
      <Picker selectedValue={cobradorId} onValueChange={setCobradorId} style={styles.picker}>
        <Picker.Item label="Selecciona un cobrador" value={undefined} />
        {cobradores.map(c => (
          <Picker.Item key={c.id} label={c.nombre} value={c.id} />
        ))}
      </Picker>

      {/* Método de pago */}
      <Picker selectedValue={metodoPago} onValueChange={setMetodoPago} style={styles.picker}>
        <Picker.Item label="Efectivo" value="efectivo" />
        <Picker.Item label="Transferencia" value="transferencia" />
        <Picker.Item label="QR" value="qr" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleCrearPago}>
        <Text style={styles.buttonText}>Registrar Pago</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#516566ff', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center', color: 'white' },
  input: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: 'white' },
  dateButton: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, backgroundColor: 'white' },
  picker: { marginBottom: 12, backgroundColor: 'white' },
  button: { backgroundColor: '#1e90ff', paddingVertical: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
