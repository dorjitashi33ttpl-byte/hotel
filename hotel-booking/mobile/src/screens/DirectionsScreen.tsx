import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../theme/colors';

export const DirectionsScreen = ({ route, navigation }: any) => {
  const { hotelName, distance, duration, polyline } = route.params || {
    hotelName: 'Amankora Paro',
    distance: '12.5 km',
    duration: '25 mins',
    polyline: '...'
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapStub}>
         <Text style={styles.mapText}>Mapbox Route Preview</Text>
         <Text style={styles.polylineStub}>Polyline: {polyline.substring(0, 20)}...</Text>
      </View>

      <View style={styles.card}>
         <Text style={styles.title}>{hotelName}</Text>
         <View style={styles.stats}>
            <View>
               <Text style={styles.label}>Distance</Text>
               <Text style={styles.value}>{distance}</Text>
            </View>
            <View>
               <Text style={styles.label}>Duration</Text>
               <Text style={styles.value}>{duration}</Text>
            </View>
         </View>

         <TouchableOpacity style={styles.externalBtn}>
            <Text style={styles.externalBtnText}>Open in Google Maps</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.closeBtnText}>Close</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone900 },
  mapStub: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.stone100 },
  mapText: { fontSize: 12, fontWeight: 'bold', color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 2 },
  polylineStub: { fontSize: 8, color: Colors.stone300, marginTop: 10 },
  card: { backgroundColor: Colors.white, padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  title: { fontSize: 24, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 24 },
  stats: { flexDirection: 'row', gap: 40, marginBottom: 40 },
  label: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  value: { fontSize: 18, color: Colors.stone900 },
  externalBtn: { backgroundColor: Colors.stone900, paddingVertical: 18, alignItems: 'center', marginBottom: 12 },
  externalBtnText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
  closeBtn: { paddingVertical: 12, alignItems: 'center' },
  closeBtnText: { color: Colors.stone400, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
});
