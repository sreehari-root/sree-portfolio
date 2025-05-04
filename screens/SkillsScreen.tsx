import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';
import SkillBar from '../components/SkillBar';
import { useTheme } from '../utils/ThemeContext';

// Updated skills data with proficiency levels
const skillsData = [
  {
    category: 'Tools & Languages',
    icon: 'build',
    items: [
      { name: 'Java', level: 75 },
      { name: 'C++', level: 70 },
      { name: 'Python', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'mySQL', level: 75 },
      { name: 'Oracle', level: 65 }
    ],
    color: '#FF4B2B'
  },
  {
    category: 'Technical Skills',
    icon: 'security',
    items: [
      { name: 'Ethical Hacking', level: 80 },
      { name: 'Cybersecurity', level: 75 },
      { name: 'Network Security', level: 70 },
      { name: 'Penetration Testing', level: 65 }
    ],
    color: '#4A90E2'
  },
  {
    category: 'Operating Systems',
    icon: 'computer',
    items: [
      { name: 'Windows', level: 95 },
      { name: 'macOS', level: 85 },
      { name: 'Linux', level: 80 }
    ],
    color: '#50E3C2'
  },
  {
    category: 'Languages',
    icon: 'language',
    items: [
      { name: 'English', level: 90 },
      { name: 'Hindi', level: 85 },
      { name: 'Telugu', level: 100 },
      { name: 'Kannada', level: 100 }
    ],
    color: '#F7B733'
  }
];

// Reusable Animated Card Component
const AnimatedCard = ({ children, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
      backgroundColor: colors.card,
    };
  });

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, []);

  return <Animated.View style={[styles.card, animatedStyle]}>{children}</Animated.View>;
};

export default function SkillsScreen() {
  const { colors } = useTheme();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <CustomHeader 
        title="Skills" 
        icon="lightbulb" 
        colors={['#FF4B2B', '#FF416C']}
      />
      
      <View style={styles.content}>
        {skillsData.map((skillCategory, index) => (
          <AnimatedCard key={index} index={index}>
            <View style={styles.categoryHeader}>
              <MaterialIcons 
                name={skillCategory.icon} 
                size={22} 
                color={skillCategory.color} 
                style={styles.categoryIcon} 
              />
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {skillCategory.category}
              </Text>
            </View>
            
            <View style={styles.skillsContainer}>
              {skillCategory.items.map((skill, i) => (
                <SkillBar 
                  key={i}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                  color={skillCategory.color}
                />
              ))}
            </View>
          </AnimatedCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  skillsContainer: {
    marginTop: 10,
  }
});