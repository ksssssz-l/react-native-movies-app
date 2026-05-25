import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark';

type ThemeContextType = {
  colorScheme: ColorScheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useSystemColorScheme() ?? 'light';
  const [override, setOverride] = useState<ColorScheme | null>(null);

  const colorScheme = override ?? system;

  const toggleTheme = () => {
    setOverride(prev => ((prev ?? system) === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
