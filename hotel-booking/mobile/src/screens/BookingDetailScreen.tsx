import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { Colors } from '../theme/colors';

export const BookingDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params || { id: '1' };
  const [loading, setLoading] = useState(false);

  const handleAction = (name: string, route: string) => {
     navigation.navigate(route, { bookingId: id });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
         <Text style={styles.kicker}>Current Sanctuary</Text>
         <Text style={styles.title}>Amankora Paro</Text>
         <Text style={styles.dates}>01 June - 05 June, 2026</Text>
      </View>

      <View style={styles.statusSection}>
         <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Room Status</Text>
            <Text style={styles.statusValue}>Ready for Arrival</Text>
         </View>
      </View>

      <View style={styles.actions}>
         <Text style={styles.actionTitle}>Guest Experience</Text>

         {[
           { name: 'Pre-Arrival Form', route: 'PreArrival', desc: 'Required for digital check-in' },
           { name: 'Digital Room Key', route: 'DigitalKey', desc: 'Secure contactless access' },
           { name: 'Late Arrival Update', route: 'LateArrival', desc: 'Notify concierge of delays' },
           { name: 'Service Requests', route: 'ServiceRequest', desc: 'Amenities & housekeeping' },
           { name: 'Concierge Chat', route: 'Chat', desc: 'Direct secure messaging' }
         ].map(item => (
           <TouchableOpacity key={item.name} style={styles.actionBtn} onPress={() => handleAction(item.name, item.route)}>
              <View>
                 <Text style={styles.actionName}>{item.name}</Text>
                 <Text style={styles.actionDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
           </TouchableOpacity>
         ))}

         <TouchableOpacity
           style={styles.checkoutBtn}
           onPress={() => Alert.alert("Self-Checkout", "Initiate your departure process?", [{text: "Cancel"}, {text: "Confirm"}])}
         >
            <Text style={styles.checkoutText}>Self Checkout</Text>
         </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 60 },
  header: { padding: 32, paddingTop: 40, backgroundColor: Colors.white },
  kicker: { fontSize: 10, fontWeight: 'bold', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  dates: { fontSize: 14, color: Colors.stone400, marginTop: 8 },
  statusSection: { padding: 32 },
  statusCard: { backgroundColor: Colors.stone900, padding: 24, borderRadius: 2 },
  statusLabel: { fontSize: 9, fontWeight: 'bold', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  statusValue: { fontSize: 18, color: Colors.white, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  actions: { paddingHorizontal: 32 },
  actionTitle: { fontSize: 10, fontWeight: 'black', color: Colors.stone300, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 },
  actionBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  actionName: { fontSize: 16, color: Colors.stone900, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', marginBottom: 4 },
  actionDesc: { fontSize: 11, color: Colors.stone400 },
  arrow: { fontSize: 18, color: Colors.stone200 },
  checkoutBtn: { marginTop: 60, backgroundColor: 'white', borderWidth: 1, borderColor: Colors.stone200, paddingVertical: 20, alignItems: 'center' },
  checkoutText: { fontSize: 11, fontWeight: 'bold', color: '#ef4444', textTransform: 'uppercase', letterSpacing: 2 },
});
