import { StyleSheet, Text, View } from 'react-native';

type BadgeProps = {
  label: string;
  color?: string;
  textColor?: string;
};

export function Badge({ label, color = '#e8f4fd', textColor = '#0a7ea4' }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
