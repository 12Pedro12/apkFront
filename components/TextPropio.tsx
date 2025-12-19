import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface TextPropioProps {
  children: React.ReactNode;
  tamano?: number;
  color?: string;
  negrita?: boolean;
  style?: StyleProp<TextStyle>;
}

export const TextPropio = ({
  children,
  tamano = 16,              // ⬅️ tamaño base más razonable
  color = '#ad9b9bff',        // ⬅️ NEGRO por defecto (clave)
  negrita = false,
  style,
}: TextPropioProps) => {
  return (
    <Text
      style={[
        {
          fontSize: tamano,
          color,
          fontWeight: negrita ? 'bold' : 'normal',
        },
        style, // 👈 esto pisa todo (correcto)
      ]}
    >
      {children}
    </Text>
  );
};
