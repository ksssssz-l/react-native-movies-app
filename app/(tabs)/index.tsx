import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { INITIAL_MOVIES } from '@/data/movies';
import { useFavorites } from '@/context/favorites';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const { favorites } = useFavorites();

  const totalTitles = INITIAL_MOVIES.length;
  const moviesCount = INITIAL_MOVIES.filter(m => m.type === 'movie').length;
  const seriesCount = INITIAL_MOVIES.filter(m => m.type === 'series').length;
  const genresCount = new Set(INITIAL_MOVIES.map(m => m.genre)).size;

  const stats = [
    { label: 'Titres', value: totalTitles, emoji: '🎭' },
    { label: 'Films', value: moviesCount, emoji: '🎬' },
    { label: 'Séries', value: seriesCount, emoji: '📺' },
    { label: 'Genres', value: genresCount, emoji: '🎨' },
    { label: 'Favoris', value: favorites.length, emoji: '❤️' },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <ThemeToggle />
      </View>

      <View style={styles.hero}>
        <Text style={styles.appIcon}>🎥</Text>
        <Text style={[styles.appName, { color: colors.text }]}>CinéCatalogue</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Votre catalogue de films et séries
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Statistiques</Text>
      <View style={styles.statsGrid}>
        {stats.map(stat => (
          <View
            key={stat.label}
            style={[
              styles.statCard,
              { backgroundColor: colors.tint + '18', borderColor: colors.tint + '33' },
            ]}>
            <Text style={styles.statEmoji}>{stat.emoji}</Text>
            <Text style={[styles.statValue, { color: colors.tint }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.actionBtn, { backgroundColor: colors.tint }]}
          onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.actionBtnText}>🎬 Voir le catalogue</Text>
        </Pressable>
        <Pressable
          style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: colors.tint }]}
          onPress={() => router.push('/(tabs)/form')}>
          <Text style={[styles.actionBtnText, { color: colors.tint }]}>✏️ Recommander un titre</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    gap: 20,
    paddingBottom: 40,
  },
  topBar: {
    alignItems: 'flex-end',
  },
  hero: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
  },
  appIcon: {
    fontSize: 64,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 80,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
    paddingTop: 8,
  },
  actionBtn: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  actionBtnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
