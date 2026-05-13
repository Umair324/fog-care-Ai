import React from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, Dimensions 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const THEME_NEON = '#E2FF00'; // Neon Yellow

export default function PerformanceScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#0D0D0D', '#000']} style={StyleSheet.absoluteFill} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
            <Ionicons name="chevron-back" size={26} color={THEME_NEON} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
             <Text style={styles.headerTitle}>SYSTEM CORE</Text>
             <Text style={styles.headerStatus}>V3.0 ONLINE</Text>
          </View>
          <View style={styles.profileBox} />
        </View>

        {/* --- MAIN CPU LOAD CARD --- */}
        <View style={styles.mainCoreCard}>
          <Text style={styles.cardSmallTitle}>SYSTEM STABILITY</Text>
          <Text style={styles.bigPercentage}>98.4<Text style={styles.smallUnit}>%</Text></Text>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '98%' }]} />
          </View>
          <View style={styles.coreStatsRow}>
            <Text style={styles.coreStatText}>Uptime: 14h 22m</Text>
            <Text style={styles.coreStatText}>Latency: 12ms</Text>
          </View>
        </View>

        {/* --- RADAR METRICS --- */}
        <View style={styles.metricsGrid}>
          <MetricBox icon="radar" label="SENSORS" value="ACTIVE" color={THEME_NEON} />
          <MetricBox icon="thermometer" label="TEMP" value="42°C" color="#FF5252" />
          <MetricBox icon="satellite-variant" label="SIGNAL" value="EXCELLENT" color="#00E0FF" />
        </View>

        {/* --- DIAGNOSTIC OPTIONS --- */}
        <Text style={styles.sectionLabel}>DIAGNOSTIC TOOLS</Text>
        
        <View style={styles.toolList}>
          <ToolItem icon="shield-refresh" label="Security Protocol Scan" status="VERIFIED" />
          <ToolItem icon="database-sync" label="Cache Optimization" status="READY" />
          <ToolItem icon="cpu-64-bit" label="GPU Acceleration" status="ON" />
        </View>

      </ScrollView>

      {/* --- FOOTER ACTION --- */}
      <TouchableOpacity style={styles.rebootBtn}>
        <Text style={styles.rebootText}>SYSTEM REBOOT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Helper Components
const MetricBox = ({ icon, label, value, color }) => (
  <View style={styles.mBox}>
    <MaterialCommunityIcons name={icon} size={24} color={color} />
    <Text style={styles.mValue}>{value}</Text>
    <Text style={styles.mLabel}>{label}</Text>
  </View>
);

const ToolItem = ({ icon, label, status }) => (
  <TouchableOpacity style={styles.toolItem}>
    <View style={styles.toolLeft}>
      <MaterialCommunityIcons name={icon} size={22} color={THEME_NEON} />
      <Text style={styles.toolLabel}>{label}</Text>
    </View>
    <Text style={styles.toolStatus}>{status}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  iconBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  headerCenter: { alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 2 },
  headerStatus: { color: THEME_NEON, fontSize: 9, fontWeight: 'bold', marginTop: 2 },
  profileBox: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#0A0A0A', borderWidth: 1, borderColor: '#1A1A1A' },

  mainCoreCard: { backgroundColor: '#080808', padding: 25, borderRadius: 25, borderWidth: 1, borderColor: '#1A1A1A', marginBottom: 20 },
  cardSmallTitle: { color: '#444', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  bigPercentage: { color: '#FFF', fontSize: 42, fontWeight: '900', marginVertical: 10 },
  smallUnit: { fontSize: 20, color: THEME_NEON },
  barContainer: { height: 6, backgroundColor: '#111', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: THEME_NEON },
  coreStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  coreStatText: { color: '#555', fontSize: 11, fontWeight: '700' },

  metricsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  mBox: { width: '31%', backgroundColor: '#080808', padding: 15, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  mValue: { color: '#FFF', fontSize: 13, fontWeight: '900', marginTop: 10 },
  mLabel: { color: '#444', fontSize: 9, fontWeight: '800', marginTop: 4 },

  sectionLabel: { color: '#333', fontSize: 11, fontWeight: '900', marginBottom: 15, letterSpacing: 1 },
  toolList: { gap: 10 },
  toolItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#080808', padding: 18, borderRadius: 18, borderWidth: 1, borderColor: '#151515' },
  toolLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toolLabel: { color: '#AAA', fontSize: 13, fontWeight: '700' },
  toolStatus: { color: THEME_NEON, fontSize: 10, fontWeight: '900' },

  rebootBtn: { 
    position: 'absolute', bottom: 30, alignSelf: 'center', 
    width: '90%', height: 55, backgroundColor: '#000', 
    borderWidth: 1, borderColor: THEME_NEON, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center'
  },
  rebootText: { color: THEME_NEON, fontWeight: '900', letterSpacing: 2, fontSize: 13 }
});