import ParallaxScrollView from '@/components/parallax-scroll-view';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { InputPropio } from '@/src/componentes/InputPropio';
import { TextPropio } from '@/src/componentes/TextPropio';
import { useRouter } from 'expo-router';
import React, { useState } from "react";

export default function TabTwoScreen() {
  const [usuario, setUsuario] = useState("");
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f5eaeaff', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#292222ff"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 30,
    backgroundColor: '#516566ff',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
