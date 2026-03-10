import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';

interface BannerProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  visible: boolean;
  onHide: () => void;
}

export const NotificationBanner: React.FC<BannerProps> = ({ message, type = 'info', visible, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();

      const timer = setTimeout(() => {
        hide();
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      hide();
    }
  }, [visible]);

  const hide = () => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onHide());
  };

  const backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : Colors.stone900;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], backgroundColor }]}>
      <SafeAreaView>
        <Text style={styles.text}>{message}</Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
