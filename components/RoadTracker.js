import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, Animated, Easing, Dimensions, 
  TouchableOpacity, Image 
} from 'react-native'; 
// Sahi library for safe areas
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
// LinearGradient import fix
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const THEME_NEON = '#E2FF00';
const DANGER_RED = '#FF3B30';
const CYAN = '#00E0FF';

const RoadTrackerContent = ({ onClose }) => {
  const insets = useSafeAreaInsets(); // Navigation bar height handle karne ke liye
  
  const [detectedObj, setDetectedObj] = useState({ 
    label: 'SCANNING...', 
    side: 'ROAD CLEAR', 
    icon: 'radar', 
    color: THEME_NEON 
  });
  const [lanePos, setLanePos] = useState('20%');

  const roadAnim = useRef(new Animated.Value(0)).current;
  const trafficAnim = useRef(new Animated.Value(0)).current;

  // 1. Road Lines Animation
  useEffect(() => {
    const startRoad = () => {
      roadAnim.setValue(0);
      Animated.timing(roadAnim, {
        toValue: 1, duration: 600, easing: Easing.linear, useNativeDriver: true,
      }).start(() => startRoad());
    };
    startRoad();
  }, []);

  // 2. Traffic Detection Logic
  useEffect(() => {
    const runTraffic = () => {
      trafficAnim.setValue(0);
      const isLeft = Math.random() > 0.5;
      const isTruck = Math.random() > 0.5;
      setLanePos(isLeft ? '15%' : '60%');

      Animated.timing(trafficAnim, {
        toValue: 1, duration: 3500, easing: Easing.linear, useNativeDriver: true,
      }).start(() => {
          setDetectedObj({ label: 'SCANNING...', side: 'ROAD CLEAR', icon: 'radar', color: THEME_NEON });
          setTimeout(runTraffic, 800); 
      });

      const listenerId = trafficAnim.addListener(({ value }) => {
        if (value > 0.2 && value < 0.7) {
          setDetectedObj({ 
            label: isTruck ? 'HEAVY TRUCK' : 'VEHICLE', 
            side: isLeft ? 'LEFT LANE' : 'RIGHT LANE', 
            icon: isTruck ? 'truck' : 'car', 
            color: isTruck ? CYAN : THEME_NEON 
          });
        } else if (value >= 0.7) {
          setDetectedObj({ label: 'WARNING: CLOSE', side: 'COLLISION RISK', icon: 'alert-decagram', color: DANGER_RED });
        }
      });
      return () => trafficAnim.removeListener(listenerId);
    };
    runTraffic();
  }, []);

  const lineY = roadAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 100] });
  const objY = trafficAnim.interpolate({ inputRange: [0, 1], outputRange: [-50, 400] });
  const objScale = trafficAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 2.5] });

  return (
    <View style={styles.mainWrapper}>
      <SafeAreaView style={styles.container} edges={['top']}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
            <Ionicons name="chevron-back" size={24} color={THEME_NEON} />
          </TouchableOpacity>
          <View style={styles.titleCapsule}>
            <Text style={styles.titleText}>RADAR V3</Text>
          </View>
          <View style={styles.profileBox}>
            <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
          </View>
        </View>

        {/* ALERT CARD */}
        <View style={[styles.alertCard, { borderColor: detectedObj.color + '40' }]}>
          <BlurView intensity={25} tint="dark" style={styles.blurCard}>
            <MaterialCommunityIcons name={detectedObj.icon} size={38} color={detectedObj.color} />
            <View style={{marginLeft: 15}}>
              <Text style={[styles.alertTitle, {color: detectedObj.color}]}>{detectedObj.label}</Text>
              <Text style={styles.alertSub}>{detectedObj.side}</Text>
            </View>
          </BlurView>
        </View>

        {/* SCANNER VIEW */}
        <View style={styles.scannerContainer}>
          <View style={styles.roadFrame}>
            <View style={styles.perspective}>
              <View style={styles.road}>
                <View style={styles.roadGlow} />
                {[0, 1, 2, 3].map(i => (
                  <Animated.View key={i} style={[styles.line, {transform: [{translateY: lineY}], top: i*120}]} />
                ))}
                
                <Animated.View style={[styles.hazardObj, { left: lanePos, transform: [{ translateY: objY }, { scale: objScale }] }]}>
                   <MaterialCommunityIcons 
                    name={detectedObj.icon === 'radar' ? 'circle-double' : detectedObj.icon} 
                    size={45} 
                    color={detectedObj.color} 
                   />
                </Animated.View>
              </View>
            </View>
            <View style={styles.scanLine} />
          </View>
        </View>

        {/* FOOTER - Handling Navigation Bar Gap */}
        <View style={[styles.footer, { marginBottom: insets.bottom + 10 }]}>
           <TouchableOpacity style={styles.sideBtn}>
             <Text style={styles.btnIconText}>—</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.mainActionBtn}>
             <LinearGradient 
                colors={[THEME_NEON, '#B8CF00']} 
                start={{x:0, y:0}} end={{x:1, y:0}}
                style={styles.gradient}
             >
               <Ionicons name="scan" size={22} color="#000" />
               <Text style={styles.mainActionText}>AI THERMAL</Text>
             </LinearGradient>
           </TouchableOpacity>

           <TouchableOpacity style={styles.sideBtn}>
             <Text style={styles.btnIconText}>+</Text>
           </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

// Wrapper to provide SafeArea Context
export default function RoadTracker(props) {
  return (
    <SafeAreaProvider>
      <RoadTrackerContent {...props} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  iconBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  titleCapsule: { backgroundColor: '#0A0A0A', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#1A1A1A' },
  titleText: { color: THEME_NEON, fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  profileBox: { width: 45, height: 45, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#1A1A1A' },
  avatar: { width: '100%', height: '100%' },

  alertCard: { height: 90, marginTop: 20, borderRadius: 20, overflow: 'hidden', borderWidth: 1 },
  blurCard: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  alertTitle: { fontSize: 20, fontWeight: '900' },
  alertSub: { color: '#666', fontSize: 11, fontWeight: '700', marginTop: 2 },

  scannerContainer: { flex: 1, marginVertical: 20 },
  roadFrame: { flex: 1, backgroundColor: '#030303', borderRadius: 30, borderWidth: 1, borderColor: '#111', overflow: 'hidden' },
  perspective: { flex: 1, transform: [{perspective: 150}, {rotateX: '60deg'}] },
  road: { flex: 1, alignSelf: 'center', width: '75%', backgroundColor: '#000', borderLeftWidth: 2, borderRightWidth: 2, borderColor: '#1A1A1A' },
  roadGlow: { ...StyleSheet.absoluteFillObject, backgroundColor: THEME_NEON, opacity: 0.03 },
  line: { width: 2, height: 60, backgroundColor: '#111', alignSelf: 'center', position: 'absolute' },
  hazardObj: { position: 'absolute', shadowColor: THEME_NEON, shadowRadius: 15, shadowOpacity: 0.6 },
  scanLine: { position: 'absolute', top: '50%', width: '100%', height: 1, backgroundColor: THEME_NEON, opacity: 0.3 },

  footer: { flexDirection: 'row', alignItems: 'center', height: 70 },
  sideBtn: { width: 55, height: 55, borderRadius: 18, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  btnIconText: { color: '#FFF', fontSize: 22, fontWeight: '300' },
  mainActionBtn: { flex: 1, height: 55, marginHorizontal: 15, borderRadius: 18, overflow: 'hidden' },
  gradient: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  mainActionText: { color: '#000', fontWeight: '900', fontSize: 13, letterSpacing: 1 }
});