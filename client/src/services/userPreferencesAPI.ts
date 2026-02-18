import { authApi } from './apiClient';
import { ThemeMode, AccentColor } from '../app/themeContext';

export interface UserPreferences {
  theme?: ThemeMode;
  accentColor?: AccentColor;
}

type SavePayload = Partial<UserPreferences>;

export const userPreferencesAPI = {
  // Save user preferences
  async savePreferences(preferences: SavePayload) {
    try {
      const response = await authApi.post<{ data: UserPreferences }>('/user/preferences', preferences);
      return response?.data as UserPreferences;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw error;
    }
  },

  // Get user preferences
  async getPreferences(): Promise<UserPreferences> {
    try {
      const response = await authApi.get<{ data: UserPreferences }>('/user/preferences');
      return (response?.data ?? {}) as UserPreferences;
    } catch (error) {
      console.error('Failed to get preferences:', error);
      throw error;
    }
  },
};
