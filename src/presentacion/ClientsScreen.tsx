import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { Client } from "../entidad/Client";
import { ClientData } from "../data/ClientData";

export const ClientsScreen = () => {
  const [clients, setClients] = useState<Client[]>([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await ClientData.getAll();
      setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  if (loading) return <Text>Cargando clientes...</Text>;

  return (
    
    <FlatList
      data={clients}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>{item.id}</Text>
          <Text>{item.nombre}</Text>
          <Text>{item.apellido}</Text>
          <Text>{item.cedulaIdentidad}</Text>
          <Text>{item.direccion}</Text>
          <Text>{item.telefono}</Text>
          <Text>{item.email}</Text>
        </Card>
      )}
    />
  );
};