import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Theme } from '../theme';
import { MapPin, Star, Heart } from 'lucide-react-native';

const SearchScreen = () => {
  const hotels = [
    { id: '1', name: 'Aman Kora', city: 'Paro', price: 1200, rating: 4.9 },
    { id: '2', name: 'Six Senses', city: 'Thimphu', price: 1500, rating: 5.0 },
    { id: '3', name: 'Le Méridien', city: 'Thimphu', price: 450, rating: 4.7 },
  ];

  const renderHotel = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color={Theme.colors.muted} />
        </TouchableOpacity>
      </View>
      <div style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Star size={12} color={Theme.colors.gold} fill={Theme.colors.gold} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <MapPin size={12} color={Theme.colors.gold} />
          <Text style={styles.location}>{item.city}, Bhutan</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>${item.price} <Text style={styles.perNight}>/ night</Text></Text>
        </View>
      </div>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Bhutan</Text>
        <Text style={styles.subtitle}>DISCOVER REFINED COMFORT</Text>
      </View>
      <FlatList
        data={hotels}
        renderItem={renderHotel}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.stone,
  },
  header: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  title: {
    fontSize: 32,
    fontFamily: Theme.fonts.serif,
    color: Theme.colors.charcoal,
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: Theme.fonts.sans,
    color: Theme.colors.gold,
    fontWeight: '700',
    marginTop: 4,
  },
  list: {
    padding: Theme.spacing.lg,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 2,
    marginBottom: Theme.spacing.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    padding: Theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: Theme.fonts.serif,
    color: Theme.colors.charcoal,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '700',
    color: Theme.colors.charcoal,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 11,
    color: Theme.colors.muted,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerRow: {
    marginTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.beige,
    paddingTop: Theme.spacing.md,
  },
  priceLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
    color: Theme.colors.muted,
    letterSpacing: 1,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    fontFamily: Theme.fonts.serif,
    color: Theme.colors.charcoal,
    marginTop: 2,
  },
  perNight: {
    fontSize: 10,
    fontFamily: Theme.fonts.sans,
    color: Theme.colors.muted,
  }
});

export default SearchScreen;
