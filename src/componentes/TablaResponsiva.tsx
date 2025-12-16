import React from "react";
import { ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface TablaProps {
    headers: string[];
    data: Array<Record<string, any>>;
    anchoColumna?: number;
    colorFondoHeader?: string;
    colorTextoHeader?: string;
    colorFondoFila?: string;
    colorTextoFila?: string;
    estilo?: ViewStyle;
    estiloHeader?: TextStyle;
    estiloFila?: TextStyle;
}

export const TablaResponsiva: React.FC<TablaProps> = ({
    headers,
    data,
    anchoColumna = 100,
    colorFondoHeader = "#007BFF",
    colorTextoHeader = "#fff",
    colorFondoFila = "#f9f9f9",
    colorTextoFila = "#000",
    estilo,
    estiloHeader,
    estiloFila,
}) => {
    return (
        <ScrollView horizontal style={[{ width: '100%' }, estilo]}>
            <View>
                {/* Header */}
                <View style={[styles.row, { backgroundColor: colorFondoHeader }]}>
                    {headers.map((header, index) => (
                        <View key={index} style={[styles.cell, { width: anchoColumna }]}>
                            <Text style={[styles.headerText, { color: colorTextoHeader }, estiloHeader]}>
                                {header}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Filas */}
                {data.map((fila, filaIndex) => (
                    <View
                        key={filaIndex}
                        style={[
                            styles.row,
                            { backgroundColor: filaIndex % 2 === 0 ? colorFondoFila : "#eaeaea" },
                        ]}
                    >
                        {headers.map((header, colIndex) => (
                            <View key={colIndex} style={[styles.cell, { width: anchoColumna }]}>
                                <Text style={[styles.rowText, { color: colorTextoFila }, estiloFila]}>
                                    {fila[header]}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    cell: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#ccc",
    },
    headerText: {
        fontWeight: "bold",
    },
    rowText: {},
});