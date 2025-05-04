import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// Function to generate slightly darker shade for gradient
const darkenColor = (hex, percent) => {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};


export default function SectionCard({ title, icon, color, onPress, index }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    scale.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 }));
    opacity.value = withDelay(index * 80, withSpring(1));
  }, []);

  const gradientColors = [color, darkenColor(color, 20)]; // Create gradient

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7} // Slightly less opacity change on press
      >
        <LinearGradient // Use LinearGradient for background
          colors={gradientColors}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name={icon} size={40} color="white" /> 
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({  
  container: { // Apply width/margin to the Animated.View container
    width: '48%', 
    marginBottom: 16,
  },
  card: { // Style the gradient itself
    aspectRatio: 1,
    borderRadius: 25, // Slightly more rounded
    padding: 15, // Adjust padding
    justifyContent: 'center',
    alignItems: 'center',
    // Refined shadow for a softer look (applied via container potentially or keep elevation)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6, 
  },
  title: {
    color: 'white',
    fontSize: 16, // Slightly smaller font size
    fontWeight: '600', // Medium weight
    marginTop: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Softer text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});