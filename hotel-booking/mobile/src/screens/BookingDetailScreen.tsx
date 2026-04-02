import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Share } from 'react-native';
import { Colors } from '../theme/colors';
import { api } from '../services/api';
import { MapPin, Calendar, CreditCard, Share2, Key, Clock, MessageSquare } from 'lucide-react-native';

export const BookingDetailScreen = ({ route, navigation }: any) => {
  const { bookingId } = route.params || { bookingId: 'B-83921' };
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    api.get(`/bookings/my`).then(resp => {
      const found = resp.data.find((b: any) => b.id === bookingId);
      setBooking(found || resp.data[0]);
    });
  }, [bookingId]);

  const onShare = async () => {
    try {
      await Share.share({ message: `I'm staying at Amankora Thimphu! Reservation Ref: ${bookingId}` });
    } catch (error) {}
  };

  if (!booking) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
       <View style={styles.card}>
          <Text style={styles.kicker}>Reservation Confirmed</Text>
          <Text style={styles.hotelName}>Amankora Thimphu</Text>

          <View style={styles.grid}>
             <View style={styles.gridItem}>
                <Calendar size={16} color={Colors.gold} />
                <Text style={styles.val}>{booking.check_in}</Text>
                <Text style={styles.lab}>Check-In</Text>
             </View>
             <View style={styles.gridItem}>
                <Clock size={16} color={Colors.gold} />
                <Text style={styles.val}>14:00</Text>
                <Text style={styles.lab}>Arrival Window</Text>
             </View>
          </View>
       </View>

       <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Directions', { hotelId: booking.hotel_id, hotelName: 'Amankora Thimphu' })}
          >
             <MapPin size={24} color={Colors.stone900} />
             <Text style={styles.actionText}>Get Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Chat', { tenantId: booking.hotel_id })}
          >
             <MessageSquare size={24} color={Colors.stone900} />
             <Text style={styles.actionText}>Concierge</Text>
          </TouchableOpacity>
       </View>

       <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Experience</Text>

          {!booking.pre_arrival_completed ? (
            <TouchableOpacity
                style={styles.premiumBtn}
                onPress={() => navigation.navigate('PreArrival', { bookingId: booking.id })}
            >
               <Text style={styles.premiumBtnText}>Complete Pre-Arrival Form</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
                style={[styles.premiumBtn, { backgroundColor: Colors.gold }]}
                onPress={() => navigation.navigate('DigitalKey', { bookingId: booking.id })}
            >
               <Key size={18} color="white" style={{ marginRight: 12 }} />
               <Text style={styles.premiumBtnText}>Access Digital Key</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
             style={styles.secondaryBtn}
             onPress={() => navigation.navigate('LateArrival', { bookingId: booking.id })}
          >
             <Text style={styles.secondaryBtnText}>Notify Late Arrival</Text>
          </TouchableOpacity>
       </View>

       <TouchableOpacity style={styles.share} onPress={onShare}>
          <Share2 size={16} color={Colors.stone400} />
          <Text style={styles.shareText}>Share itinerary</Text>
       </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { padding: 24, paddingTop: 40 },
  card: { backgroundColor: Colors.stone900, padding: 32, borderRadius: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  kicker: { fontSize: 9, fontWeight: '900', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  hotelName: { fontSize: 24, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', color: 'white', marginBottom: 32 },
  grid: { flexDirection: 'row', gap: 32 },
  gridItem: { flex: 1, gap: 4 },
  val: { color: 'white', fontSize: 15, fontWeight: '600' },
  lab: { color: Colors.stone500, fontSize: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  actionGrid: { flexDirection: 'row', gap: 16, marginBottom: 40 },
  actionCard: { flex: 1, backgroundColor: 'white', padding: 24, borderRadius: 16, alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  actionText: { fontSize: 10, fontWeight: '900', color: Colors.stone900, textTransform: 'uppercase', letterSpacing: 1 },
  section: { gap: 16, marginBottom: 40 },
  sectionTitle: { fontSize: 10, fontWeight: '900', color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 2, marginLeft: 8, marginBottom: 8 },
  premiumBtn: { backgroundColor: Colors.stone900, paddingVertical: 20, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  premiumBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5 },
  secondaryBtn: { paddingVertical: 20, borderRadius: 12, alignItems: 'center', borderLight: 1, borderColor: Colors.stone200, backgroundColor: 'white' },
  secondaryBtnText: { color: Colors.stone900, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  share: { flexDirection: 'row', itemsCenter: 'center', justifyContent: 'center', gap: 8, marginTop: 20 },
  shareText: { color: Colors.stone400, fontSize: 11, fontWeight: '600' }
});
