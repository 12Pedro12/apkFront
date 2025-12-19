import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { PrestamoData } from "../data/PrestamoData";
import { Prestamo } from "../entidad/Prestamo";

export const PrestamoScreen = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestamos = async () => {
      const data = await PrestamoData.getAll();
      setPrestamos(data);
      setLoading(false);
    };
    fetchPrestamos();
  }, []);

  if (loading) return <Text>Cargando préstamos...</Text>;

  return (
    <FlatList
      data={prestamos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>ID: {item.id}</Text>
          <Text>Cliente ID: {item.client_id}</Text>
          <Text>Cobrador ID: {item.cobrador_id}</Text>
          <Text>Monto: Bs {item.monto}</Text>
          <Text>Interés: {item.tasa_interes}%</Text>
          <Text>Plazo: {item.plazo} meses</Text>
          <Text>Inicio: {item.fecha_inicio}</Text>
          <Text>Fin: {item.fecha_fin}</Text>
          <Text>Estado: {item.estado}</Text>
        </Card>
      )}
    />
  );
};
