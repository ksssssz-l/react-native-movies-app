import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { router } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { INITIAL_MOVIES } from '@/data/movies';
import { useFavorites } from '@/context/favorites';
import { MovieCard } from '@/components/movie-card';
import { FilterButton } from '@/components/filter-button';
import { EmptyState } from '@/components/empty-state';
import { ThemeToggle } from '@/components/theme-toggle';

const TYPE_FILTERS = [
  { label: 'Tous', value: 'all' as const },
  { label: 'Films', value: 'movie' as const },
  { label: 'Séries', value: 'series' as const },
];

export default function CatalogueScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  const genres = useMemo(
    () => Array.from(new Set(INITIAL_MOVIES.map(m => m.genre))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return INITIAL_MOVIES.filter(movie => {
      if (typeFilter !== 'all' && movie.type !== typeFilter) return false;
      if (genreFilter && movie.genre !== genreFilter) return false;
      if (!q) return true;
      return (
        movie.title.toLowerCase().includes(q) ||
        movie.genre.toLowerCase().includes(q) ||
        movie.creator.toLowerCase().includes(q) ||
        movie.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [search, typeFilter, genreFilter]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]}>Catalogue</Text>
          <ThemeToggle />
        </View>

        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: colors.icon + '18', color: colors.text },
          ]}
          placeholder="Rechercher par titre, genre, créateur, tag..."
          placeholderTextColor={colors.icon}
          value={search}
          onChangeText={setSearch}
          clearButtonMode="while-editing"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRowContent}>
          {TYPE_FILTERS.map(f => (
            <FilterButton
              key={f.value}
              label={f.label}
              active={typeFilter === f.value}
              onPress={() => setTypeFilter(f.value)}
            />
          ))}
          <View style={styles.divider} />
          {genres.map(g => (
            <FilterButton
              key={g}
              label={g}
              active={genreFilter === g}
              onPress={() => setGenreFilter(prev => (prev === g ? null : g))}
            />
          ))}
        </ScrollView>

        <Text style={[styles.resultCount, { color: colors.icon }]}>
          {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filtered}
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
          <EmptyState message="Aucun résultat. Essayez d'autres termes ou réinitialisez les filtres." />
        }
        contentContainerStyle={filtered.length === 0 ? styles.emptyList : styles.list}
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
    gap: 12,
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
  searchInput: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  filterRowContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingRight: 4,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  resultCount: {
    fontSize: 13,
  },
  list: {
    paddingBottom: 16,
  },
  emptyList: {
    flex: 1,
  },
});
