import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { InputPropio } from '@/src/componentes/InputPropio';
import { TextPropio } from '@/src/componentes/TextPropio';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
  const [usuario, setUsuario] = useState("");
  const router = useRouter();

  return (
    
    <ScrollView style={styles.container}>
      {/* Encabezado con logo */}
        <ThemedView style={styles.header}>
            <Image
                source={require('@/assets/images/prestamo_app_A_P_3.jpg')}
                style={styles.logo}
              />
            <ThemedText type="title">PréstamosApp</ThemedText>
        </ThemedView>
      {/* CONTENEDOR SUPERIOR */}
      <View style={styles.container}>
        <TextPropio tamano={30} color="#ffffff" negrita>
          Bienvenidos
        </TextPropio>

        <InputPropio
          valor={usuario}
          setValor={setUsuario}
          placeholder="Usuario"
        />
      </View>

      {/* BOTONES */}
      <View style={styles.container}>
        <TextPropio tamano={20} color="#ffffff" negrita>
          REGISTRAR
        </TextPropio>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/cliente/crear-cliente')}
        >
          <TextPropio style={styles.textBoton}>
            Crear Cliente
          </TextPropio>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/cobrador/crear-cobrador')}
        >
          <TextPropio style={styles.textBoton}>
            Crear Cobrador
          </TextPropio>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/pago/crear-pago')}
        >
          <TextPropio style={styles.textBoton}>
            Crear Pago
          </TextPropio>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/prestamo/crear-prestamo')}
        >
          <TextPropio style={styles.textBoton}>
            Crear Préstamo
          </TextPropio>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 30,
    backgroundColor: '#9e9e9eff',
  },
  headerImage: {
    color: '#9e9e9eff',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#9e9e9eff',
  },
  logo: {
    width: 450,
    height: 250,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#ffffffff', // ⬅️ fondo oscuro
    padding: 16,
    borderRadius: 10,
  },
  textBoton: {
    color: '#b2b2b2ff',          // ⬅️ ahora se VE
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
