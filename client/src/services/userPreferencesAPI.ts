import { authApi } from './apiClient';
import { ThemeMode, AccentColor } from '../app/themeContext';

export interface UserPreferences {
  theme?: ThemeMode;
  accentColor?: AccentColor;
}

type SavePayload = Partial<UserPreferences>;

// Check if token is set on the axios instance before making authenticated calls
function hasAuthToken(): boolean {
  return authApi.hasToken();
}

export const userPreferencesAPI = {
  // Save user preferences
  async savePreferences(preferences: SavePayload) {
    if (!hasAuthToken()) return {} as UserPreferences;
    const response = await authApi.post<{ data: UserPreferences }>('/user/preferences', preferences);
    return response?.data as UserPreferences;
  },

  // Get user preferences
  async getPreferences(): Promise<UserPreferences> {
    if (!hasAuthToken()) return {} as UserPreferences;
    const response = await authApi.get<{ data: UserPreferences }>('/user/preferences');
    return (response?.data ?? {}) as UserPreferences;
  },
};
