import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';

type Prestamo = {
  id: number;
  monto: number;
  tasa_interes: number;
  plazo: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  client: string;
  cobrador: string;
};

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrestamos = async () => {
    try {
      const response = await fetch('http://192.168.100.115:8000/administrativo/prestamo/');
      if (!response.ok) throw new Error('Error al obtener préstamos');
      const data = await response.json();
      // Asegurarnos que client y cobrador existan
      const formattedData = data.map((p: any) => ({
        ...p,
        client: p.client || 'Sin cliente',
        cobrador: p.cobrador || 'Sin cobrador',
      }));
      setPrestamos(formattedData);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudieron cargar los préstamos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const renderItem = ({ item }: { item: Prestamo }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>Préstamo ID: {item.id}</Text>
      <Text>Monto: {item.monto}</Text>
      <Text>Tasa de Interés: {item.tasa_interes}%</Text>
      <Text>Plazo: {item.plazo} meses</Text>
      <Text>Inicio: {item.fecha_inicio}</Text>
      <Text>Fin: {item.fecha_fin}</Text>
      <Text>Estado: {item.estado}</Text>
      <Text>Cliente: {item.client}</Text>
      <Text>Cobrador: {item.cobrador}</Text>
    </View>
  );

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1e90ff" />
      <Text style={{ marginTop: 10 }}>Cargando préstamos...</Text>
    </View>
  );

  if (prestamos.length === 0) return (
    <View style={styles.loadingContainer}>
      <Text style={{ color: '#fff', fontSize: 16 }}>No hay préstamos registrados.</Text>
    </View>
  );

  return (
    <FlatList
      data={prestamos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { padding: 20, backgroundColor: '#516566ff', flexGrow: 1 },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
