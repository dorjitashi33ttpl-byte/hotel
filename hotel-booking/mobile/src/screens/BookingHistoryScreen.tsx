import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { Colors } from '../theme/colors';
import { api } from '../services/api';
import { Skeleton } from '../components/common/Skeleton';

export const BookingHistoryScreen = ({ navigation }: any) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('upcoming');

  const fetchBookings = async () => {
    try {
      const resp = await api.get('/bookings/my');
      setBookings(resp.data);
    } catch (err) {} finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const filteredBookings = bookings.filter((b: any) => {
     if (filter === 'upcoming') return b.status !== 'CHECKED_OUT' && b.status !== 'CANCELLED';
     return b.status === 'CHECKED_OUT';
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })}
    >
       <View style={styles.cardHeader}>
          <Text style={styles.hotelName}>Amankora Thimphu</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.status === 'CONFIRMED' ? '#10b981' : Colors.stone100 }]}>
            <Text style={[styles.statusText, { color: item.status === 'CONFIRMED' ? 'white' : Colors.stone400 }]}>{item.status}</Text>
          </View>
       </View>
       <View style={styles.details}>
          <Text style={styles.date}>{item.check_in} — {item.check_out}</Text>
          <Text style={styles.price}>Nu. {item.total_price.toLocaleString()}</Text>
       </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <Text style={styles.kicker}>Your Stays</Text>
          <Text style={styles.title}>My Sanctuary Trips</Text>
       </View>

       <View style={styles.tabs}>
          {['upcoming', 'past'].map(t => (
            <TouchableOpacity key={t} onPress={() => setFilter(t)} style={[styles.tab, filter === t && styles.activeTab]}>
               <Text style={[styles.tabText, filter === t && styles.activeTabText]}>{t}</Text>
            </TouchableOpacity>
          ))}
       </View>

       {loading ? (
         <View style={{ padding: 24 }}><Skeleton height={120} /><Skeleton height={120} /></View>
       ) : (
         <FlatList
            data={filteredBookings}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.gold} />}
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>No {filter} stays found in your journey.</Text>
                </View>
            }
         />
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  header: { paddingHorizontal: 24, paddingTop: 80, marginBottom: 24 },
  kicker: { fontSize: 10, fontWeight: '900', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 28, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', color: Colors.stone900 },
  tabs: { flexDirection: 'row', paddingHorizontal: 24, gap: 24, marginBottom: 12 },
  tab: { paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: Colors.gold },
  tabText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: Colors.stone400, letterSpacing: 1 },
  activeTabText: { color: Colors.stone900 },
  list: { padding: 24 },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  hotelName: { fontSize: 16, fontWeight: 'bold', color: Colors.stone900 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 8, fontWeight: '900', textTransform: 'uppercase' },
  details: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 12, color: Colors.stone400 },
  price: { fontSize: 13, color: Colors.stone900, fontWeight: 'bold' },
  empty: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: Colors.stone300, fontSize: 14 }
});
