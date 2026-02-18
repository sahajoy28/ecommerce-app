import { authApi } from './apiClient';
import { ThemeMode, AccentColor } from '../app/themeContext';

interface UserPreferences {
  theme: ThemeMode;
  accentColor: AccentColor;
}

export const userPreferencesAPI = {
  // Save user preferences
  async savePreferences(preferences: UserPreferences) {
    try {
      const response = await authApi.post('/user/preferences', preferences);
      return response;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw error;
    }
  },

  // Get user preferences
  async getPreferences() {
    try {
      const response = await authApi.get('/user/preferences');
      return response;
    } catch (error) {
      console.error('Failed to get preferences:', error);
      throw error;
    }
  },
};
