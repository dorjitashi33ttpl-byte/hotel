import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
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
         <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.menu}>
         <Text style={styles.menuTitle}>Preferences</Text>
         <View style={styles.menuItem}>
            <Text style={styles.menuText}>Concierge Notifications</Text>
            <Switch value={true} trackColor={{ true: Colors.stone900 }} />
         </View>
         <View style={styles.menuItem}>
            <Text style={styles.menuText}>Sustainable Travel Insights</Text>
            <Switch value={true} trackColor={{ true: Colors.stone900 }} />
         </View>

         <Text style={styles.menuTitle}>Settings</Text>
         {['Payment Methods', 'Security & SSO', 'Language', 'Contact Support'].map(item => (
           <TouchableOpacity key={item} style={styles.menuItem}>
              <Text style={styles.menuText}>{item}</Text>
              <Text style={styles.arrow}>→</Text>
           </TouchableOpacity>
         ))}

         <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Sign Out</Text>
         </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 40 },
  header: { alignItems: 'center', paddingVertical: 60, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.stone100, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  avatarText: { fontSize: 24, fontFamily: 'serif', color: Colors.stone900 },
  name: { fontSize: 24, fontFamily: 'serif', color: Colors.stone900 },
  email: { fontSize: 14, color: Colors.stone400, marginTop: 4 },
  editBtn: { marginTop: 24, borderBottomWidth: 1, borderBottomColor: Colors.gold },
  editBtnText: { fontSize: 10, fontWeight: 'bold', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 2, paddingBottom: 4 },
  menu: { padding: 32 },
  menuTitle: { fontSize: 10, fontWeight: 'bold', color: Colors.stone300, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, marginTop: 40 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  menuText: { fontSize: 16, color: Colors.stone900, fontLight: true },
  arrow: { fontSize: 18, color: Colors.stone200 },
  logoutBtn: { marginTop: 60, alignItems: 'center' },
  logoutText: { fontSize: 11, fontWeight: 'bold', color: '#ef4444', textTransform: 'uppercase', letterSpacing: 2 },
});
