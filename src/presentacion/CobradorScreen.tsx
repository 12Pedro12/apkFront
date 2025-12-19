import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { Cobrador } from "../entidad/Cobrador";
import { CobradorData } from "../data/CobradorData";

export const CobradorScreen = () => {
  const [cobradores, setCobradores] = useState<Cobrador[]>([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCobradores = async () => {
      const data = await CobradorData.getAll();
      setCobradores(data);
      setLoading(false);
    };
    fetchCobradores();
  }, []);

  if (loading) return <Text>Cargando cobradores...</Text>;

  return (
    
    <FlatList
      data={cobradores}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>{item.id}</Text>
          <Text>{item.nombre}</Text>
          <Text>{item.apellido}</Text>
          <Text>{item.cedulaIdentidad}</Text>
          <Text>{item.telefono}</Text>
          <Text>{item.email}</Text>
        </Card>
      )}
    />
  );
};