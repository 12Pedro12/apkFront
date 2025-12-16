import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { RolData } from "../data/RolData";
import { Rol } from "../entidad/Rol";

export const RolesScreen = () => {
  const [roles, setRoles] = useState<Rol[]>([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await RolData.getAll();
      setRoles(data);
      setLoading(false);
    };
    fetchRoles();
  }, []);

  if (loading) return <Text>Cargando roles...</Text>;

  return (
    
    <FlatList
      data={roles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>{item.id}</Text>
          <Text>{item.nombre}</Text>
          <Text>{item.descripcion}</Text>
        </Card>
      )}
    />
  );
};