import { Pressable, StyleSheet, Text } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type FilterButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterButton({ label, active, onPress }: FilterButtonProps) {
  const scheme = useColorScheme() ?? 'light';
  const tint = Colors[scheme].tint;

  return (
    <Pressable
      style={[
        styles.button,
        active
          ? { backgroundColor: tint, borderColor: tint }
          : { borderColor: Colors[scheme].icon + '88' },
      ]}
      onPress={onPress}>
      <Text style={[styles.label, { color: active ? '#fff' : Colors[scheme].text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
});
