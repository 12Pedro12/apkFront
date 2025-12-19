import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CrearPago() {
  const [monto, setMonto] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [cuotaId, setCuotaId] = useState('');
  const [cobradorId, setCobradorId] = useState('');

  const handleCrearPago = async () => {
    if (!monto || !fechaPago || !metodoPago || !cuotaId || !cobradorId) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monto,
          fecha_pago: fechaPago,
          metodo_pago: metodoPago,
          cuota_id: cuotaId,
          cobrador_id: cobradorId
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Pago registrado correctamente');
        setMonto(''); setFechaPago(''); setMetodoPago(''); setCuotaId(''); setCobradorId('');
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
      <Text style={styles.title}>Registrar Pago</Text>
      <TextInput placeholder="Monto" style={styles.input} value={monto} onChangeText={setMonto} keyboardType="numeric" />
      <TextInput placeholder="Fecha de Pago (YYYY-MM-DD)" style={styles.input} value={fechaPago} onChangeText={setFechaPago} />
      <TextInput placeholder="Método de Pago" style={styles.input} value={metodoPago} onChangeText={setMetodoPago} />
      <TextInput placeholder="ID de Cuota" style={styles.input} value={cuotaId} onChangeText={setCuotaId} keyboardType="numeric" />
      <TextInput placeholder="ID de Cobrador" style={styles.input} value={cobradorId} onChangeText={setCobradorId} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleCrearPago}>
        <Text style={styles.buttonText}>Registrar Pago</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#516566ff',},
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#1e90ff', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
