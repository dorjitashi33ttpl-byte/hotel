import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/services/api';
import { linking } from './src/config/linking';
import { useNotifications } from './src/hooks/useNotifications';
import { NotificationBanner } from './src/components/common/NotificationBanner';

import { SearchScreen } from './src/screens/SearchScreen';
import { HotelDetailScreen } from './src/screens/HotelDetailScreen';
import { BookingHistoryScreen } from './src/screens/BookingHistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BookingDetailScreen } from './src/screens/BookingDetailScreen';
import { LateArrivalScreen } from './src/screens/LateArrivalScreen';
import { BookingScreen } from './src/screens/BookingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 10, letterSpacing: 1 },
        tabBarActiveTintColor: '#B4975A',
        tabBarInactiveTintColor: '#A8A29E',
        tabBarStyle: { borderTopWidth: 1, borderTopColor: '#EAE8E1', paddingBottom: 5, paddingTop: 5 }
      }}
    >
      <Tab.Screen name="Explore" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="My Trips" component={BookingHistoryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function NavigationRoot() {
  const [banner, setBanner] = useState({ visible: false, message: '', type: 'info' as any });
  useNotifications();

  return (
    <NavigationContainer linking={linking}>
      <NotificationBanner
        visible={banner.visible}
        message={banner.message}
        type={banner.type}
        onHide={() => setBanner({ ...banner, visible: false })}
      />
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Back',
          headerTitleStyle: { fontFamily: 'serif', fontSize: 18 },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FCFAF7' },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HotelDetail" component={HotelDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Reservation' }} />
        <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: 'Stay Details' }} />
        <Stack.Screen name="LateArrival" component={LateArrivalScreen} options={{ title: 'Arrival Update' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationRoot />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
