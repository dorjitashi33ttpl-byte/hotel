import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';

const API_URL = 'https://api.hotel.bt/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Configure React Query with Offline Caching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

const asyncStoragePersistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
});

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
});
