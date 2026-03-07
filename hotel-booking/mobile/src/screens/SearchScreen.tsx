import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { COLORS } from '../utils/theme';

export const SearchScreen = () => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Where in Bhutan?"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <View style={styles.predictive}>
             <Text style={styles.pText}>Thimphu, BT</Text>
             <Text style={styles.pText}>Paro, BT</Text>
          </View>
        )}
      </View>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={10} centerCoordinate={[89.6339, 27.4728]} />
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10, backgroundColor: 'white', borderRadius: 15, padding: 15, elevation: 5 },
  input: { height: 40, fontWeight: 'bold' },
  predictive: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  pText: { paddingVertical: 8, fontWeight: '500', color: COLORS.secondary },
  map: { flex: 1 }
});
