import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SearchScreen } from './src/screens/SearchScreen';
import { HotelDetailScreen } from './src/screens/HotelDetailScreen';
import { BookingHistoryScreen } from './src/screens/BookingHistoryScreen';
import { LateArrivalScreen } from './src/screens/LateArrivalScreen';
import { BookingScreen } from './src/screens/BookingScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

const queryClient = new QueryClient();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontWeight: 'bold' }, tabBarActiveTintColor: '#2563eb' }}>
      <Tab.Screen name="Explore" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="My Trips" component={BookingHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerStyle: { elevation: 0, shadowOpacity: 0 } }}>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="HotelDetail" component={HotelDetailScreen} options={{ title: 'Hotel' }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Complete Booking' }} />
          <Stack.Screen name="LateArrival" component={LateArrivalScreen} options={{ title: 'Update Arrival' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
