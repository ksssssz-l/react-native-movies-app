import { useTheme } from '@/context/theme';

export function useColorScheme() {
  return useTheme().colorScheme;
}
