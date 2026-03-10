import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, StatusBar, Animated } from 'react-native';
import { Colors } from '../theme/colors';
import { useHaptics } from '../hooks/useHaptics';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 450;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const HotelDetailScreen = ({ navigation }: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { trigger } = useHaptics();

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.stone50 }}>
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.infoSection}>
           <Text style={styles.sectionTitle}>Refined Heritage</Text>
           <Text style={styles.description}>
             Overlooking the snow-capped peaks of Mount Jhomolhari, our lodge is a sanctuary designed for profound rejuvenation.
           </Text>
        </View>

        <View style={styles.roomSection}>
           <Text style={styles.sectionTitle}>The Suites</Text>
           {[1, 2].map(r => (
             <TouchableOpacity key={r} style={styles.roomCard} activeOpacity={0.9} onPress={() => trigger('light')}>
                <Image
                  source={{ uri: r === 1 ? 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' : 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800' }}
                  style={styles.roomImage}
                />
                <View style={styles.roomInfo}>
                   <Text style={styles.roomName}>{r === 1 ? 'Valley View Suite' : 'Heritage Residence'}</Text>
                   <View style={styles.roomMeta}>
                      <Text style={styles.roomPrice}>$1,400</Text>
                      <Text style={styles.roomLabel}>/ NIGHT</Text>
                   </View>
                </View>
             </TouchableOpacity>
           ))}
        </View>
      </Animated.ScrollView>

      {/* Parallax Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
        <Animated.Image
          style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
          source={{ uri: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200' }}
        />
        <Animated.View style={[styles.headerOverlay, { transform: [{ scale: titleScale }] }]}>
          <Text style={styles.heroKicker}>Boutique Sanctuary</Text>
          <Text style={styles.heroTitle}>Amankora Paro</Text>
        </Animated.View>
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
         <View>
            <Text style={styles.footerPrice}>$1,400</Text>
            <Text style={styles.footerLabel}>Per night</Text>
         </View>
         <TouchableOpacity
           style={styles.bookButton}
           onPress={() => { trigger('medium'); navigation.navigate('Booking'); }}
         >
            <Text style={styles.bookButtonText}>Book Now</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.stone900,
    height: HEADER_MAX_HEIGHT,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 32,
    right: 32,
  },
  heroKicker: { fontSize: 10, fontWeight: 'bold', color: Colors.stone100, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { fontSize: 40, color: Colors.white, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  backButton: { position: 'absolute', top: 50, left: 24, zIndex: 100, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backButtonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  infoSection: { padding: 40 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', color: Colors.stone400, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 },
  description: { fontSize: 22, lineHeight: 32, color: Colors.stone900, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif' },
  roomSection: { paddingHorizontal: 40 },
  roomCard: { marginBottom: 48, borderBottomWidth: 1, borderBottomColor: Colors.stone100 },
  roomImage: { width: '100%', height: 280, backgroundColor: Colors.stone200 },
  roomInfo: { paddingVertical: 24 },
  roomName: { fontSize: 20, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900, marginBottom: 8 },
  roomMeta: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  roomPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.gold },
  roomLabel: { fontSize: 10, color: Colors.stone400, letterSpacing: 1 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.white,
    padding: 32, paddingBottom: Platform.OS === 'ios' ? 40 : 32,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: Colors.stone100,
    shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10
  },
  footerPrice: { fontSize: 24, fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', color: Colors.stone900 },
  footerLabel: { fontSize: 10, color: Colors.stone400, textTransform: 'uppercase', letterSpacing: 1 },
  bookButton: { backgroundColor: Colors.stone900, paddingHorizontal: 40, paddingVertical: 18 },
  bookButtonText: { color: Colors.white, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3 },
});
