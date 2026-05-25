export type MovieType = 'movie' | 'series';

export type Movie = {
  id: string;
  title: string;
  type: MovieType;
  genre: string;
  releaseYear: number;
  creator: string;
  rating: number;
  durationMinutes?: number;
  seasonsCount?: number;
  description: string;
  tags: string[];
  imageUrl?: string;
  isRecommended?: boolean;
  isFavorite?: boolean;
};
