import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';

export const BookingHistoryScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
         <Text style={styles.kicker}>Your Journeys</Text>
         <Text style={styles.title}>Trip History</Text>
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Active & Upcoming</Text>
         <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
               <View>
                  <Text style={styles.hotelName}>Amankora Paro</Text>
                  <Text style={styles.dates}>01 June - 05 June, 2026</Text>
               </View>
               <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>CONFIRMED</Text>
               </View>
            </View>
            <Image
               source={{ uri: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800' }}
               style={styles.cardImage}
            />
            <View style={styles.cardFooter}>
               <Text style={styles.roomType}>Valley View Suite</Text>
               <TouchableOpacity style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>Manage Stay</Text>
               </TouchableOpacity>
            </View>
         </TouchableOpacity>
      </View>

      <View style={styles.pastSection}>
         <Text style={styles.sectionTitle}>Past Sanctuaries</Text>
         {[1].map(i => (
           <View key={i} style={styles.pastItem}>
              <View style={styles.pastInfo}>
                 <Text style={styles.pastHotel}>Zhiwa Ling Heritage</Text>
                 <Text style={styles.pastDate}>October 2025</Text>
              </View>
              <Text style={styles.pastPrice}>$3,200</Text>
           </View>
         ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 40 },
  header: { padding: 32, paddingTop: 60 },
  kicker: { fontSize: 10, fontWeight: 'bold', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 36, fontFamily: 'serif', color: Colors.stone900 },
  section: { padding: 32 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 },
  card: { backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  cardHeader: { padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hotelName: { fontSize: 20, fontFamily: 'serif', color: Colors.stone900 },
  dates: { fontSize: 12, color: Colors.stone400, marginTop: 4 },
  statusBadge: { backgroundColor: Colors.stone900, paddingHorizontal: 12, paddingVertical: 6 },
  statusText: { color: Colors.white, fontSize: 8, fontWeight: 'bold', letterSpacing: 1 },
  cardImage: { width: '100%', height: 200 },
  cardFooter: { padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roomType: { fontSize: 14, fontFamily: 'serif', color: Colors.stone500 },
  detailButton: { borderBottomWidth: 1, borderBottomColor: Colors.stone900 },
  detailButtonText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 2 },
  pastSection: { paddingHorizontal: 32 },
  pastItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  pastHotel: { fontSize: 16, fontFamily: 'serif', color: Colors.stone900 },
  pastDate: { fontSize: 11, color: Colors.stone400, marginTop: 2 },
  pastPrice: { fontSize: 14, fontStyle: 'italic', color: Colors.stone500 },
});
