import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

// Theme
const THEME_COLOR = '#E2FF00';
const BG_DARK = '#050505';
const CARD_BG = '#0A0A0A';
const BORDER_COLOR = '#1A1A1A';

const TRANSPORT_TYPES = [
  { id: 'car', label: 'CARS', icon: 'car-side' },
  { id: 'truck', label: 'TRUCKS', icon: 'truck' },
  { id: 'trailer', label: 'TRAILERS', icon: 'truck-trailer' },
  { id: 'bus', label: 'BUSES', icon: 'bus' },
  { id: 'bike', label: 'BIKES', icon: 'motorbike' },
];

export default function RouteScanner({ onClose }) {
  const [selectedType, setSelectedType] = useState('car');

  const KHI_REGION = {
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  // ✅ SAFE: Load maps only on native
  let MapView = null;
  let Marker = null;
  let PROVIDER_GOOGLE = null;

  if (Platform.OS !== 'web') {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
    PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  }

  const ActiveIcon =
    TRANSPORT_TYPES.find(t => t.id === selectedType)?.icon || 'car-side';

  return (
    <View style={styles.fullOverlay}>
      <SafeAreaView style={styles.container}>

        {/* HEADER */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={THEME_COLOR} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>KARACHI RADAR</Text>

          <View style={styles.statusBadge}>
            <View style={styles.pulse} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* TRANSPORT SELECTOR */}
        <View style={styles.selectorContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorScroll}>
            {TRANSPORT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                style={[
                  styles.typeBtn,
                  selectedType === type.id && {
                    borderColor: THEME_COLOR,
                    backgroundColor: 'rgba(226, 255, 0, 0.05)'
                  }
                ]}
              >
                <MaterialCommunityIcons
                  name={type.icon}
                  size={26}
                  color={selectedType === type.id ? THEME_COLOR : '#444'}
                />
                <Text style={[
                  styles.typeLabel,
                  { color: selectedType === type.id ? THEME_COLOR : '#444' }
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* MAP SECTION */}
        <View style={styles.mapBox}>

          {/* ✅ MOBILE MAP */}
          {Platform.OS !== 'web' && MapView && Marker && (
            <MapView
              style={StyleSheet.absoluteFillObject}
              initialRegion={KHI_REGION}
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapDarkStyle}
            >
              <Marker coordinate={{ latitude: 24.8715, longitude: 67.0650 }}>
                <View style={styles.activeMarker}>
                  <MaterialCommunityIcons
                    name={ActiveIcon}
                    size={15}
                    color="#000"
                  />
                </View>
              </Marker>
            </MapView>
          )}

          {/* 🌐 WEB FALLBACK */}
          {Platform.OS === 'web' && (
            <View style={styles.webFallback}>
              <Text style={styles.webText}>MAP NOT AVAILABLE ON WEB</Text>
              <Text style={styles.webSubText}>
                Open this feature in Android / iOS app
              </Text>
            </View>
          )}

          <View style={styles.mapOverlayLabel}>
            <Text style={styles.mapText}>
              SCANNING: {selectedType.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* BOTTOM CARD */}
        <View style={styles.darkCard}>
          <View style={styles.dragHandle} />

          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>ACTIVE FLEET STATUS</Text>
            <Text style={styles.unitCount}>128 UNITS ONLINE</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.routeItem}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name={ActiveIcon}
                    size={20}
                    color={THEME_COLOR}
                  />
                </View>

                <View style={styles.routeDetails}>
                  <Text style={styles.routeName}>
                    Sohrab Goth Zone {item}
                  </Text>
                  <Text style={styles.routeStatus}>
                    Operational • 42 mins ago
                  </Text>
                </View>

                <View style={styles.tag}>
                  <Text style={styles.tagText}>ACTIVE</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

      </SafeAreaView>
    </View>
  );
}

const mapDarkStyle = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }
];

const styles = StyleSheet.create({
  fullOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#000' },
  container: { flex: 1 },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },

  liveText: {
    color: '#FF4B4B',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5
  },

  pulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4B4B'
  },

  selectorContainer: { marginBottom: 15 },
  selectorScroll: { paddingHorizontal: 20, gap: 10 },

  typeBtn: {
    width: 85,
    height: 75,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CARD_BG
  },

  typeLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 8,
    letterSpacing: 1
  },

  mapBox: {
    height: height * 0.35,
    marginHorizontal: 20,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },

  activeMarker: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: THEME_COLOR
  },

  mapOverlayLabel: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },

  mapText: {
    color: THEME_COLOR,
    fontSize: 10,
    fontWeight: 'bold'
  },

  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },

  webText: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 14
  },

  webSubText: {
    color: '#666',
    marginTop: 5,
    fontSize: 11
  },

  darkCard: {
    flex: 1,
    backgroundColor: BG_DARK,
    marginTop: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },

  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#222',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#666'
  },

  unitCount: {
    fontSize: 10,
    color: THEME_COLOR,
    fontWeight: 'bold'
  },

  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: CARD_BG,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(226, 255, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  routeDetails: {
    flex: 1,
    marginLeft: 15
  },

  routeName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold'
  },

  routeStatus: {
    color: '#555',
    fontSize: 11
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(226, 255, 0, 0.1)'
  },

  tagText: {
    fontSize: 9,
    fontWeight: '900',
    color: THEME_COLOR
  }
});