import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export const LateArrivalScreen = ({ navigation, route }: any) => {
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleUpdate = () => {
    Alert.alert("Arrival Updated", "The hotel staff has been notified of your late arrival.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Expected Arrival Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 11:30 PM"
        value={time}
        onChangeText={setTime}
      />

      <Text style={[styles.label, { marginTop: 24 }]}>Note for Staff</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Reason for late arrival..."
        multiline
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Notify Hotel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#666', textTransform: 'uppercase' },
  input: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 12, fontSize: 16 },
  button: { backgroundColor: '#2563eb', marginTop: 40, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
