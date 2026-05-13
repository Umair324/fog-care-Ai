import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileOverlay = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <BlurView intensity={100} tint="dark" style={styles.profileCard}>
          
          {/* Decorative Top Accent */}
          <View style={styles.topBarAccent} />

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close-circle-outline" size={32} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>

          {/* Profile Header */}
          <View style={styles.headerSection}>
            <View style={styles.imageWrapper}>
              <LinearGradient 
                colors={['#E2FF00', 'transparent']} 
                style={styles.gradientRing} 
              />
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
                style={styles.profileLogo}
              />
            </View>
            <Text style={styles.driverName}>ALI RAZA</Text>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>ELITE PILOT • ZR1 DIVISION</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>98</Text>
              <Text style={styles.statLabel}>SAFETY</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>1,064</Text>
              <Text style={styles.statLabel}>HP AVG</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>12.4k</Text>
              <Text style={styles.statLabel}>KM</Text>
            </View>
          </View>

          {/* Action Menu */}
          <View style={styles.menuList}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="car-outline" size={20} color="#E2FF00" />
              <Text style={styles.menuText}>MY GARAGE</Text>
              <Ionicons name="chevron-forward" size={16} color="#444" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="trophy-outline" size={20} color="#E2FF00" />
              <Text style={styles.menuText}>ACHIEVEMENTS</Text>
              <Ionicons name="chevron-forward" size={16} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity style={styles.mainActionBtn} activeOpacity={0.8}>
            <LinearGradient 
              colors={['#E2FF00', '#B8CF00']} 
              style={styles.btnGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            >
              <Text style={styles.btnText}>UPGRADE SYSTEMS</Text>
              <Ionicons name="flash" size={18} color="#000" />
            </LinearGradient>
          </TouchableOpacity>

        </BlurView>
      </View>
    </Modal>
  );
};

export default ProfileOverlay;

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    justifyContent: 'flex-end', // Screen ke bottom se aayega
  },
  profileCard: { 
    width: '100%', 
    height: '80%', 
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50, 
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden'
  },
  topBarAccent: {
    width: 60,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20
  },
  closeBtn: { 
    position: 'absolute', 
    top: 25, 
    right: 25,
    zIndex: 10 
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 10
  },
  imageWrapper: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.5
  },
  profileLogo: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#000'
  },
  driverName: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: '900', 
    marginTop: 15,
    letterSpacing: 1
  },
  tagBadge: {
    backgroundColor: 'rgba(226, 255, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 255, 0, 0.2)'
  },
  tagText: { 
    color: '#E2FF00', 
    fontSize: 9, 
    fontWeight: 'bold',
    letterSpacing: 1
  },
  statsContainer: { 
    flexDirection: 'row', 
    marginTop: 40, 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 25, 
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#555', fontSize: 8, fontWeight: '900', marginTop: 4 },
  vDivider: { width: 1, height: '60%', backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'center' },
  menuList: {
    marginTop: 30,
    gap: 15
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 20,
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 15,
    letterSpacing: 1
  },
  mainActionBtn: {
    marginTop: 'auto',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#E2FF00',
    shadowRadius: 10,
    shadowOpacity: 0.3
  },
  btnGradient: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  btnText: { color: '#000', fontWeight: '900', fontSize: 14, letterSpacing: 1 }
});