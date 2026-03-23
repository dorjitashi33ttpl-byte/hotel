import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { Colors } from '../theme/colors';

export const LateArrivalScreen = ({ navigation }: any) => {
  const [time, setTime] = useState('22:30');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    Alert.alert("Update Sent", "The staff at Amankora Paro has been notified of your late arrival.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Expectation Management</Text>
      <h1 style={styles.title as any}>Late Arrival Update</h1>
      <p style={styles.desc as any}>Notify the on-duty concierge of your delayed arrival to ensure a seamless check-in experience after hours.</p>

      <View style={styles.field}>
         <Text style={styles.label}>New Arrival Time</Text>
         <TextInput value={time} onChangeText={setTime} style={styles.input} />
      </View>

      <View style={styles.field}>
         <Text style={styles.label}>Optional Note</Text>
         <TextInput
           placeholder="e.g. Flight delayed"
           multiline
           numberOfLines={4}
           value={note}
           onChangeText={setNote}
           style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
         />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
         <Text style={styles.submitBtnText}>Update Concierge</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, padding: 40 },
  kicker: { fontSize: 10, fontWeight: 'black', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 20 },
  desc: { fontSize: 16, color: Colors.stone400, lineHeight: 24, marginBottom: 48 },
  field: { marginBottom: 32 },
  label: { fontSize: 10, fontWeight: 'bold', color: Colors.stone300, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: Colors.stone100, paddingVertical: 12, fontSize: 18, color: Colors.stone900 },
  submitBtn: { backgroundColor: Colors.stone900, paddingVertical: 20, alignItems: 'center', marginTop: 24 },
  submitBtnText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
});
