import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export const HotelDetailScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.title}>Thimphu Heritage Lodge</Text>
        <Text style={styles.description}>
          Experience the authentic Bhutanese hospitality in the heart of the capital.
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Distance</Text>
          <Text style={styles.infoValue}>1.2 km from center</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={() => {/* Book logic */}}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.routeButton} onPress={() => {/* Directions logic */}}>
          <Text style={styles.routeButtonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imagePlaceholder: { height: 250, backgroundColor: '#f0f0f0' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  description: { marginVertical: 15, color: '#666', lineHeight: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  infoLabel: { color: '#999' },
  infoValue: { fontWeight: 'bold' },
  bookButton: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  bookButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  routeButton: { backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#2563eb' },
  routeButtonText: { color: '#2563eb', fontWeight: 'bold' }
});
