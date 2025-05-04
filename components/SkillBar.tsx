import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay
} from 'react-native-reanimated';

export default function SkillBar({ name, level, index = 0, color = '#FF4B2B' }) {
  const progress = useSharedValue(0);
  
  // Convert level (0-100) to width percentage
  const percentage = Math.max(0, Math.min(level, 100));
  
  useEffect(() => {
    progress.value = withDelay(
      index * 200, // Stagger animation
      withTiming(percentage / 100, { duration: 1000 })
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  
  return (
    <View style={styles.skillContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.skillName}>{name}</Text>
        <Text style={styles.skillLevel}>{percentage}%</Text>
      </View>
      
      <View style={styles.barBackground}>
        <Animated.View 
          style={[
            styles.progressBar,
            { backgroundColor: color },
            animatedStyle
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skillContainer: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  skillLevel: {
    fontSize: 14,
    color: '#666',
  },
  barBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});