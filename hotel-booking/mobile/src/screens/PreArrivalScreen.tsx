import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from 'react-native';
import { Colors } from '../theme/colors';

export const PreArrivalScreen = ({ navigation }: any) => {
  const [arrivalTime, setArrivalTime] = useState('14:00');

  const handleSubmit = () => {
    Alert.alert("Form Submitted", "Your pre-arrival details have been recorded. You can now proceed to Digital Check-in upon arrival.");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>Preparation</Text>
      <Text style={styles.title}>Pre-Arrival Form</Text>
      <Text style={styles.desc}>Please provide your estimated arrival time and upload a copy of your identity document for a faster check-in.</Text>

      <View style={styles.field}>
         <Text style={styles.label}>Estimated Arrival</Text>
         <TextInput value={arrivalTime} onChangeText={setArrivalTime} style={styles.input} />
      </View>

      <TouchableOpacity style={styles.uploadBtn}>
         <Text style={styles.uploadText}>Upload ID / Passport</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
         <Text style={styles.submitBtnText}>Complete Registration</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 40 },
  kicker: { fontSize: 10, fontWeight: 'black', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 20 },
  desc: { fontSize: 16, color: Colors.stone400, lineHeight: 24, marginBottom: 48 },
  field: { marginBottom: 32 },
  label: { fontSize: 10, fontWeight: 'bold', color: Colors.stone300, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: Colors.stone100, paddingVertical: 12, fontSize: 18, color: Colors.stone900 },
  uploadBtn: { borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.stone200, padding: 40, alignItems: 'center', marginBottom: 48 },
  uploadText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: Colors.stone400, letterSpacing: 1 },
  submitBtn: { backgroundColor: Colors.stone900, paddingVertical: 20, alignItems: 'center' },
  submitBtnText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
});
