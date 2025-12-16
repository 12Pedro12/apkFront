import ParallaxScrollView from '@/components/parallax-scroll-view';
import { StyleSheet, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { InputPropio } from '@/src/componentes/InputPropio';
import { TextPropio } from '@/src/componentes/TextPropio';
import React, { useState } from "react";

export default function TabTwoScreen() {
  const [usuario, setUsuario] = useState("");

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
      {/* 👇 CONTENEDOR OBLIGATORIO */}
      <View style={styles.container}>
        <TextPropio tamano={30} color="#e03737ff" negrita>
          Bienvenidos
        </TextPropio>

        <InputPropio
          valor={usuario}
          setValor={setUsuario}
          placeholder="Usuario"
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
