import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { CuotaData } from "../data/CuotaData";
import { Cuota } from "../entidad/Cuota";

export const CuotaScreen = () => {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCuotas = async () => {
      const data = await CuotaData.getAll();
      setCuotas(data);
      setLoading(false);
    };
    fetchCuotas();
  }, []);

  if (loading) return <Text>Cargando cuotas...</Text>;

  return (
    <FlatList
      data={cuotas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>ID: {item.id}</Text>
          <Text>Préstamo ID: {item.prestamo_id}</Text>
          <Text>Cuota N°: {item.numero_cuota}</Text>
          <Text>Monto: Bs {item.monto}</Text>
          <Text>Vence: {item.fecha_vencimiento}</Text>
          <Text>Estado: {item.estado}</Text>
        </Card>
      )}
    />
  );
};
