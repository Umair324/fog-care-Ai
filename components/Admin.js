import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AdminScreen({ onBack }) {
  const [isAiActive, setIsAiActive] = useState(true);
  const [remoteLock, setRemoteLock] = useState(false);

  const StatCard = ({ title, value, icon, color = "#E2FF00" }) => (
    <View style={styles.statCard}>
      <View style={[styles.iconCircle, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statLabel}>{title}</Text>
      <Text style={[styles.statValue, { color: color }]}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.glowTop} />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>COMMAND CENTER</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>ROOT ACCESS</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* --- SYSTEM STATS ROW --- */}
        <View style={styles.statsRow}>
          <StatCard title="Total Distance" value="12,482 KM" icon="speedometer-outline" />
          <StatCard title="System Load" value="24%" icon="hardware-chip-outline" />
        </View>

        {/* --- SERVER HEALTH CARD --- */}
        <BlurView intensity={30} tint="dark" style={styles.healthCard}>
          <Text style={styles.sectionTitle}>NETWORK STATUS</Text>
          <View style={styles.healthRow}>
            <View style={styles.progressContainer}>
               <LinearGradient colors={['#E2FF00', '#88cc00']} style={{ width: '85%', height: '100%', borderRadius: 10 }} />
            </View>
            <Text style={styles.healthPercent}>85% Up</Text>
          </View>
          <Text style={styles.subInfo}>Satellite Link: Latency 24ms (Stable)</Text>
        </BlurView>

        {/* --- CONTROL SWITCHES --- */}
        <View style={styles.controlSection}>
          <Text style={styles.sectionTitle}>SYSTEM OVERRIDES</Text>
          
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>AI Surveillance Engine</Text>
              <Text style={styles.switchSub}>Real-time object detection</Text>
            </View>
            <Switch 
              value={isAiActive} 
              onValueChange={setIsAiActive}
              trackColor={{ false: "#333", true: "#E2FF00" }}
              thumbColor={isAiActive ? "#fff" : "#888"}
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Remote Ignition Lock</Text>
              <Text style={styles.switchSub}>Emergency vehicle shutdown</Text>
            </View>
            <Switch 
              value={remoteLock} 
              onValueChange={setRemoteLock}
              trackColor={{ false: "#333", true: "#FF4B4B" }}
              thumbColor={remoteLock ? "#fff" : "#888"}
            />
          </View>
        </View>

        {/* --- LOGS SECTION --- */}
        <Text style={styles.sectionTitle}>SECURITY LOGS</Text>
        <View style={styles.logContainer}>
          <LogItem time="14:20" event="Geofence Exit" desc="Vehicle left Zone A" color="#FF4B4B" />
          <LogItem time="12:05" event="System Boot" desc="AI Kernel 4.2 initialized" color="#E2FF00" />
          <LogItem time="09:44" event="User Auth" desc="Biometric access granted" color="#E2FF00" />
        </View>

      </ScrollView>
    </View>
  );
}

const LogItem = ({ time, event, desc, color }) => (
  <View style={styles.logItem}>
    <View style={[styles.logDot, { backgroundColor: color }]} />
    <Text style={styles.logTime}>{time}</Text>
    <View style={{ flex: 1, marginLeft: 15 }}>
      <Text style={styles.logEvent}>{event}</Text>
      <Text style={styles.logDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  glowTop: { position: 'absolute', top: -100, left: 0, right: 0, height: 300, backgroundColor: 'rgba(226, 255, 0, 0.05)', borderRadius: 150, transform: [{ scaleX: 2 }] },
  
  header: { marginTop: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { padding: 8, borderRadius: 12, backgroundColor: '#111' },
  headerTitle: { color: '#fff', fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  statusBadge: { backgroundColor: 'rgba(255, 75, 75, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 75, 75, 0.3)' },
  statusText: { color: '#FF4B4B', fontSize: 9, fontWeight: 'bold' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', backgroundColor: '#0A0A0A', padding: 20, borderRadius: 25, borderWidth: 1, borderColor: '#1A1A1A' },
  iconCircle: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  statLabel: { color: '#666', fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  statValue: { fontSize: 18, fontWeight: '900' },

  healthCard: { padding: 20, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginBottom: 20 },
  sectionTitle: { color: '#444', fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 15, marginLeft: 5 },
  healthRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  progressContainer: { flex: 1, height: 6, backgroundColor: '#222', borderRadius: 10, marginRight: 15 },
  healthPercent: { color: '#E2FF00', fontSize: 12, fontWeight: 'bold' },
  subInfo: { color: '#666', fontSize: 10 },

  controlSection: { marginBottom: 25 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0A0A0A', padding: 18, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#111' },
  switchLabel: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  switchSub: { color: '#444', fontSize: 10, marginTop: 2 },

  logContainer: { backgroundColor: '#0A0A0A', borderRadius: 25, padding: 20, borderWidth: 1, borderColor: '#111' },
  logItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logDot: { width: 6, height: 6, borderRadius: 3 },
  logTime: { color: '#444', fontSize: 11, fontWeight: 'bold' },
  logEvent: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  logDesc: { color: '#666', fontSize: 10, marginTop: 2 }
});