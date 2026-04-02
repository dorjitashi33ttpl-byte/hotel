import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Platform, Modal } from 'react-native';
import { Colors } from '../theme/colors';
import { Search, Sliders, MapPin, Star } from 'lucide-react-native';

export const SearchScreen = ({ navigation }: any) => {
  const [showFilters, setShowFilters] = useState(false);
  const [hotels, setHotels] = useState([
    { id: 'H1', name: 'Amankora Thimphu', city: 'Thimphu', price: 12000, rating: 4.9, dist: 2.5 },
    { id: 'H2', name: 'Zhiwa Ling Heritage', city: 'Paro', price: 9500, rating: 4.8, dist: 12.1 },
  ]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HotelDetail', { hotelId: item.id })}
    >
       <View style={styles.imagePlaceholder} />
       <View style={styles.cardBody}>
          <View style={styles.row}>
             <Text style={styles.hotelName}>{item.name}</Text>
             <View style={styles.rating}>
                <Star size={10} color={Colors.gold} fill={Colors.gold} />
                <Text style={styles.ratingText}>{item.rating}</Text>
             </View>
          </div>
          <View style={styles.row}>
             <View style={styles.loc}>
                <MapPin size={10} color={Colors.stone400} />
                <Text style={styles.city}>{item.city} • {item.dist}km</Text>
             </View>
             <Text style={styles.price}>Nu. {item.price.toLocaleString()}<Text style={styles.night}>/night</Text></Text>
          </View>
       </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <Text style={styles.kicker}>Bhutan</Text>
          <Text style={styles.title}>The Sanctuary Finder</Text>

          <View style={styles.searchBar}>
             <Search size={18} color={Colors.stone400} />
             <TextInput style={styles.input} placeholder="Where shall we go?" placeholderTextColor={Colors.stone400} />
             <TouchableOpacity onPress={() => setShowFilters(true)}>
                <Sliders size={18} color={Colors.gold} />
             </TouchableOpacity>
          </View>
       </View>

       <FlatList
         data={hotels}
         renderItem={renderItem}
         keyExtractor={i => i.id}
         contentContainerStyle={styles.list}
       />

       <Modal visible={showFilters} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
             <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                   <Text style={styles.modalTitle}>Refine Stays</Text>
                   <TouchableOpacity onPress={() => setShowFilters(false)}><Text style={styles.close}>Done</Text></TouchableOpacity>
                </View>
                <View style={styles.filterSection}>
                   <Text style={styles.filterLabel}>Price Range</Text>
                   <View style={styles.priceCaps}>
                      <Text style={styles.priceCap}>Nu. 5,000</Text>
                      <Text style={styles.priceCap}>Nu. 50,000+</Text>
                   </View>
                </View>
                <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilters(false)}>
                   <Text style={styles.applyText}>Apply Filters</Text>
                </TouchableOpacity>
             </View>
          </View>
       </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  header: { padding: 24, paddingTop: 80, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  kicker: { fontSize: 10, fontWeight: '900', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 28, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', color: Colors.stone900, marginBottom: 24 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.stone50, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 12 },
  input: { flex: 1, fontSize: 14, color: Colors.stone900 },
  list: { padding: 24 },
  card: { backgroundColor: 'white', borderRadius: 16, marginBottom: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  imagePlaceholder: { height: 180, backgroundColor: Colors.stone100 },
  cardBody: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  hotelName: { fontSize: 16, fontWeight: 'bold', color: Colors.stone900 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: Colors.stone900 },
  loc: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  city: { fontSize: 12, color: Colors.stone400 },
  price: { fontSize: 14, fontWeight: 'bold', color: Colors.stone900 },
  night: { fontSize: 10, color: Colors.stone400, fontWeight: 'normal' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  modalTitle: { fontSize: 20, fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif' },
  close: { color: Colors.gold, fontWeight: 'bold' },
  filterSection: { marginBottom: 32 },
  filterLabel: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase', color: Colors.stone300, marginBottom: 16 },
  priceCaps: { flexDirection: 'row', justifyContent: 'space-between' },
  priceCap: { fontSize: 14, color: Colors.stone900, fontWeight: '600' },
  applyBtn: { backgroundColor: Colors.stone900, paddingVertical: 20, borderRadius: 12, alignItems: 'center' },
  applyText: { color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 11 }
});
