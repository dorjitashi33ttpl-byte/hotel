import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Colors } from '../theme/colors';

const services = [
  { id: 'HK', name: 'Extra Towels', desc: 'Fresh cotton linens' },
  { id: 'AM', name: 'Bath Amenities', desc: 'Organic local soaps' },
  { id: 'WA', name: 'Bottled Water', desc: 'Himalayan spring water' },
  { id: 'TU', name: 'Turn-down Service', desc: 'Evening preparation' },
];

export const ServiceRequestScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>At Your Command</Text>
      <Text style={styles.title}>Guest Amenities</Text>
      <Text style={styles.desc}>Select any additional items or services you require during your stay.</Text>

      <View style={styles.grid}>
        {services.map(s => (
          <TouchableOpacity key={s.id} style={styles.card} activeOpacity={0.7}>
             <Text style={styles.cardName}>{s.name}</Text>
             <Text style={styles.cardDesc}>{s.desc}</Text>
             <TouchableOpacity style={styles.requestBtn}>
                <Text style={styles.requestText}>Request</Text>
             </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
         <Text style={styles.closeText}>Back to Stay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { padding: 40 },
  kicker: { fontSize: 10, fontWeight: 'black', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 20 },
  desc: { fontSize: 16, color: Colors.stone400, lineHeight: 24, marginBottom: 48 },
  grid: { gap: 24 },
  card: { backgroundColor: Colors.white, padding: 32, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  cardName: { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: Colors.stone400, marginBottom: 24 },
  requestBtn: { borderBottomWidth: 1, borderBottomColor: Colors.gold, alignSelf: 'flex-start' },
  requestText: { fontSize: 9, fontWeight: 'bold', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 2, paddingBottom: 4 },
  closeBtn: { marginTop: 60, alignItems: 'center' },
  closeText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: Colors.stone300 },
});
