import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * Custom hook to handle offline caching of API results.
 */
export const useOfflineCache = (key: string, fetchFn: () => Promise<any>) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // 1. Try to load from cache
      const cached = await AsyncStorage.getItem(`@cache:${key}`);
      if (cached) setData(JSON.parse(cached));

      try {
        // 2. Fetch fresh data
        const fresh = await fetchFn();
        setData(fresh);
        // 3. Update cache
        await AsyncStorage.setItem(`@cache:${key}`, JSON.stringify(fresh));
      } catch (err) {
        console.warn('Offline mode: failed to fetch fresh data', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key]);

  return { data, loading };
};
