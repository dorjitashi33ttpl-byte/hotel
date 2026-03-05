import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken('YOUR_MAPBOX_TOKEN');

export const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

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
        <MapboxGL.Camera zoomLevel={12} centerCoordinate={[89.6339, 27.4728]} />
        <MapboxGL.PointAnnotation id="hotel1" coordinate={[89.6339, 27.4728]}>
          <TouchableOpacity onPress={() => navigation.navigate('HotelDetail', { id: 1 })}>
             <View style={styles.marker} />
          </TouchableOpacity>
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10, backgroundColor: 'white', borderRadius: 10, padding: 10, elevation: 5 },
  input: { height: 40 },
  map: { flex: 1 },
  marker: { width: 30, height: 30, backgroundColor: 'blue', borderRadius: 15, borderWidth: 2, borderColor: 'white' }
});
