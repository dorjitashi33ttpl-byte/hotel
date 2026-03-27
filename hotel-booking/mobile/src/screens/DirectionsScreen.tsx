import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../theme/colors';
import { api } from '../services/api';

export const DirectionsScreen = ({ route }: any) => {
  const { hotelId, hotelName } = route.params || { hotelId: 'H1', hotelName: 'Thimphu Heritage' };
  const [routeInfo, setRouteInfo] = useState<any>(null);

  useEffect(() => {
    // Fetch route from user's current location (mocked lat/lng)
    api.get(`/hotels/${hotelId}/route`, { params: { from_lat: 27.48, from_lng: 89.64 } }).then(resp => {
      setRouteInfo(resp.data);
    });
  }, [hotelId]);

  const openExternalMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${hotelName}`,
      android: `geo:0,0?q=${hotelName}`
    });
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapStub}>
         <Text style={styles.mapText}>[ Mapbox Polyline Preview ]</Text>
      </View>

      <View style={styles.content}>
         <Text style={styles.kicker}>Arriving at Your Sanctuary</Text>
         <Text style={styles.title}>{hotelName}</Text>

         <View style={styles.stats}>
            <View style={styles.stat}>
               <Text style={styles.statVal}>{routeInfo?.duration_mins || '--'} min</Text>
               <Text style={styles.statLabel}>Travel Time</Text>
            </View>
            <View style={[styles.stat, styles.border]}>
               <Text style={styles.statVal}>{routeInfo?.distance_km || '--'} km</Text>
               <Text style={styles.statLabel}>Distance</Text>
            </View>
         </View>

         <TouchableOpacity style={styles.mainBtn} onPress={openExternalMaps}>
            <Text style={styles.btnText}>Open in Google Maps</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  mapStub: { flex: 1.2, backgroundColor: Colors.stone100, alignItems: 'center', justifyContent: 'center' },
  mapText: { color: Colors.stone300, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
  content: { flex: 1, padding: 40, borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -40, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  kicker: { fontSize: 10, fontWeight: '900', color: Colors.gold, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 28, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', color: Colors.stone900, marginBottom: 40 },
  stats: { flexDirection: 'row', marginBottom: 60 },
  stat: { flex: 1 },
  border: { borderLeftWidth: 1, borderLeftColor: Colors.stone100, paddingLeft: 24 },
  statVal: { fontSize: 20, fontWeight: 'bold', color: Colors.stone900 },
  statLabel: { fontSize: 10, color: Colors.stone400, textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
  mainBtn: { backgroundColor: Colors.stone900, paddingVertical: 20, alignItems: 'center', borderRadius: 4 },
  btnText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }
});
