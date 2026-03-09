import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SearchScreen } from './src/screens/SearchScreen';
import { HotelDetailScreen } from './src/screens/HotelDetailScreen';
import { BookingHistoryScreen } from './src/screens/BookingHistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BookingDetailScreen } from './src/screens/BookingDetailScreen';
import { LateArrivalScreen } from './src/screens/LateArrivalScreen';
import { BookingScreen } from './src/screens/BookingScreen';

const queryClient = new QueryClient();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontWeight: 'bold' }, tabBarActiveTintColor: '#B4975A' }}>
      <Tab.Screen name="Explore" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="My Trips" component={BookingHistoryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerStyle: { elevation: 0, shadowOpacity: 0 } }}>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="HotelDetail" component={HotelDetailScreen} options={{ title: 'Sanctuary' }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Reservation' }} />
          <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: 'Stay Details' }} />
          <Stack.Screen name="LateArrival" component={LateArrivalScreen} options={{ title: 'Arrival Update' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
