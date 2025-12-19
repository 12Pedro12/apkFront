import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CrearCliente() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedulaIdentidad, setCedulaIdentidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleCrearCliente = async () => {
    if (!nombre || !apellido || !cedulaIdentidad || !direccion || !telefono || !email) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          cedulaIdentidad,
          direccion,
          telefono,
          email,
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Cliente creado correctamente');
        setNombre('');
        setApellido('');
        setCedulaIdentidad('');
        setDireccion('');
        setTelefono('');
        setEmail('');
      } else {
        const data = await response.json();
        Alert.alert('Error', JSON.stringify(data));
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cliente</Text>
      <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Apellido" style={styles.input} value={apellido} onChangeText={setApellido} />
      <TextInput placeholder="Cédula de Identidad" style={styles.input} value={cedulaIdentidad} onChangeText={setCedulaIdentidad} />
      <TextInput placeholder="Dirección" style={styles.input} value={direccion} onChangeText={setDireccion} />
      <TextInput placeholder="Teléfono" style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      
      <TouchableOpacity style={styles.button} onPress={handleCrearCliente}>
        <Text style={styles.buttonText}>Crear Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#516566ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

