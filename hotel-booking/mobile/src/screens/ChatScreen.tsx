import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ChatScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Good afternoon, Tashi. Your suite at Amankora Paro is being prepared with the additional Bhutanese herbal teas you requested.', sender: 'staff', time: '14:02' },
    { id: '2', text: 'Thank you so much! What time is the evening prayer ceremony?', sender: 'guest', time: '14:05' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'guest', time: '14:10' }]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>←</Text>
         </TouchableOpacity>
         <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Sanctuary Concierge</Text>
            <Text style={styles.headerStatus}>Amankora Paro • Online</Text>
         </View>
         <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={[styles.messageRow, item.sender === 'guest' ? styles.guestRow : styles.staffRow]}>
             <View style={[styles.bubble, item.sender === 'guest' ? styles.guestBubble : styles.staffBubble]}>
                <Text style={[styles.messageText, item.sender === 'guest' ? styles.guestText : styles.staffText]}>{item.text}</Text>
                <Text style={[styles.timeText, item.sender === 'guest' ? styles.guestTime : styles.staffTime]}>{item.time}</Text>
             </View>
          </View>
        )}
      />

      <View style={[styles.inputArea, { paddingBottom: Math.max(insets.bottom, 20) }]}>
         <TextInput
           style={styles.input}
           placeholder="Message Concierge..."
           placeholderTextColor={Colors.stone400}
           value={input}
           onChangeText={setInput}
         />
         <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendBtnText}>Send</Text>
         </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: Colors.stone100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60 },
  backBtn: { fontSize: 24, color: Colors.stone900 },
  headerTitle: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  headerStatus: { fontSize: 9, fontWeight: 'bold', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  messageList: { padding: 24, gap: 32 },
  messageRow: { flexDirection: 'row', width: '100%' },
  guestRow: { justifyContent: 'flex-end' },
  staffRow: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '85%', padding: 20 },
  guestBubble: { backgroundColor: Colors.stone900 },
  staffBubble: { backgroundColor: Colors.stone50, borderLeftWidth: 3, borderLeftColor: Colors.gold },
  messageText: { fontSize: 15, lineHeight: 22 },
  guestText: { color: Colors.white, fontWeight: '300' },
  staffText: { color: Colors.stone700, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  timeText: { fontSize: 9, marginTop: 8, textTransform: 'uppercase', letterSpacing: 1 },
  guestTime: { color: Colors.stone500, textAlign: 'right' },
  staffTime: { color: Colors.stone300 },
  inputArea: { padding: 24, borderTopWidth: 1, borderTopColor: Colors.stone100, flexDirection: 'row', alignItems: 'center', gap: 16 },
  input: { flex: 1, fontSize: 16, color: Colors.stone900 },
  sendBtn: { borderBottomWidth: 1, borderBottomColor: Colors.stone900 },
  sendBtnText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, paddingBottom: 4, color: Colors.stone900 },
});
