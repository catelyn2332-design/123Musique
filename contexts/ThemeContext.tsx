// Powered by OnSpace.AI
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, LightTheme, DEFAULT_ACCENT } from '@/constants/theme';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  accent: string;
  colors: typeof DarkTheme;
  toggleMode: () => void;
  setAccent: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  useEffect(() => {
    AsyncStorage.multiGet(['theme_mode', 'theme_accent']).then(pairs => {
      const m = pairs[0][1] as ThemeMode | null;
      const a = pairs[1][1];
      if (m) setMode(m);
      if (a) setAccentState(a);
    });
  }, []);

  const toggleMode = () => {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    AsyncStorage.setItem('theme_mode', next);
  };

  const setAccent = (color: string) => {
    setAccentState(color);
    AsyncStorage.setItem('theme_accent', color);
  };

  const colors = mode === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ mode, accent, colors, toggleMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}
