import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const BOOKINGS = [
  { id: 1, hotel: 'Thimphu Heritage Lodge', status: 'Confirmed', dates: 'Jun 10 - Jun 12', amount: 'BTN 15,000' },
  { id: 2, hotel: 'Paro Riverside Resort', status: 'Completed', dates: 'May 20 - May 22', amount: 'BTN 12,500' }
];

export const BookingHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={BOOKINGS}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.hotel}>{item.hotel}</Text>
            <Text style={styles.dates}>{item.dates}</Text>
            <View style={styles.row}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={[styles.status, { color: item.status === 'Confirmed' ? '#2563eb' : '#10b981' }]}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  card: { backgroundColor: 'white', p: 15, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 3, padding: 20 },
  hotel: { fontSize: 18, fontWeight: 'bold', mb: 5 },
  dates: { color: '#999', fontSize: 14, mb: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#eee', pt: 10, mt: 10 },
  amount: { fontWeight: 'bold', fontSize: 16 },
  status: { fontWeight: 'bold', textTransform: 'uppercase', fontSize: 12 }
});
