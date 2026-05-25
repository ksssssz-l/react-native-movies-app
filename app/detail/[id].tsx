import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { INITIAL_MOVIES } from '@/data/movies';
import { useFavorites } from '@/context/favorites';
import { Badge } from '@/components/badge';

function MetaItem({ label, value }: { label: string; value: string }) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  return (
    <View style={styles.metaItem}>
      <Text style={[styles.metaLabel, { color: colors.icon }]}>{label}</Text>
      <Text style={[styles.metaValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const { isFavorite, toggleFavorite } = useFavorites();

  const movie = INITIAL_MOVIES.find(m => m.id === id);

  if (!movie) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>Titre introuvable.</Text>
      </View>
    );
  }

  const fav = isFavorite(movie.id);
  const full = Math.floor(movie.rating);
  const stars = Array.from({ length: 5 }, (_, i) => (i < full ? '★' : '☆')).join('');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}>
      <View style={[styles.poster, { backgroundColor: colors.icon + '22' }]}>
        <Text style={styles.posterEmoji}>{movie.type === 'movie' ? '🎬' : '📺'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]}>{movie.title}</Text>
          <Pressable
            style={[
              styles.favButton,
              { backgroundColor: fav ? '#fce4ec' : colors.icon + '18' },
            ]}
            onPress={() => toggleFavorite(movie.id)}>
            <Text style={styles.favEmoji}>{fav ? '❤️' : '🤍'}</Text>
            <Text style={[styles.favLabel, { color: fav ? '#e53935' : colors.icon }]}>
              {fav ? 'Retirer' : 'Ajouter'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.badgeRow}>
          <Badge label={movie.type === 'movie' ? 'Film' : 'Série'} />
          <Badge
            label={movie.genre}
            color={scheme === 'dark' ? '#1a2a1a' : '#f0faf0'}
            textColor="#2e7d32"
          />
        </View>

        <View style={styles.metaGrid}>
          <MetaItem label="Année" value={String(movie.releaseYear)} />
          <MetaItem label="Créateur" value={movie.creator} />
          <MetaItem label="Note" value={`${stars} ${movie.rating.toFixed(1)}/5`} />
          {movie.type === 'movie' && movie.durationMinutes != null && (
            <MetaItem label="Durée" value={`${movie.durationMinutes} min`} />
          )}
          {movie.type === 'series' && movie.seasonsCount != null && (
            <MetaItem
              label="Saisons"
              value={`${movie.seasonsCount} saison${movie.seasonsCount > 1 ? 's' : ''}`}
            />
          )}
        </View>

        <Text style={[styles.sectionLabel, { color: colors.text }]}>Synopsis</Text>
        <Text style={[styles.description, { color: colors.icon }]}>{movie.description}</Text>

        <Text style={[styles.sectionLabel, { color: colors.text }]}>Tags</Text>
        <View style={styles.tagsRow}>
          {movie.tags.map(tag => (
            <Badge
              key={tag}
              label={tag}
              color={colors.icon + '22'}
              textColor={colors.text}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
  },
  poster: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterEmoji: {
    fontSize: 80,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  favButton: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    gap: 2,
    minWidth: 64,
  },
  favEmoji: {
    fontSize: 22,
  },
  favLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    gap: 2,
    minWidth: 80,
  },
  metaLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  metaValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
});
