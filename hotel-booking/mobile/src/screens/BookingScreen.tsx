import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const BookingScreen = ({ navigation }) => {
  const [method, setMethod] = useState('stripe');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Secure Payment</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.hotelName}>Thimphu Heritage Lodge</Text>
        <Text style={styles.details}>Deluxe Heritage Room • Jun 10-12</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>BTN 11,000</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Payment Method</Text>
      {['Stripe', 'PayPal', 'Local Bank'].map(m => (
        <TouchableOpacity
          key={m}
          style={[styles.methodCard, method === m.toLowerCase() && styles.selectedCard]}
          onPress={() => setMethod(m.toLowerCase())}
        >
          <Text style={[styles.methodText, method === m.toLowerCase() && styles.selectedText]}>{m}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.confirmText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 25 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 20 },
  summaryCard: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 30, elevation: 2 },
  hotelName: { fontSize: 18, fontWeight: 'bold' },
  details: { color: '#666', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 16, color: '#999' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#2563eb' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  methodCard: { backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  selectedCard: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  methodText: { fontWeight: 'bold', color: '#666' },
  selectedText: { color: '#2563eb' },
  confirmButton: { backgroundColor: '#2563eb', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  confirmText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
