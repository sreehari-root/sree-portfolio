import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import SectionCard from '../components/SectionCard';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle,
  withSpring,
  FadeIn,
  Layout
} from 'react-native-reanimated';
import { useTheme } from '../utils/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const fadeAnim = useSharedValue(0);
  const { colors } = useTheme();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  useEffect(() => {
    fadeAnim.value = withSpring(1); 
    
    // Hide status bar or make it translucent for a more immersive experience
    StatusBar.setBarStyle('light-content');
  }, []);

  const sections = [
    {
      title: 'About',
      icon: 'person',
      color: '#FF6B6B',
      route: 'About'
    },
    {
      title: 'Education',
      icon: 'school',
      color: '#4A90E2',
      route: 'Education'
    },
    {
      title: 'Experience',
      icon: 'work',
      color: '#50E3C2',
      route: 'Experience'
    },
    {
      title: 'Projects',
      icon: 'code',
      color: '#C471ED',
      route: 'Projects'
    },
    {
      title: 'Gallery',
      icon: 'photo-library',
      color: '#4ECDC4',
      route: 'Gallery'
    },
    {
      title: 'Videos',
      icon: 'video-library',
      color: '#FF8C42',
      route: 'Videos'
    },
    {
      title: 'Certificates',
      icon: 'card-membership',
      color: '#F7B733',
      route: 'Certificates'
    },
    {
      title: 'Skills',
      icon: 'lightbulb',
      color: '#FF4B2B',
      route: 'Skills'
    },
    {
      title: 'Contact',
      icon: 'email',
      color: '#FF8842',
      route: 'Contact'
    }
  ];

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      backgroundColor: 'transparent',
    };
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background gradient for the entire screen */}
      <LinearGradient
        colors={['#121212', colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.3 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Optional: Decorative background elements */}
      <View style={styles.backgroundDecoration} />
      <View style={styles.backgroundDecoration2} />
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ProfileHeader scrollY={scrollY} /> 
        
        <Animated.View style={[styles.content, contentStyle]}> 
          <Animated.View 
            style={styles.sectionsContainer}
            entering={FadeIn.delay(300).duration(800)}
          >
            <View style={styles.sectionsGrid}>
              {sections.map((section, index) => (
                <SectionCard
                  key={section.title}
                  {...section}
                  index={index}
                  onPress={() => navigation.navigate(section.route)}
                  layout={Layout.delay(50)}
                />
              ))}
            </View>
          </Animated.View>
          
          {/* Quick action floating button */}
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <LinearGradient
              colors={['#FF8842', '#FF5555']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              borderRadius={30}
            >
              <MaterialIcons name="chat" size={28} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  sectionsContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  backgroundDecoration: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(74, 144, 226, 0.08)',
    top: -100,
    right: -100,
  },
  backgroundDecoration2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 107, 0.06)',
    bottom: 100,
    left: -70,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  gradientButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});