import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
} from "react-native";

interface Props extends TextProps {
  children: React.ReactNode;
  tamano?: number;
  color?: string;
  negrita?: boolean;
  estilo?: StyleProp<TextStyle>;
}

export const TextPropio: React.FC<Props> = ({
  children,
  tamano = 12,
  color = "#000",
  negrita = false,
  estilo,
  ...resto
}) => {
  return (
    <Text
      {...resto}
      style={[
        estilos.texto,
        {
          fontSize: tamano,
          color: color,
          fontWeight: negrita ? "bold" : "normal",
        },
        estilo,
      ]}
    >
      {children}
    </Text>
  );
};

const estilos = StyleSheet.create({
  texto: {
    lineHeight: 22,
  },
});
