import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

export const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const RESULTS = [
    { id: 1, name: 'Heritage Bhutan Lodge', distance: '1.2 km', duration: '15 mins', price: 'BTN 5,500' },
    { id: 2, name: 'Paro Riverside Resort', distance: '54 km', duration: '1h 20m', price: 'BTN 4,200' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Bhutan Hotels..."
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={10} centerCoordinate={[89.6339, 27.4728]} />
      </MapboxGL.MapView>

      <View style={styles.resultsOverlay}>
        <FlatList
          data={RESULTS}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultCard}
              onPress={() => navigation.navigate('HotelDetail', { id: item.id })}
            >
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text style={styles.details}>{item.distance} • {item.duration} away</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10, backgroundColor: 'white', borderRadius: 15, padding: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  input: { height: 40, fontWeight: 'bold' },
  map: { flex: 1 },
  resultsOverlay: { position: 'absolute', bottom: 40, left: 0, right: 0 },
  resultCard: { backgroundColor: 'white', width: 280, padding: 20, marginHorizontal: 15, borderRadius: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  hotelName: { fontSize: 18, fontWeight: 'bold' },
  details: { color: '#999', marginVertical: 5, fontSize: 13 },
  price: { color: '#2563eb', fontWeight: '900', fontSize: 16, mt: 5 }
});
