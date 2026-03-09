import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';

export const HotelDetailScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
             <Text style={styles.heroTitle}>Amankora Paro</Text>
             <Text style={styles.heroSubtitle}>Paro Valley, Bhutan</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
           <Text style={styles.sectionTitle}>Refined Sanctuary</Text>
           <Text style={styles.description}>
             Overlooking the snow-capped peaks of Mount Jhomolhari, this lodge is nestled in a blue-pine forest. Architecture is a contemporary take on traditional dzong design with rammed-earth walls and wood-panelled interiors.
           </Text>

           <View style={styles.amenities}>
              {['Infinity Pool', 'Hot Stone Bath', 'Zen Garden', 'Organic Farm'].map(a => (
                <View key={a} style={styles.amenityItem}>
                   <View style={styles.amenityDot} />
                   <Text style={styles.amenityText}>{a}</Text>
                </View>
              ))}
           </View>
        </View>

        <View style={styles.roomSection}>
           <Text style={styles.sectionTitle}>Select Your Suite</Text>
           {[1, 2].map(r => (
             <TouchableOpacity key={r} style={styles.roomCard}>
                <Image
                  source={{ uri: r === 1 ? 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' : 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800' }}
                  style={styles.roomImage}
                />
                <View style={styles.roomInfo}>
                   <Text style={styles.roomName}>{r === 1 ? 'Valley View Suite' : 'Heritage Residence'}</Text>
                   <Text style={styles.roomPrice}>$1,400 / night</Text>
                </View>
             </TouchableOpacity>
           ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
         <View>
            <Text style={styles.footerPrice}>$1,400</Text>
            <Text style={styles.footerLabel}>Total per night</Text>
         </View>
         <TouchableOpacity
           style={styles.bookButton}
           onPress={() => navigation.navigate('Booking')}
         >
            <Text style={styles.bookButtonText}>Check Dates</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 120 },
  heroSection: { height: 500, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32, backgroundColor: 'rgba(0,0,0,0.2)' },
  heroTitle: { fontSize: 36, color: Colors.white, fontFamily: 'serif' },
  heroSubtitle: { fontSize: 14, color: Colors.stone200, letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 },
  infoSection: { padding: 32 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.stone900, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 },
  description: { fontSize: 16, lineHeight: 28, color: Colors.stone500, fontFamily: 'serif' },
  amenities: { marginTop: 32, flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  amenityItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: Colors.stone200 },
  amenityDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.gold, marginRight: 8 },
  amenityText: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', color: Colors.stone900, letterSpacing: 1 },
  roomSection: { padding: 32 },
  roomCard: { backgroundColor: Colors.white, marginBottom: 32, borderBottomWidth: 1, borderBottomColor: Colors.stone200 },
  roomImage: { width: '100%', height: 250 },
  roomInfo: { padding: 20 },
  roomName: { fontSize: 18, fontFamily: 'serif', marginBottom: 4 },
  roomPrice: { fontSize: 12, fontWeight: 'bold', color: Colors.gold },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.white, padding: 24, paddingBottom: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.stone100 },
  footerPrice: { fontSize: 24, fontFamily: 'serif', color: Colors.stone900 },
  footerLabel: { fontSize: 10, color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 1 },
  bookButton: { backgroundColor: Colors.stone900, paddingHorizontal: 32, paddingVertical: 16 },
  bookButtonText: { color: Colors.white, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
});
