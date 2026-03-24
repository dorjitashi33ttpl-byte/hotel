import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform, RefreshControl, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Skeleton } from '../components/common/Skeleton';
import { Filter, MapPin } from 'lucide-react-native';

export const SearchScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState(50);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor={Colors.gold} />}
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>The Unexplored</Text>
          <Text style={styles.title}>Kingdom of Bhutan</Text>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.inputWrapper}>
             <MapPin size={16} color={Colors.stone400} />
             <TextInput
               placeholder="Where to next?"
               placeholderTextColor={Colors.stone400}
               style={styles.searchInput}
             />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
             <Filter size={16} color={Colors.stone900} />
          </TouchableOpacity>
        </View>

        <View style={styles.radiusSelector}>
           <Text style={styles.radiusLabel}>Search Radius: {radius}km</Text>
           <View style={styles.radiusTrack}>
              {[20, 50, 100, 200].map(r => (
                <TouchableOpacity key={r} onPress={() => setRadius(r)} style={[styles.radiusDot, radius === r && styles.radiusDotActive]}>
                   <Text style={[styles.radiusText, radius === r && styles.radiusTextActive]}>{r}</Text>
                </TouchableOpacity>
              ))}
           </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curated Collections</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {loading ? (
              [1, 2].map(i => (
                <View key={i} style={[styles.card, { padding: 0 }]}>
                   <Skeleton width={280} height={350} />
                   <View style={styles.cardInfo}>
                      <Skeleton width={180} height={20} style={{ marginBottom: 8 }} />
                      <Skeleton width={120} height={14} style={{ marginBottom: 12 }} />
                      <Skeleton width={80} height={14} />
                   </View>
                </View>
              ))
            ) : (
              [1, 2, 3].map(i => (
                <TouchableOpacity
                  key={i}
                  style={styles.card}
                  onPress={() => navigation.navigate('HotelDetail', { id: i })}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: i === 1 ? 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800' : 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800' }}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardInfo}>
                    <View style={styles.cardHeader}>
                       <Text style={styles.hotelName}>{i === 1 ? 'Amankora Paro' : 'Zhiwa Ling'}</Text>
                       <View style={styles.ratingBadge}>
                          <Text style={styles.ratingText}>4.8</Text>
                       </View>
                    </View>
                    <Text style={styles.hotelLoc}>Paro Valley, Bhutan</Text>
                    <Text style={styles.price}>From ,400</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone50 },
  content: { paddingBottom: 40 },
  header: { padding: 24, paddingTop: Platform.OS === 'ios' ? 10 : 20 },
  kicker: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  searchBar: { marginHorizontal: 24, flexDirection: 'row', gap: 12, alignItems: 'center' },
  inputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.white, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.stone200 },
  searchInput: { flex: 1, fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  filterBtn: { backgroundColor: Colors.white, padding: 14, borderBottomWidth: 1, borderBottomColor: Colors.stone200 },
  radiusSelector: { marginHorizontal: 24, marginTop: 24 },
  radiusLabel: { fontSize: 9, fontWeight: 'black', uppercase: true, color: Colors.stone300, letterSpacing: 1, marginBottom: 12 },
  radiusTrack: { flexDirection: 'row', gap: 12 },
  radiusDot: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  radiusDotActive: { borderBottomColor: Colors.gold },
  radiusText: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400 },
  radiusTextActive: { color: Colors.stone900 },
  section: { marginTop: 40 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.stone900, letterSpacing: 2, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 20 },
  horizontalScroll: { paddingLeft: 24 },
  card: { width: 280, marginRight: 24, backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardImage: { width: '100%', height: 350, backgroundColor: Colors.stone100 },
  cardInfo: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  hotelName: { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  ratingBadge: { backgroundColor: Colors.stone900, paddingHorizontal: 6, paddingVertical: 2 },
  ratingText: { color: Colors.white, fontSize: 9, fontWeight: 'black' },
  hotelLoc: { fontSize: 12, color: Colors.stone400, marginBottom: 12 },
  price: { fontSize: 12, fontWeight: 'bold', color: Colors.stone900, letterSpacing: 1 },
});
