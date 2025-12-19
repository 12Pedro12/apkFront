import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CrearPrestamo() {
  const [monto, setMonto] = useState('');
  const [tasaInteres, setTasaInteres] = useState('');
  const [plazo, setPlazo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('');
  const [clientId, setClientId] = useState('');
  const [cobradorId, setCobradorId] = useState('');

  const handleCrearPrestamo = async () => {
    if (!monto || !tasaInteres || !plazo || !fechaInicio || !fechaFin || !estado || !clientId || !cobradorId) {
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
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          estado,
          client_id: clientId,
          cobrador_id: cobradorId
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Préstamo creado correctamente');
        setMonto(''); setTasaInteres(''); setPlazo(''); setFechaInicio(''); setFechaFin(''); setEstado(''); setClientId(''); setCobradorId('');
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
      <TextInput placeholder="Fecha Inicio (YYYY-MM-DD)" style={styles.input} value={fechaInicio} onChangeText={setFechaInicio} />
      <TextInput placeholder="Fecha Fin (YYYY-MM-DD)" style={styles.input} value={fechaFin} onChangeText={setFechaFin} />
      <TextInput placeholder="Estado" style={styles.input} value={estado} onChangeText={setEstado} />
      <TextInput placeholder="ID Cliente" style={styles.input} value={clientId} onChangeText={setClientId} keyboardType="numeric" />
      <TextInput placeholder="ID Cobrador" style={styles.input} value={cobradorId} onChangeText={setCobradorId} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleCrearPrestamo}>
        <Text style={styles.buttonText}>Crear Préstamo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#516566ff'},
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#1e90ff', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
