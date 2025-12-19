import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      {/* Clientes */}
      <Tabs.Screen
        name="clientes"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.fill" color={color} />
          ),
        }}
      />
       {/* Préstamos */}
      <Tabs.Screen
        name="prestamos"
        options={{
          title: "Préstamos",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="banknote.fill" color={color} />
          ),
        }}
      />
       {/* Cuotas */}
      <Tabs.Screen
        name="cuotas"
        options={{
          title: "Cuotas",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="calendar.badge.clock" color={color} />
          ),
        }}
      />

      {/* Pagos */}
      <Tabs.Screen
        name="pagos"
        options={{
          title: "Pagos",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="creditcard.fill" color={color} />
          ),
        }}
      />

      {/* Cobradores */}
      <Tabs.Screen
        name="cobradores"
        options={{
          title: "Cobradores",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.badge.key.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
