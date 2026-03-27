import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../theme/colors';
import { api } from '../services/api';

export const BookingHistoryScreen = ({ navigation }: any) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my').then(resp => {
      setBookings(resp.data);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })}
    >
       <View style={styles.cardHeader}>
          <Text style={styles.hotelName}>{item.hotel_name || 'Amankora Thimphu'}</Text>
          <Text style={[styles.status, { color: item.status === 'CONFIRMED' ? '#10b981' : Colors.stone400 }]}>
            {item.status}
          </Text>
       </View>
       <View style={styles.details}>
          <Text style={styles.date}>{item.check_in} — {item.check_out}</Text>
          <Text style={styles.price}>Nu. {item.total_price.toLocaleString()}</Text>
       </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Your Sanctuary Journey</Text>
       <FlatList
         data={bookings}
         renderItem={renderItem}
         keyExtractor={(item: any) => item.id}
         contentContainerStyle={styles.list}
         ListEmptyComponent={
           <View style={styles.empty}>
              <Text style={styles.emptyText}>No past stays found.</Text>
           </View>
         }
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50, paddingTop: 60 },
  title: { fontSize: 24, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', color: Colors.stone900, marginHorizontal: 24, marginBottom: 32 },
  list: { paddingHorizontal: 24 },
  card: { backgroundColor: 'white', padding: 24, borderBottomWidth: 1, borderBottomColor: Colors.stone100, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  hotelName: { fontSize: 16, fontWeight: 'bold', color: Colors.stone900 },
  status: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  details: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 12, color: Colors.stone400 },
  price: { fontSize: 13, color: Colors.stone900, fontWeight: '600' },
  empty: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: Colors.stone300, fontSize: 14 }
});
