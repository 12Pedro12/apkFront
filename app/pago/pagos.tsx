import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';

type Pago = {
  id: number;
  monto: number;
  fecha_pago: string;
  metodo_pago: string;
  cuota?: string;
  cobrador?: string;
};

export default function Pagos() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPagos = async () => {
    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/pago');
      if (!response.ok) throw new Error('Error al obtener pagos');
      const data = await response.json();
      setPagos(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudieron cargar los pagos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPagos(); }, []);

  const renderItem = ({ item }: { item: Pago }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>Pago ID: {item.id}</Text>
      <Text>Monto: {item.monto}</Text>
      <Text>Fecha: {item.fecha_pago}</Text>
      <Text>Método: {item.metodo_pago}</Text>
      {item.cuota && <Text>Cuota: {item.cuota}</Text>}
      {item.cobrador && <Text>Cobrador: {item.cobrador}</Text>}
    </View>
  );

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1e90ff" />
    </View>
  );

  return (
    <FlatList
      data={pagos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { padding: 20,  backgroundColor: '#516566ff'},
  itemContainer: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 12 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
