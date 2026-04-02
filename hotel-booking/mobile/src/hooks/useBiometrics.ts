import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
// import * as LocalAuthentication from 'expo-local-authentication';

export const useBiometrics = () => {
  const [isSupported, setIsSupported] = useState(true);
  const [authEnabled, setAuthEnabled] = useState(false);

  useEffect(() => {
    // Simulated check for hardware support
    // const compatible = await LocalAuthentication.hasHardwareAsync();
    // setIsSupported(compatible);
  }, []);

  const authenticate = async () => {
    /*
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Sign in to Sanctuary',
      fallbackLabel: 'Use Passcode',
    });
    return result.success;
    */
    return true; // Mocked success
  };

  const toggleAuth = async (value: boolean) => {
    if (value) {
      const success = await authenticate();
      if (success) setAuthEnabled(true);
      else Alert.alert("Authentication Failed", "Could not verify identity.");
    } else {
      setAuthEnabled(false);
    }
  };

  return { authEnabled, toggleAuth, isSupported };
};
