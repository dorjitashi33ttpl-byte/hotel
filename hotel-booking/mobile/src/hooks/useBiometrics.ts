import { useState } from 'react';
import { Alert, Platform } from 'react-native';

export const useBiometrics = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const authenticate = async () => {
    if (Platform.OS === 'web') return true;

    return new Promise((resolve) => {
      console.log('[Biometric Stub] Requesting FaceID/Fingerprint...');
      // In a real app:
      // const result = await LocalAuthentication.authenticateAsync();

      Alert.alert(
        "Biometric Identity",
        "Confirm your identity using FaceID or Fingerprint to proceed.",
        [
          { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
          { text: "Authenticate", onPress: () => resolve(true) }
        ]
      );
    });
  };

  return { isEnabled, setIsEnabled, authenticate };
};
