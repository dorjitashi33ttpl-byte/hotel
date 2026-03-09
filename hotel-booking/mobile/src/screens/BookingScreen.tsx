import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

export const BookingScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('BookingDetail');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.kicker}>Reservation</Text>
            <Text style={styles.title}>Secure Your Stay</Text>
          </View>

          <View style={styles.form}>
             <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="Tashi Dorji" placeholderTextColor={Colors.stone300} />
             </View>
             <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput style={styles.input} placeholder="tashi.dorji@druk.bt" keyboardType="email-address" autoCapitalize="none" />
             </View>
             <View style={styles.inputGroup}>
                <Text style={styles.label}>Special Requests</Text>
                <TextInput
                  style={[styles.input, { height: 100, paddingTop: 12 }]}
                  placeholder="e.g. Late arrival, dietary preferences..."
                  multiline
                  textAlignVertical="top"
                />
             </View>
          </View>

          <View style={styles.summary}>
             <View style={styles.row}>
                <Text style={styles.summaryLabel}>Valley View Suite</Text>
                <Text style={styles.summaryValue}>$1,400 x 4 nights</Text>
             </View>
             <View style={styles.row}>
                <Text style={styles.summaryLabel}>Taxes & SDF</Text>
                <Text style={styles.summaryValue}>$560</Text>
             </View>
             <View style={[styles.row, { marginTop: 12, borderTopWidth: 1, borderTopColor: Colors.stone100, paddingTop: 12 }]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>$6,160</Text>
             </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
           <TouchableOpacity
             style={styles.button}
             onPress={handleConfirm}
             disabled={loading}
           >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Confirm & Pay</Text>}
           </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { padding: 32 },
  header: { marginBottom: 40 },
  kicker: { fontSize: 10, fontWeight: 'bold', color: Colors.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  form: { gap: 24 },
  inputGroup: { gap: 8 },
  label: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 1 },
  input: { borderBottomWidth: 1, borderBottomColor: Colors.stone200, paddingVertical: 12, fontSize: 16, color: Colors.stone900, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  summary: { marginTop: 48, backgroundColor: Colors.white, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: Colors.stone500 },
  summaryValue: { fontSize: 13, color: Colors.stone900, fontWeight: '500' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: Colors.stone900 },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: Colors.gold },
  footer: { padding: 32, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.stone100 },
  button: { backgroundColor: Colors.stone900, paddingVertical: 18, alignItems: 'center' },
  buttonText: { color: Colors.white, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3 },
});
