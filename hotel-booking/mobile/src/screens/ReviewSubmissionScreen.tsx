import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const ReviewSubmissionScreen = ({ route, navigation }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How was your stay?</Text>
      <Text style={styles.subtitle}>Sharing your experience helps other travelers in Bhutan.</Text>

      <View style={styles.starsRow}>
         {[1, 2, 3, 4, 5].map(s => (
           <TouchableOpacity key={s} onPress={() => setRating(s)}>
              <Text style={[styles.star, s <= rating && styles.activeStar]}>★</Text>
           </TouchableOpacity>
         ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.goBack()}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 40 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  star: { fontSize: 40, color: '#eee', marginHorizontal: 5 },
  activeStar: { color: '#fbbf24' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 15, padding: 20, height: 150, textAlignVertical: 'top', marginBottom: 40 },
  submitButton: { backgroundColor: '#2563eb', padding: 20, borderRadius: 15, alignItems: 'center' },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
