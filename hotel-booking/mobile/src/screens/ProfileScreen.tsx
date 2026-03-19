import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, Image } from 'react-native';
import { Colors } from '../theme/colors';

export const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
         <View style={styles.avatar}>
            <Text style={styles.avatarText}>TD</Text>
         </View>
         <Text style={styles.name}>Tashi Dorji</Text>
         <Text style={styles.email}>tashi.dorji@druk.bt</Text>

         <View style={styles.verifyBadge}>
            <Text style={styles.verifyText}>DrukID Verified</Text>
         </View>
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Security & Access</Text>
         <View style={styles.row}>
            <Text style={styles.rowLabel}>FaceID Login</Text>
            <Switch value={true} trackColor={{ true: Colors.stone900 }} />
         </View>
         <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Manage DrukID</Text>
            <Text style={styles.arrow}>→</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Preferences</Text>
         <View style={styles.row}>
            <Text style={styles.rowLabel}>Eco-Travel Insights</Text>
            <Switch value={true} trackColor={{ true: Colors.stone900 }} />
         </View>
         {['Payment Methods', 'Notification Settings', 'Help & Support'].map(item => (
           <TouchableOpacity key={item} style={styles.row}>
              <Text style={styles.rowLabel}>{item}</Text>
              <Text style={styles.arrow}>→</Text>
           </TouchableOpacity>
         ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
         <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 40 },
  header: { alignItems: 'center', paddingVertical: 60, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.stone100, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  avatarText: { fontSize: 24, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  name: { fontSize: 24, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  email: { fontSize: 14, color: Colors.stone400, marginTop: 4 },
  verifyBadge: { marginTop: 16, backgroundColor: '#10b981', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100 },
  verifyText: { color: 'white', fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase' },
  section: { padding: 32 },
  sectionTitle: { fontSize: 10, fontWeight: 'black', color: Colors.stone300, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, marginTop: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  rowLabel: { fontSize: 16, color: Colors.stone900, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  arrow: { fontSize: 18, color: Colors.stone200 },
  logoutBtn: { marginTop: 60, alignItems: 'center' },
  logoutText: { fontSize: 11, fontWeight: 'bold', color: '#ef4444', textTransform: 'uppercase', letterSpacing: 2 },
});
