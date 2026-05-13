import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const DaRoutes = ({ onClose }) => {
  const [start, setStart] = useState('');
  const [dest, setDest] = useState('');

  // Major Pakistan Bus Routes Data
  const pakistanRoutes = [
    { id: 1, route: 'Lahore ↔ Islamabad', time: '4h 30m', motorway: 'M-2' },
    { id: 2, route: 'Karachi ↔ Hyderabad', time: '2h 15m', motorway: 'M-9' },
    { id: 3, route: 'Lahore ↔ Multan', time: '4h 00m', motorway: 'M-3' },
    { id: 4, route: 'Islamabad ↔ Peshawar', time: '2h 00m', motorway: 'M-1' },
    { id: 5, route: 'Multan ↔ Sukkur', time: '5h 30m', motorway: 'M-5' },
    { id: 6, route: 'Lahore ↔ Faisalabad', time: '2h 10m', motorway: 'M-3' },
    { id: 7, route: 'Karachi ↔ Lahore', time: '16h 00m', motorway: 'N-5/M-5' },
    { id: 8, route: 'Rawalpindi ↔ Murree', time: '1h 30m', motorway: 'Expressway' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>LOGISTICS HUB</Text>
          <Text style={styles.subtitle}>PAKISTAN INTERCITY NETWORK</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-circle-outline" size={32} color="#E2FF00" />
        </TouchableOpacity>
      </View>

      {/* Search Inputs */}
      <View style={styles.searchBox}>
        <View style={styles.inputRow}>
          <Ionicons name="radio-button-on" size={18} color="#E2FF00" />
          <TextInput 
            placeholder="Origin City" 
            placeholderTextColor="#444" 
            style={styles.input}
            value={start}
            onChangeText={setStart}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.inputRow}>
          <Ionicons name="location" size={18} color="#FF4B4B" />
          <TextInput 
            placeholder="Destination" 
            placeholderTextColor="#444" 
            style={styles.input}
            value={dest}
            onChangeText={setDest}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.goBtn}>
        <Text style={styles.goText}>CALCULATE ETA</Text>
        <Ionicons name="flash" size={20} color="#000" />
      </TouchableOpacity>

      {/* Routes List */}
      <Text style={styles.sectionTitle}>ACTIVE CORRIDORS</Text>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {pakistanRoutes.map((item) => (
          <TouchableOpacity key={item.id} style={styles.routeCard}>
            <View style={styles.routeInfo}>
              <Text style={styles.routeName}>{item.route}</Text>
              <View style={styles.tagRow}>
                <View style={styles.motorwayTag}>
                  <Text style={styles.tagText}>{item.motorway}</Text>
                </View>
                <Text style={styles.timeText}><Ionicons name="time-outline" /> {item.time}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#E2FF00" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default DaRoutes;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 25 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  title: { color: '#fff', fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: '#E2FF00', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  searchBox: { backgroundColor: '#0A0A0A', borderRadius: 25, padding: 10, borderWidth: 1, borderColor: '#1A1A1A' },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  input: { flex: 1, color: '#fff', marginLeft: 15, fontSize: 15 },
  line: { height: 1, backgroundColor: '#1A1A1A', marginHorizontal: 40 },
  goBtn: { backgroundColor: '#E2FF00', height: 55, borderRadius: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  goText: { fontWeight: '900', fontSize: 14, letterSpacing: 1 },
  sectionTitle: { color: '#444', marginTop: 30, marginBottom: 15, fontWeight: 'bold', fontSize: 12, letterSpacing: 2 },
  routeCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0A0A0A', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#1A1A1A' 
  },
  routeInfo: { flex: 1 },
  routeName: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  motorwayTag: { backgroundColor: '#1A1A1A', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  tagText: { color: '#E2FF00', fontSize: 10, fontWeight: 'bold' },
  timeText: { color: '#666', fontSize: 11 },
});