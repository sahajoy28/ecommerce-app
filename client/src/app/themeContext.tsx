import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppSelector } from './hooks';
import { userPreferencesAPI } from '../services/userPreferencesAPI';


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
  const { user, token } = useAppSelector(state => state.auth);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme-mode') as ThemeMode | null;
    const savedAccent = localStorage.getItem('app-accent-color') as AccentColor | null;
    
    if (savedTheme) setModeState(savedTheme);
    if (savedAccent) setAccentColorState(savedAccent);
  }, []);

  // Load preferences from API when user logs in AND token is available
  useEffect(() => {
    if (user && token) {
      userPreferencesAPI
        .getPreferences()
        .then((prefs: { theme?: ThemeMode; accentColor?: AccentColor }) => {
          if (prefs?.theme) setModeState(prefs.theme);
          if (prefs?.accentColor) setAccentColorState(prefs.accentColor);
        })
        .catch((err) => {
          console.error('Failed to load user preferences:', err);
        });
    }
  }, [user, token]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('app-theme-mode', newMode);
    
    // Save to API if user and token are available
    if (user && token) {
      userPreferencesAPI
        .savePreferences({ theme: newMode, accentColor })
        .catch(err => console.error('Failed to save theme preference:', err));
    }
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('app-accent-color', color);
    
    // Save to API if user and token are available
    if (user && token) {
      userPreferencesAPI
        .savePreferences({ theme: mode, accentColor: color })
        .catch(err => console.error('Failed to save accent preference:', err));
    }
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
