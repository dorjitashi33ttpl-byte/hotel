import { Platform } from 'react-native';

export const useHaptics = () => {
  const trigger = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
    if (Platform.OS === 'web') return;

    console.log(`[Haptic Stub] Triggered ${type} feedback`);
    // In a real expo/bare-workflow app:
    // import * as Haptics from 'expo-haptics';
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); etc.
  };

  return { trigger };
};
