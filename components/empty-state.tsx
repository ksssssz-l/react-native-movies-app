import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type EmptyStateProps = {
  message: string;
  icon?: string;
};

export function EmptyState({ message, icon = '🎬' }: EmptyStateProps) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.message, { color: Colors[scheme].icon }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  icon: {
    fontSize: 48,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
