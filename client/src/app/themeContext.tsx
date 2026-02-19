import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../services/userAPI';


export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'blue' | 'orange' | 'purple' | 'green' | 'red';

interface ThemeContextType {
  mode: ThemeMode;
  accentColor: AccentColor;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [accentColor, setAccentColorState] = useState<AccentColor>('blue');

  // Load global theme from SiteSettings (admin-configured) on mount
  useEffect(() => {
    // First apply cached values from localStorage for instant display
    const cachedMode = localStorage.getItem('app-theme-mode') as ThemeMode | null;
    const cachedAccent = localStorage.getItem('app-accent-color') as AccentColor | null;
    if (cachedMode) setModeState(cachedMode);
    if (cachedAccent) setAccentColorState(cachedAccent);

    // Then fetch the admin-configured global theme
    userAPI.getSiteSettings()
      .then((data: any) => {
        const serverMode = (data.themeMode as ThemeMode) || 'light';
        const serverAccent = (data.accentColor as AccentColor) || 'blue';
        setModeState(serverMode);
        setAccentColorState(serverAccent);
        // Cache for instant load next time
        localStorage.setItem('app-theme-mode', serverMode);
        localStorage.setItem('app-accent-color', serverAccent);
      })
      .catch(() => {
        // Silently ignore — use cached or defaults
      });
  }, []);

  // setMode and setAccentColor only update local state (admin saves via SiteSettings)
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('app-theme-mode', newMode);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('app-accent-color', color);
  };

  return (
    <ThemeContext.Provider value={{ mode, accentColor, setMode, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
