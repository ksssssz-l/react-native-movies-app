import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFavorites } from '@/context/favorites';

function FavBadge() {
  const { favorites } = useFavorites();
  if (favorites.length === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{favorites.length > 99 ? '99+' : favorites.length}</Text>
    </View>
  );
}

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
          title: 'Accueil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Catalogue',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="film" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color }) => (
            <View>
              <IconSymbol size={28} name="heart.fill" color={color} />
              <FavBadge />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          title: 'Recommander',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.and.pencil" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#e53935',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
