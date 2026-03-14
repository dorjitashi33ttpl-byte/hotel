import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { Colors } from '../theme/colors';

export const BookingDetailScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const handleSelfCheckout = () => {
    Alert.alert(
      "Self Checkout",
      "Are you ready to finalize your stay at Amankora Paro?",
      [
        { text: "Not yet", style: "cancel" },
        {
          text: "Confirm Checkout",
          onPress: async () => {
             setLoading(true);
             await new Promise(r => setTimeout(r, 2000));
             setLoading(false);
             setCheckedOut(true);
             Alert.alert("Checkout Complete", "Thank you for your stay. Safe travels!");
          }
        }
      ]
    );
  };

  if (checkedOut) {
    return (
      <View style={styles.doneContainer}>
         <Text style={styles.doneTitle}>Farewell</Text>
         <Text style={styles.doneText}>Your room status has been updated. We hope to see you again soon.</Text>
         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Back to Trips</Text>
         </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
         <Text style={styles.kicker}>Active Stay</Text>
         <Text style={styles.title}>Amankora Paro</Text>
         <Text style={styles.dates}>01 June - 05 June, 2026</Text>
      </View>

      <View style={styles.infoBox}>
         <Text style={styles.infoLabel}>Room</Text>
         <Text style={styles.infoValue}>Valley View Suite - Room 104</Text>
      </View>

      <View style={styles.actions}>
         <Text style={styles.actionTitle}>Guest Services</Text>
         <TouchableOpacity style={styles.actionBtn} activeOpacity={0.6}>
            <Text style={styles.actionText}>Request Housekeeping</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.actionBtn} activeOpacity={0.6}>
            <Text style={styles.actionText}>Chat with Concierge</Text>
         </TouchableOpacity>

         <View style={styles.checkoutBox}>
            <Text style={styles.checkoutTitle}>Departure</Text>
            <Text style={styles.checkoutDesc}>Skip the front desk. Use self-checkout to finalize your bill and notify staff.</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleSelfCheckout}
              disabled={loading}
              activeOpacity={0.8}
            >
               {loading ? <ActivityIndicator color={Colors.stone900} /> : <Text style={styles.checkoutBtnText}>Self Checkout</Text>}
            </TouchableOpacity>
         </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 40 },
  header: { padding: 32, paddingTop: 40, backgroundColor: Colors.white },
  kicker: { fontSize: 10, fontWeight: 'bold', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  dates: { fontSize: 14, color: Colors.stone400, marginTop: 8 },
  infoBox: { margin: 32, padding: 24, backgroundColor: Colors.white, borderLeftWidth: 4, borderLeftColor: Colors.gold },
  infoLabel: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, textTransform: 'uppercase', marginBottom: 4 },
  infoValue: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  actions: { paddingHorizontal: 32 },
  actionTitle: { fontSize: 10, fontWeight: 'bold', color: Colors.stone300, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 },
  actionBtn: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  actionText: { fontSize: 16, color: Colors.stone900, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  checkoutBox: { marginTop: 40, padding: 32, backgroundColor: Colors.stone900 },
  checkoutTitle: { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.white, marginBottom: 8 },
  checkoutDesc: { fontSize: 13, color: Colors.stone400, lineHeight: 20, marginBottom: 24 },
  checkoutBtn: { backgroundColor: Colors.white, paddingVertical: 16, alignItems: 'center' },
  checkoutBtnText: { fontSize: 11, fontWeight: 'bold', color: Colors.stone900, textTransform: 'uppercase', letterSpacing: 2 },
  doneContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, backgroundColor: Colors.white },
  doneTitle: { fontSize: 48, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 20 },
  doneText: { fontSize: 16, color: Colors.stone500, textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  backBtn: { borderBottomWidth: 1, borderBottomColor: Colors.stone900 },
  backBtnText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, paddingBottom: 4 },
});

         <TouchableOpacity
           style={styles.directionsBtn}
           onPress={() => navigation.navigate('Directions', {
             hotelName: 'Amankora Paro',
             distance: '12.5 km',
             duration: '25 mins',
             polyline: 'stub_polyline'
           })}
         >
            <Text style={styles.directionsBtnText}>Get Directions</Text>
         </TouchableOpacity>
