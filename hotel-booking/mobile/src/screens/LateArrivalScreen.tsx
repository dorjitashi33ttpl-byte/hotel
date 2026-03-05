import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const LateArrivalScreen = ({ navigation }) => {
  const [time, setTime] = useState('22:00');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Arrival Time</Text>
      <Text style={styles.subtitle}>Let the hotel know if you're arriving later than expected.</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="HH:MM"
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Confirm Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: 'white', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', mb: 10 },
  subtitle: { color: '#666', mb: 30 },
  input: { borderBottomWidth: 2, borderBottomColor: '#2563eb', fontSize: 40, fontWeight: 'bold', textAlign: 'center', mb: 40, padding: 10 },
  button: { backgroundColor: '#2563eb', padding: 20, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
