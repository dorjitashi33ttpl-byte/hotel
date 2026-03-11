import { useState } from 'react';
import { Alert, Platform } from 'react-native';

/**
 * Hook to manage biometric state and logic
 * Stubs for FaceID / Fingerprint logic
 */
export const useBiometrics = () => {
  const [isEnabled, setEnabled] = useState(false);

  const setIsEnabled = async (value: boolean) => {
    if (value) {
      // Stub for checking hardware availability
      const hasHardware = true;
      const isEnrolled = true;

      if (!hasHardware) {
         Alert.alert('Error', 'Your device does not support biometrics.');
         return;
      }

      if (!isEnrolled) {
         Alert.alert('Setup Required', 'Please set up biometrics in your device settings first.');
         return;
      }

      // Stub for authentication
      Alert.alert(
        'Enable Biometrics',
        `Confirm that you want to enable ${Platform.OS === 'ios' ? 'FaceID' : 'Biometric'} for secure login.`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => setEnabled(false) },
          { text: 'Confirm', onPress: () => setEnabled(true) }
        ]
      );
    } else {
      setEnabled(false);
    }
  };

  return { isEnabled, setIsEnabled };
};
