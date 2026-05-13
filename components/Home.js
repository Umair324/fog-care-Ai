import React from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, Dimensions 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const THEME_YELLOW = '#E2FF00';

export default function HomeScreen({ onNavigateToPerformance }) {
  
  const ActionCard = ({ icon, label, value, subText, active }) => (
    <TouchableOpacity style={[styles.gridCard, active && styles.activeCard]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, active && { backgroundColor: '#000' }]}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={active ? THEME_YELLOW : '#555'} 
          />
        </View>
        {value && <Text style={[styles.cardValue, active && { color: '#000' }]}>{value}</Text>}
      </View>
      <Text style={[styles.cardLabel, active && { color: '#000' }]}>{label}</Text>
      <Text style={[styles.cardSubText, active && { color: 'rgba(0,0,0,0.6)' }]}>{subText}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0D0D0D', '#000']} style={StyleSheet.absoluteFill} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- TOP PROFILE & BRAND --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandText}>ROAD<Text style={{color: THEME_YELLOW}}>TRACKER</Text></Text>
            <Text style={styles.welcomeText}>Hello, Commander</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
             <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* --- MAIN VEHICLE STATUS (FUTURISTIC CARD) --- */}
        <TouchableOpacity style={styles.mainStatusCard} onPress={onNavigateToPerformance}>
          <LinearGradient 
            colors={['rgba(226, 255, 0, 0.15)', 'transparent']} 
            style={styles.statusGradient}
          />
          <View style={styles.statusInfo}>
             <Text style={styles.carModel}>CORVETTE ZR1</Text>
             <View style={styles.statusBadge}>
                <View style={styles.dot} />
                <Text style={styles.statusBadgeText}>ENGINE ON</Text>
             </View>
             <Text style={styles.mainSpeed}>100 <Text style={styles.unit}>KM/H</Text></Text>
          </View>
          <MaterialCommunityIcons name="car-sports" size={100} color={THEME_YELLOW} style={styles.carIcon} />
        </TouchableOpacity>

        {/* --- QUICK ACTION GRID --- */}
        <View style={styles.gridContainer}>
          <ActionCard 
            icon="speedometer" 
            label="PERFORMANCE" 
            value="98%" 
            subText="Stable"
            active={true} // Highlighted card
          />
          <ActionCard 
            icon="battery-90" 
            label="ENERGY" 
            value="90%" 
            subText="Remaining"
          />
          <ActionCard 
            icon="tire" 
            label="PRESSURE" 
            value="34" 
            subText="PSI (Optimal)"
          />
          <ActionCard 
            icon="shield-key-outline" 
            label="SECURITY" 
            value="ARMED" 
            subText="Protected"
          />
          <ActionCard 
            icon="map-marker-distance" 
            label="RANGE" 
            value="420" 
            subText="KM Total"
          />
          <ActionCard 
            icon="cog-outline" 
            label="SETTINGS" 
            subText="System Config"
          />
        </View>

        {/* --- BOTTOM LOGS PREVIEW --- */}
        <BlurView intensity={10} tint="dark" style={styles.logCard}>
           <Text style={styles.logTitle}>RECENT ACTIVITY</Text>
           <View style={styles.logRow}>
              <Ionicons name="location" size={16} color={THEME_YELLOW} />
              <Text style={styles.logText}>Parked at 5th Avenue, New York</Text>
              <Text style={styles.logTime}>12m ago</Text>
           </View>
        </BlurView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { padding: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25 
  },
  brandText: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  welcomeText: { color: '#555', fontSize: 12, fontWeight: 'bold' },
  profileBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  
  mainStatusCard: { 
    height: 180, 
    borderRadius: 30, 
    backgroundColor: '#0A0A0A', 
    borderWidth: 1, 
    borderColor: 'rgba(226, 255, 0, 0.2)', 
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 25
  },
  statusGradient: { ...StyleSheet.absoluteFillObject },
  statusInfo: { flex: 1, justifyContent: 'center' },
  carModel: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: THEME_YELLOW, marginRight: 6 },
  statusBadgeText: { color: THEME_YELLOW, fontSize: 10, fontWeight: '900' },
  mainSpeed: { color: '#FFF', fontSize: 42, fontWeight: '900', marginTop: 10 },
  unit: { fontSize: 16, color: '#444' },
  carIcon: { position: 'absolute', right: -10, bottom: -10, opacity: 0.8 },

  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  gridCard: {
    width: '47%',
    backgroundColor: '#080808',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#161616',
  },
  activeCard: { backgroundColor: THEME_YELLOW, borderColor: THEME_YELLOW },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  cardValue: { color: '#FFF', fontSize: 16, fontWeight: '900' },
  cardLabel: { color: '#FFF', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  cardSubText: { color: '#444', fontSize: 10, marginTop: 4, fontWeight: 'bold' },

  logCard: { padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#1A1A1A', overflow: 'hidden' },
  logTitle: { color: '#444', fontSize: 10, fontWeight: '900', marginBottom: 15, letterSpacing: 1 },
  logRow: { flexDirection: 'row', alignItems: 'center' },
  logText: { color: '#EEE', fontSize: 12, flex: 1, marginLeft: 10 },
  logTime: { color: '#444', fontSize: 10 }
});