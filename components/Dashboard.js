import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, 
  ScrollView, Animated, Easing, StatusBar, Dimensions
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Components (Functionality same rakhi hai)
import RouteScanner from './routers'; 
import HomeComponent from './Home';
import ProfileOverlay from './Profile';
import DaRoutes from './DaRoutes';
import RoadTracker from './RoadTracker'; 
import OptimizedHome from './Perfomance'; 

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('DASHBOARD'); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderContent = () => {
    if (activeTab === 'HOME') return <HomeComponent onClose={() => setActiveTab('DASHBOARD')} />;
    if (activeTab === 'ROUTES') return <DaRoutes onClose={() => setActiveTab('DASHBOARD')} />;
    if (activeTab === 'SCANNER') return <RouteScanner onClose={() => setActiveTab('DASHBOARD')} />;
    if (activeTab === 'PERFORMANCE') return <OptimizedHome onClose={() => setActiveTab('DASHBOARD')} />;
    if (activeTab === 'DIAGNOSTICS') return <RoadTracker onClose={() => setActiveTab('DASHBOARD')} />;

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>WELCOME BACK,</Text>
            <Text style={styles.carName}>CORVETTE <Text style={{color: '#E2FF00'}}>ZR1</Text></Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => setIsProfileOpen(true)}>
             <Image 
                source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} 
                style={styles.avatar} 
             />
             <View style={styles.onlineBadge} />
          </TouchableOpacity>
        </View>

        {/* MAIN RADAR CARD */}
        <View style={styles.radarCardWrapper}>
          <LinearGradient colors={['#1A1A1A', '#050505']} style={styles.modernCard}>
            <View style={styles.cardGlow} />
            <View style={styles.radarHeader}>
               <View>
                 <Text style={styles.cardTitle}>SYSTEM STATUS</Text>
                 <Text style={styles.subTitle}>AI RADAR ACTIVE</Text>
               </View>
               <View style={styles.pulseContainer}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.rangeText}>LIVE</Text>
               </View>
            </View>

            <View style={styles.radarCircleContainer}>
               <View style={styles.radarRing1} />
               <View style={styles.radarRing2} />
               <Animated.View style={[styles.radarSweep, { transform: [{ rotate: rotation }] }]}>
                  <LinearGradient colors={['rgba(226, 255, 0, 0.4)', 'transparent']} style={{ flex: 1 }} />
               </Animated.View>
               <Ionicons name="car-sport" size={48} color="#E2FF00" style={styles.carIconGlow} />
            </View>

            <View style={styles.statsRow}>
               <View style={styles.statBox}>
                  <Text style={styles.statLabel}>ENGINE</Text>
                  <Text style={styles.statValue}>OPTIMAL</Text>
               </View>
               <View style={styles.statDivider} />
               <View style={styles.statBox}>
                  <Text style={styles.statLabel}>POWER</Text>
                  <Text style={styles.statValue}>1,064 HP</Text>
               </View>
            </View>
          </LinearGradient>
        </View>

        {/* MODERN GRID MENU */}
        <View style={styles.grid}>
          {[
            { id: 'PERFORMANCE', label: 'COCKPIT', icon: 'speedometer-outline' },
            { id: 'PERFORMANCE', label: 'PERFORMANCE', icon: 'flame-outline' },
            { id: 'DIAGNOSTICS', label: 'TRACKER', icon: 'location-outline' },
            { id: 'TUNING', label: 'SYSTEMS', icon: 'options-outline' },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.modernGridBtn} 
              onPress={() => setActiveTab(item.id)}
            >
              <BlurView intensity={10} tint="light" style={styles.btnBlur}>
                <Ionicons name={item.icon} size={26} color="#E2FF00" />
                <Text style={styles.gridLabel}>{item.label}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.dashboardContainer} edges={['top']}>
        <StatusBar barStyle="light-content" />
        
        {/* Deep Black Background */}
        <View style={[StyleSheet.absoluteFillObject, {backgroundColor: '#000'}]} />
        
        <ProfileOverlay visible={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

        <View style={{ flex: 1 }}>
          {renderContent()}
        </View>

        {/* NEUMORPHIC NAVBAR */}
        <View style={styles.tabContainer}>
           <BlurView intensity={90} tint="dark" style={styles.tabBar}>
              <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('DASHBOARD')}>
                 <Ionicons name="grid-outline" size={22} color={activeTab === 'DASHBOARD' ? "#E2FF00" : "#555"} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('ROUTES')}>
                 <Ionicons name="navigate-circle-outline" size={22} color={activeTab === 'ROUTES' ? "#E2FF00" : "#555"} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.activeTabCircle} 
                onPress={() => setActiveTab('SCANNER')}
              >
                 <Ionicons name="car-sport" size={26} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('DIAGNOSTICS')}>
                <Ionicons name="map-outline" size={22} color={activeTab === 'DIAGNOSTICS' ? "#E2FF00" : "#555"} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem} onPress={() => setIsProfileOpen(true)}>
                <Ionicons name="person-outline" size={22} color="#555" />
              </TouchableOpacity>
           </BlurView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: { flex: 1, backgroundColor: '#000' },
  header: { marginTop: 15, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: '#555', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  carName: { color: '#fff', fontSize: 28, fontWeight: '900' },
  profileBtn: { width: 50, height: 50, borderRadius: 25, padding: 2, borderWidth: 1, borderColor: '#333' },
  avatar: { width: '100%', height: '100%', borderRadius: 25 },
  onlineBadge: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#E2FF00', borderWidth: 2, borderColor: '#000' },
  
  radarCardWrapper: { padding: 25 },
  modernCard: { borderRadius: 40, padding: 25, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  cardGlow: { position: 'absolute', top: -50, right: -50, width: 150, height: 150, backgroundColor: 'rgba(226, 255, 0, 0.05)', borderRadius: 75 },
  cardTitle: { color: '#E2FF00', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  subTitle: { color: '#555', fontSize: 9, fontWeight: 'bold', marginTop: 2 },
  pulseContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E2FF00', marginRight: 6 },
  rangeText: { color: '#E2FF00', fontSize: 9, fontWeight: 'bold' },
  
  radarCircleContainer: { width: 180, height: 180, marginVertical: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
  radarRing1: { position: 'absolute', width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: '#1A1A1A' },
  radarRing2: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: '#222' },
  radarSweep: { position: 'absolute', width: '100%', height: '50%', top: 0, borderTopLeftRadius: 100, borderTopRightRadius: 100 },
  carIconGlow: { shadowColor: '#E2FF00', shadowRadius: 20, shadowOpacity: 0.8, elevation: 10 },
  
  statsRow: { flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20 },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { color: '#444', fontSize: 9, fontWeight: 'bold', marginBottom: 5 },
  statValue: { color: '#fff', fontSize: 14, fontWeight: '900' },
  statDivider: { width: 1, height: '100%', backgroundColor: '#222' },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
  modernGridBtn: { width: '47%', height: 100, marginBottom: 15, borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: '#1A1A1A' },
  btnBlur: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  gridLabel: { color: '#fff', fontSize: 10, fontWeight: 'bold', marginTop: 10, letterSpacing: 1 },
  
  tabContainer: { position: 'absolute', bottom: 35, width: '100%', alignItems: 'center' },
  tabBar: { flexDirection: 'row', width: '92%', height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'space-around', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(10,10,10,0.8)' },
  navItem: { padding: 10 },
  activeTabCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E2FF00', justifyContent: 'center', alignItems: 'center', shadowColor: '#E2FF00', shadowRadius: 15, shadowOpacity: 0.4, elevation: 10 },
});