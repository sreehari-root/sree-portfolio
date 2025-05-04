import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

// Replace with your actual experience data
const experienceData = [
  {
    company: 'Corizo',
    position: 'Student Intern',
    period: 'Feb 2023 - Apr 2023',
    location: 'Virtual',
    responsibilities: [
      'Completed a 2-month internship focused on Cyber Security and Ethical Hacking.',
      // Add more specific responsibilities if known
    ],
    technologies: ['Cyber Security', 'Ethical Hacking'] // Add relevant technologies if applicable
  },
  {
    company: 'MSR EDUSOFT',
    position: 'Internship',
    period: 'Nov 2022 - Mar 2023',
    location: 'Virtual',
    responsibilities: [
      'Completed a 5-month internship focused on Python (AI/ML).',
      // Add more specific responsibilities if known
    ],
    technologies: ['Python', 'AI', 'ML'] // Add relevant technologies if applicable
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


export default function ExperienceScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomHeader 
        title="Experience" 
        icon="work" 
        colors={['#50E3C2', '#4A90E2']} 
      />

      <View style={styles.content}>
        {experienceData.length > 0 ? (
          experienceData.map((exp, index) => (
            <AnimatedCard key={index} index={index}>
              <View style={styles.companyHeader}>
                <Text style={styles.companyName}>{exp.company}</Text>
                <Text style={styles.period}>{exp.period}</Text>
              </View>
              <Text style={styles.position}>{exp.position}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color="#666" style={styles.locationIcon} />
                <Text style={styles.locationText}>{exp.location}</Text>
              </View>

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Key Responsibilities</Text>
                  {exp.responsibilities.map((resp, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <MaterialIcons name="arrow-right" size={18} color="#50E3C2" />
                      <Text style={styles.bulletText}>{resp}</Text>
                    </View>
                  ))}
                </>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Technologies</Text>
                  <View style={styles.techContainer}>
                    {exp.technologies.map((tech, i) => (
                      <View key={i} style={styles.techTag}>
                        <Text style={styles.techText}>{tech}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </AnimatedCard>
          ))
        ) : (
          <View style={styles.placeholderContainer}>
             <Text style={styles.placeholderText}>No experience details available yet.</Text>
          </View>
        )}
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
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 19, 
    fontWeight: 'bold',
    color: '#50E3C2', 
  },
  period: {
    color: '#777', 
    fontSize: 13, 
  },
  position: {
    fontSize: 17, 
    color: '#333',
    marginTop: 2,
    fontWeight: '600',
    marginBottom: 5,
  },
  locationContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 15, 
    fontWeight: 'bold',
    color: '#444', 
    marginTop: 18, 
    marginBottom: 12, 
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 10, 
  },
  bulletText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555', 
    flex: 1,
    lineHeight: 20, 
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  techTag: {
    backgroundColor: 'rgba(80, 227, 194, 0.1)', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    margin: 4, 
    borderWidth: 1,
    borderColor: 'rgba(80, 227, 194, 0.3)', 
  },
  techText: {
    color: '#3aafa9', 
    fontSize: 13, 
    fontWeight: '500',
  },
   placeholderContainer: { // Added for empty state
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  placeholderText: { // Added for empty state
    fontSize: 16,
    color: '#888',
  },
});