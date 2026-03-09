import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export const HotelDetailScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.stone50 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
             <Text style={styles.heroKicker}>Boutique Sanctuary</Text>
             <Text style={styles.heroTitle}>Amankora Paro</Text>
             <Text style={styles.heroSubtitle}>Paro Valley, Bhutan</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
           <Text style={styles.sectionTitle}>Refined Heritage</Text>
           <Text style={styles.description}>
             Overlooking the snow-capped peaks of Mount Jhomolhari, our lodge is a sanctuary designed for profound rejuvenation.
           </Text>
        </View>

        <View style={styles.wellnessSection}>
           <Image
             source={{ uri: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800' }}
             style={styles.wellnessImage}
           />
           <View style={styles.wellnessOverlay}>
              <Text style={styles.wellnessTitle}>The Wellness Ritual</Text>
              <Text style={styles.wellnessLink}>Discover More →</Text>
           </View>
        </View>

        <View style={styles.roomSection}>
           <Text style={styles.sectionTitle}>The Suites</Text>
           {[1, 2].map(r => (
             <TouchableOpacity key={r} style={styles.roomCard}>
                <Image
                  source={{ uri: r === 1 ? 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' : 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800' }}
                  style={styles.roomImage}
                />
                <View style={styles.roomInfo}>
                   <Text style={styles.roomName}>{r === 1 ? 'Valley View Suite' : 'Heritage Residence'}</Text>
                   <View style={styles.roomMeta}>
                      <Text style={styles.roomPrice}>$1,400</Text>
                      <Text style={styles.roomLabel}>/ NIGHT</Text>
                   </View>
                </View>
             </TouchableOpacity>
           ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
         <View>
            <Text style={styles.footerPrice}>$1,400</Text>
            <Text style={styles.footerLabel}>Per night</Text>
         </View>
         <TouchableOpacity
           style={styles.bookButton}
           onPress={() => navigation.navigate('Booking')}
         >
            <Text style={styles.bookButtonText}>Book My Stay</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 140 },
  heroSection: { height: 600, position: 'relative' },
  heroImage: { width: '100%', height: '100%', opacity: 0.9 },
  heroOverlay: { position: 'absolute', bottom: 40, left: 32, right: 32 },
  heroKicker: { fontSize: 10, fontWeight: 'bold', color: Colors.stone100, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { fontSize: 48, color: Colors.white, fontFamily: 'serif', trackingTighter: true },
  heroSubtitle: { fontSize: 12, color: Colors.stone200, letterSpacing: 2, textTransform: 'uppercase', marginTop: 12 },
  infoSection: { padding: 40 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 },
  description: { fontSize: 24, lineHeight: 36, color: Colors.stone900, fontFamily: 'serif' },
  wellnessSection: { margin: 40, height: 450, position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  wellnessImage: { width: '100%', height: '100%', opacity: 0.9 },
  wellnessOverlay: { position: 'absolute', bottom: 32, left: 32 },
  wellnessTitle: { fontSize: 28, color: Colors.white, fontFamily: 'serif', marginBottom: 8 },
  wellnessLink: { fontSize: 10, color: Colors.white, fontWeight: 'bold', letterSpacing: 2, textTransform: 'uppercase' },
  roomSection: { paddingHorizontal: 40 },
  roomCard: { marginBottom: 48, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  roomImage: { width: '100%', height: 300, backgroundColor: Colors.stone200 },
  roomInfo: { paddingVertical: 24 },
  roomName: { fontSize: 22, fontFamily: 'serif', color: Colors.stone900, marginBottom: 8 },
  roomMeta: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  roomPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.gold },
  roomLabel: { fontSize: 10, color: Colors.stone400, letterSpacing: 1 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.white, padding: 32, paddingBottom: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.stone100, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.05, shadowRadius: 10 },
  footerPrice: { fontSize: 28, fontFamily: 'serif', color: Colors.stone900 },
  footerLabel: { fontSize: 10, color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 1 },
  bookButton: { backgroundColor: Colors.stone900, paddingHorizontal: 40, paddingVertical: 20 },
  bookButtonText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3 },
});
