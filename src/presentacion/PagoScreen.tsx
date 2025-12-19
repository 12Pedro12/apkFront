import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { PagoData } from "../data/PagoData";
import { Pago } from "../entidad/Pago";

export const PagoScreen = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      const data = await PagoData.getAll();
      setPagos(data);
      setLoading(false);
    };
    fetchPagos();
  }, []);

  if (loading) return <Text>Cargando pagos...</Text>;

  return (
    <FlatList
      data={pagos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>ID: {item.id}</Text>
          <Text>Cuota ID: {item.cuota_id}</Text>
          <Text>Cobrador ID: {item.cobrador_id ?? "N/A"}</Text>
          <Text>Monto: Bs {item.monto}</Text>
          <Text>Fecha: {item.fecha_pago}</Text>
          <Text>Método: {item.metodo_pago}</Text>
        </Card>
      )}
    />
  );
};
