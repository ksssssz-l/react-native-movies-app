import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/context/theme';

export function ThemeToggle() {
  const { colorScheme, toggleTheme } = useTheme();

  return (
    <Pressable onPress={toggleTheme} style={styles.btn} hitSlop={12}>
      <Text style={styles.icon}>{colorScheme === 'dark' ? '☀️' : '🌙'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 4,
  },
  icon: {
    fontSize: 24,
  },
});
