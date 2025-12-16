import React from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

interface Props extends TextInputProps {
    valor: string;
    setValor: (texto: string) => void;
    placeholder?: string;
    tamanoTexto?: number;
    colorTexto?: string;
    colorPlaceholder?: string;
    bordeRadio?: number;
    bordeColor?: string;
    fondoColor?: string;
    estilo?: ViewStyle;
    estiloInput?: TextStyle;
    seguro?: boolean; // para password
}

export const InputPropio: React.FC<Props> = ({
    valor,
    setValor,
    placeholder = "",
    tamanoTexto = 16,
    colorTexto = "#000",
    colorPlaceholder = "#888",
    bordeRadio = 8,
    bordeColor = "#ccc",
    fondoColor = "#fff",
    estilo,
    estiloInput,
    seguro = false,
    ...resto
}) => {
    return (
        <View style={[estilos.contenedor, { borderRadius: bordeRadio, borderColor: bordeColor, backgroundColor: fondoColor }, estilo]}>
            <TextInput
                value={valor}
                onChangeText={setValor}
                placeholder={placeholder}
                placeholderTextColor={colorPlaceholder}
                secureTextEntry={seguro}
                style={[estilos.input, { fontSize: tamanoTexto, color: colorTexto }, estiloInput]}
                {...resto} // permite pasar props nativas de TextInput
            />
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 5,
    },
    input: {
        width: "100%",
    },
});