import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.name}>Tenzin Wangchuk</Text>
        <Text style={styles.email}>tenzin@example.bt</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item}><Text style={styles.itemText}>Personal Details</Text></TouchableOpacity>
        <TouchableOpacity style={styles.item}><Text style={styles.itemText}>Saved Hotels</Text></TouchableOpacity>
        <TouchableOpacity style={styles.item}><Text style={styles.itemText}>Payment Methods</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.lastItem]}><Text style={styles.itemText}>Help & Support</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 40, backgroundColor: 'white', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatarPlaceholder: { width: 100, height: 100, backgroundColor: '#eee', borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  email: { color: '#999', marginTop: 5 },
  section: { backgroundColor: 'white', marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemText: { fontSize: 16, fontWeight: '500' },
  lastItem: { borderBottomWidth: 0 },
  logoutButton: { margin: 20, padding: 20, alignItems: 'center' },
  logoutText: { color: '#ff4444', fontWeight: 'bold' }
});
