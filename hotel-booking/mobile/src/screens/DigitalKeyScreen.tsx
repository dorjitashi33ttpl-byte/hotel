import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../theme/colors';

export const DigitalKeyScreen = ({ navigation }: any) => {
  return (
    <div style={styles.container as any}>
      <Text style={styles.kicker}>Secure Access</Text>
      <Text style={styles.title}>Your Sanctuary Key</Text>
      <Text style={styles.desc}>Hold this QR code near the scanner at Amankora Paro for contactless entry to Room 104.</Text>

      <View style={styles.qrContainer}>
         <div style={styles.qrPlaceholder as any}>
            <Text style={styles.qrText}>QR TOKEN VALID</Text>
         </div>
         <Text style={styles.timer}>Expires in 42 minutes</Text>
      </View>

      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
         <Text style={styles.closeText}>Hide Key</Text>
      </TouchableOpacity>
    </div>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone900, padding: 40, alignItems: 'center', justifyContent: 'center' },
  kicker: { fontSize: 10, fontWeight: 'black', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.white, marginBottom: 20, textAlign: 'center' },
  desc: { fontSize: 14, color: Colors.stone400, lineHeight: 22, textAlign: 'center', marginBottom: 60 },
  qrContainer: { alignItems: 'center' },
  qrPlaceholder: { width: 280, height: 280, backgroundColor: Colors.white, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  qrText: { color: Colors.stone900, fontWeight: 'bold', fontSize: 12 },
  timer: { color: Colors.gold, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  closeBtn: { marginTop: 80 },
  closeText: { fontSize: 11, fontWeight: 'bold', color: Colors.white, textTransform: 'uppercase', letterSpacing: 2 },
});
