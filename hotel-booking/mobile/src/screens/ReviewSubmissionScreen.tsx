import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { api } from '../services/api';

export const ReviewSubmissionScreen = ({ route, navigation }: any) => {
  const { bookingId } = route.params || { bookingId: 'B-TEST' };
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post(`/public/bookings/${bookingId}/review`, { rating, comment });
      Alert.alert("Thank You", "Your feedback helps us maintain the highest standards of hospitality.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Feedback submission failed.");
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.kicker}>Reflections</Text>
       <Text style={styles.title}>How was your stay?</Text>

       <View style={styles.stars}>
          {[1,2,3,4,5].map(s => (
            <TouchableOpacity key={s} onPress={() => setRating(s)}>
               <Text style={[styles.star, { color: s <= rating ? Colors.gold : Colors.stone200 }]}>★</Text>
            </TouchableOpacity>
          ))}
       </View>

       <TextInput
         style={styles.input}
         placeholder="Share your experience..."
         multiline
         value={comment}
         onChangeText={setComment}
         placeholderTextColor={Colors.stone300}
       />

       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit Review</Text>
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 40, paddingTop: 100 },
  kicker: { fontSize: 10, fontWeight: '900', color: Colors.gold, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', color: Colors.stone900, marginBottom: 40 },
  stars: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  star: { fontSize: 40 },
  input: { borderBottomWidth: 1, borderBottomColor: Colors.stone100, paddingVertical: 20, fontSize: 16, color: Colors.stone900, height: 120, textAlignVertical: 'top' },
  btn: { backgroundColor: Colors.stone900, paddingVertical: 20, alignItems: 'center', borderRadius: 4, marginTop: 60 },
  btnText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }
});
