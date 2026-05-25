import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { INITIAL_MOVIES } from '@/data/movies';
import { useFavorites } from '@/context/favorites';
import { MovieCard } from '@/components/movie-card';
import { EmptyState } from '@/components/empty-state';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FavoritesScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoriteMovies = INITIAL_MOVIES.filter(m => favorites.includes(m.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]}>Mes Favoris</Text>
          <ThemeToggle />
        </View>
        {favorites.length > 0 && (
          <Text style={[styles.count, { color: colors.icon }]}>
            {favorites.length} titre{favorites.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      <FlatList
        data={favoriteMovies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isFavorite={isFavorite(item.id)}
            onPress={() => router.push(`/detail/${item.id}`)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            message="Aucun favori pour l'instant. Ajoutez des titres depuis le catalogue."
            icon="🤍"
          />
        }
        contentContainerStyle={favoriteMovies.length === 0 ? styles.emptyList : styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
  },
  list: {
    paddingBottom: 16,
  },
  emptyList: {
    flex: 1,
  },
});
