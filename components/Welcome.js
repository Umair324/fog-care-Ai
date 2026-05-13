import React, { useRef } from 'react'; // useRef add kiya
import { 
  StyleSheet, Text, View, ImageBackground, 
  TouchableOpacity, Dimensions, Animated 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  // Animation value initialize kari
  const moveAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // 1. Arrow ko aage move karo
    Animated.timing(moveAnim, {
      toValue: 80, // 20 units aage jayega
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // 2. Dashboard par le jao
      navigation.navigate('Dashboard');
      
      // 3. Wapas position par le aao (taake back aane par reset ho)
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://i.pinimg.com/736x/43/ae/e2/43aee20aac5bf12b9cf188c5b258e1b7.jpg' }} 
        style={styles.image}
      >
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)', 'black']} style={styles.overlay}>
          <View style={styles.textWrapper}>
            <Text style={styles.titleThin}>Welcome to</Text>
            <Text style={styles.titleBold}>Smarter AI{"\n"}Fog Care</Text>
          </View>

          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={handlePress} 
            style={styles.footer}
          >
            <View style={styles.button}>
              {/* Animated View arrow ko move karne ke liye */}
              <Animated.View style={[
                styles.circle, 
                { transform: [{ translateX: moveAnim }] }
              ]}>
                <Text style={styles.arrowText}>→</Text>
              </Animated.View>
              <Text style={styles.buttonText}>Click to start</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { width, height },
  overlay: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 25, paddingBottom: 60 },
  textWrapper: { marginBottom: 30 },
  titleThin: { color: '#fff', fontSize: 34, fontWeight: '300' },
  titleBold: { color: '#fff', fontSize: 44, fontWeight: '900', textTransform: 'uppercase' },
  button: { 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    height: 75, 
    borderRadius: 40, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.2)' 
  },
  circle: { 
    width: 60, 
    height: 60, 
    backgroundColor: '#E2FF00', 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#E2FF00',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  arrowText: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  buttonText: { color: '#fff', fontSize: 18, marginLeft: 20, fontWeight: '700' }
});