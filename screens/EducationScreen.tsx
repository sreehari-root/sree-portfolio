import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
// Remove LinearGradient if not used directly here
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

// Replace with your actual education data
const educationData = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dayananda Sagar Academy of Technology and Management',
    period: '2023 - 2025',
    location: 'Bangalore, KA',
    details: [] // Add details like GPA, relevant coursework if desired
  },
  {
    degree: 'Bachelor of Commerce (B.Com), Computer Application',
    institution: 'P.V.K.K Degree College',
    period: '2020 - 2023',
    location: 'Anantapur, AP',
    details: []
  },
  {
    degree: 'Intermediate',
    institution: 'LRG Naidu Jr College',
    period: '2018 - 2020',
    location: 'Hindupur, AP',
    details: []
  },
  {
    degree: 'SLC (Secondary School)',
    institution: 'Mother EM High School',
    period: '2017 - 2018', // Assuming this is the final year
    location: 'Roddam, AP',
    details: []
  }
];

// Reusable Animated Card Component (ensure this is defined or imported)
const AnimatedCard = ({ children, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, []);

  return <Animated.View style={[styles.card, animatedStyle]}>{children}</Animated.View>;
};

export default function EducationScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomHeader 
        title="Education" 
        icon="school" 
        colors={['#4A90E2', '#8A2BE2']} // Example colors
      />
      
      <View style={styles.content}>
        {educationData.map((edu, index) => (
          <AnimatedCard key={index} index={index}>
            <View style={styles.eduHeader}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.period}>{edu.period}</Text>
            </View>
            <Text style={styles.institution}>{edu.institution}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#666" style={styles.locationIcon} />
              <Text style={styles.locationText}>{edu.location}</Text>
            </View>
            {/* Optional: Display details if provided */}
            {edu.details && edu.details.length > 0 && (
              <View style={styles.detailsContainer}>
                {edu.details.map((detail, i) => (
                   <View key={i} style={styles.bulletPoint}>
                     <MaterialIcons name="arrow-right" size={18} color="#4A90E2" />
                     <Text style={styles.bulletText}>{detail}</Text>
                   </View>
                ))}
              </View>
            )}
          </AnimatedCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  degree: {
    fontSize: 18, // Slightly smaller
    fontWeight: 'bold',
    color: '#4A90E2', // Theme color
    flex: 1, // Allow wrapping
    marginRight: 10, // Space before period
  },
  period: {
    color: '#777',
    fontSize: 13,
  },
  institution: {
    fontSize: 16,
    color: '#444', // Darker grey
    marginTop: 4,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, // More spacing
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginTop: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
});