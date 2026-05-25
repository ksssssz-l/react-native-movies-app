import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Badge } from '@/components/badge';
import { Movie } from '@/types/movie';

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const stars = Array.from({ length: 5 }, (_, i) => (i < full ? '★' : '☆')).join('');
  return (
    <Text style={styles.stars}>
      {stars} {rating.toFixed(1)}
    </Text>
  );
}

export function MovieCard({ movie, isFavorite, onPress, onToggleFavorite }: MovieCardProps) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.icon + '33' },
      ]}
      onPress={onPress}>
      <View style={[styles.poster, { backgroundColor: colors.icon + '22' }]}>
        <Text style={styles.posterEmoji}>{movie.type === 'movie' ? '🎬' : '📺'}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {movie.title}
          </Text>
          <Pressable onPress={onToggleFavorite} hitSlop={8}>
            <Text style={styles.favIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
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

        <Text style={[styles.meta, { color: colors.icon }]}>
          {movie.releaseYear} · {movie.creator}
        </Text>

        <StarRating rating={movie.rating} />

        <Text style={[styles.duration, { color: colors.icon }]}>
          {movie.type === 'movie'
            ? `${movie.durationMinutes} min`
            : `${movie.seasonsCount} saison${(movie.seasonsCount ?? 0) > 1 ? 's' : ''}`}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  poster: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterEmoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  favIcon: {
    fontSize: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: 12,
  },
  stars: {
    fontSize: 13,
    color: '#f59e0b',
  },
  duration: {
    fontSize: 12,
  },
});
