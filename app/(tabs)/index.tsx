import { Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import {LineChart} from 'react-native-chart-kit';

export default function InicioScreen() {
  // Datos de ejemplo, puedes reemplazarlos con los datos de tu API
  const totalPrestado = 5000;
  const totalCobrado = 3200;
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con logo */}
      <ThemedView style={styles.header}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logo}
        />
        <ThemedText type="title">Bienvenido a PréstamosApp</ThemedText>
      </ThemedView>

      {/* Secciones principales */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Acciones rápidas</ThemedText>

        <TouchableOpacity style={styles.card}>
          <Link href="/clientes">
            <ThemedText type="defaultSemiBold">Ver Clientes</ThemedText>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Link href="/prestamos">
            <ThemedText type="defaultSemiBold">Crear Préstamo</ThemedText>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Link href="/pagos">
            <ThemedText type="defaultSemiBold">Registrar Pago</ThemedText>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Link href="/reportes">
            <ThemedText type="defaultSemiBold">Ver Reportes</ThemedText>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Link href="/cobradores">
            <ThemedText type="defaultSemiBold">Ver cobradores</ThemedText>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Link href="/roles">
            <ThemedText type="defaultSemiBold">Ver roles</ThemedText>
          </Link>
        </TouchableOpacity>
      </ThemedView>
      {/* Gráfico */}
      <ThemedView style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['Prestado', 'Cobrado'],
            datasets: [
              {
                data: [totalPrestado, totalCobrado],
              },
            ],
          }}
          width={Dimensions.get('window').width - 32} // ancho del gráfico
          height={220}
          chartConfig={{
            backgroundColor: '#A1CEDC',
            backgroundGradientFrom: '#A1CEDC',
            backgroundGradientTo: '#1D3D47',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#fff' },
          }}
          style={{ borderRadius: 16 }}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  sectionContainer: {
    gap: 12,
  },
  card: {
    padding: 16,
    backgroundColor: '#A1CEDC',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  chartContainer: { 
    marginBottom: 24, 
    alignItems: 'center' 
  },
});
