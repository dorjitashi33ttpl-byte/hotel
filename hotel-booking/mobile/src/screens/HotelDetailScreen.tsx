import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { COLORS, SPACING } from '../utils/theme';

export const HotelDetailScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.badge}><Text style={styles.badgeText}>★ 4.9</Text></View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Thimphu Heritage Lodge</Text>
        <Text style={styles.location}>Norzin Lam, Thimphu, Bhutan</Text>

        <View style={styles.amenities}>
           {['Wifi', 'Spa', 'Pool'].map(a => (
             <View key={a} style={styles.aCard}><Text style={styles.aText}>{a}</Text></View>
           ))}
        </View>

        <Text style={styles.desc}>
          Authentic Bhutanese hospitality in the heart of the capital. Traditional architecture meets modern luxury.
        </Text>

        <View style={styles.mapWrap}>
           <MapboxGL.MapView style={styles.miniMap}>
             <MapboxGL.Camera zoomLevel={14} centerCoordinate={[89.6339, 27.4728]} />
           </MapboxGL.MapView>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Booking')}>
           <Text style={styles.btnText}>Book Now • BTN 5,500</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { height: 300, backgroundColor: '#ddd' },
  badge: { position: 'absolute', bottom: 20, right: 20, backgroundColor: COLORS.white, padding: 10, borderRadius: 10, elevation: 5 },
  badgeText: { fontWeight: 'bold' },
  content: { padding: SPACING.lg },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.text },
  location: { color: COLORS.secondary, marginTop: 5, fontSize: 14 },
  amenities: { flexDirection: 'row', gap: 10, marginVertical: 20 },
  aCard: { backgroundColor: COLORS.white, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eee' },
  aText: { fontSize: 12, fontWeight: 'bold' },
  desc: { color: '#666', lineHeight: 22 },
  mapWrap: { height: 180, borderRadius: 20, overflow: 'hidden', marginVertical: 25 },
  miniMap: { flex: 1 },
  btn: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 15, alignItems: 'center' },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 }
});
