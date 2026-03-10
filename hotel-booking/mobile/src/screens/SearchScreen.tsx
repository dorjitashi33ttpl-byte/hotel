import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Skeleton } from '../components/common/Skeleton';

export const SearchScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

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
          <TextInput
            placeholder="Where to next?"
            placeholderTextColor={Colors.stone400}
            style={styles.searchInput}
          />
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
                    <Text style={styles.hotelName}>{i === 1 ? 'Amankora Paro' : 'Zhiwa Ling'}</Text>
                    <Text style={styles.hotelLoc}>Paro Valley, Bhutan</Text>
                    <Text style={styles.price}>From $1,400</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {!loading && (
          <View style={styles.storySection}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800' }}
              style={styles.storyImage}
            />
            <View style={styles.storyOverlay}>
              <Text style={styles.storyTitle}>Our Heritage</Text>
              <Text style={styles.storyText}>A sanctuary in the land of happiness.</Text>
            </View>
          </View>
        )}
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
  searchBar: { marginHorizontal: 24, padding: 16, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.stone200 },
  searchInput: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  section: { marginTop: 40 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.stone900, letterSpacing: 2, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 20 },
  horizontalScroll: { paddingLeft: 24 },
  card: { width: 280, marginRight: 24, backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardImage: { width: '100%', height: 350, backgroundColor: Colors.stone100 },
  cardInfo: { padding: 20 },
  hotelName: { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', marginBottom: 4 },
  hotelLoc: { fontSize: 12, color: Colors.stone400, marginBottom: 12 },
  price: { fontSize: 12, fontWeight: 'bold', color: Colors.stone900, letterSpacing: 1 },
  storySection: { marginTop: 60, height: 400, position: 'relative' },
  storyImage: { width: '100%', height: '100%' },
  storyOverlay: { position: 'absolute', bottom: 40, left: 40, right: 40 },
  storyTitle: { fontSize: 24, color: Colors.white, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', marginBottom: 8 },
  storyText: { fontSize: 14, color: Colors.stone200 },
});
