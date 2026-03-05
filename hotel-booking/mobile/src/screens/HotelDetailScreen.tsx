import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

export const HotelDetailScreen = ({ route, navigation }) => {
  const [routeGeometry, setRouteGeometry] = useState(null);

  useEffect(() => {
    // Mock fetching route from backend API /public/hotels/{id}/route
    setRouteGeometry({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [89.6339, 27.4728],
          [89.6350, 27.4740]
        ]
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.title}>Thimphu Heritage Lodge</Text>
        <Text style={styles.description}>
          Experience authentic Bhutanese hospitality with world-class amenities.
        </Text>

        <Text style={styles.sectionTitle}>Location & Directions</Text>
        <View style={styles.mapContainer}>
          <MapboxGL.MapView style={styles.miniMap}>
            <MapboxGL.Camera zoomLevel={14} centerCoordinate={[89.6339, 27.4728]} />
            {routeGeometry && (
              <MapboxGL.ShapeSource id="routeSource" shape={routeGeometry}>
                <MapboxGL.LineLayer id="routeLayer" style={{ lineColor: '#2563eb', lineWidth: 4 }} />
              </MapboxGL.ShapeSource>
            )}
          </MapboxGL.MapView>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.bookButtonText}>Book Now • BTN 5,000 / Night</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imagePlaceholder: { height: 250, backgroundColor: '#f0f0f0' },
  content: { padding: 25 },
  title: { fontSize: 26, fontWeight: '900', color: '#111' },
  description: { marginVertical: 15, color: '#666', lineHeight: 22, fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, mb: 10 },
  mapContainer: { height: 200, backgroundColor: '#eee', borderRadius: 20, overflow: 'hidden', marginVertical: 15 },
  miniMap: { flex: 1 },
  bookButton: { backgroundColor: '#2563eb', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 30, shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
  bookButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
