import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { Card } from "../componentes/Card";
import { UserData } from "../data/UserData";
import { User } from "../entidad/User";

export const UserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await UserData.getAll();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <Text>Cargando usuarios...</Text>;

  return (
    
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card>
          <Text>{item.id}</Text>
          <Text>{item.username}</Text>
          <Text>{item.correo}</Text>
        </Card>
      )}
    />
  );
};