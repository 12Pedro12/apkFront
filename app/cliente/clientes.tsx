import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';

type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  cedulaIdentidad: string;
  direccion: string;
  telefono: string;
  email: string;
  user?: string;
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/clients/'); // Ajusta tu endpoint
      if (!response.ok) {
        throw new Error('Error al obtener los clientes');
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudieron cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
      <Text>Cédula: {item.cedulaIdentidad}</Text>
      <Text>Dirección: {item.direccion}</Text>
      <Text>Teléfono: {item.telefono}</Text>
      <Text>Email: {item.email}</Text>
      {item.user && <Text>Usuario: {item.user}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={clientes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
