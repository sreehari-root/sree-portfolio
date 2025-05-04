import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolation,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';

const HEADER_MAX_HEIGHT = 340; // Slightly taller
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ProfileHeader({ scrollY }) {
  // Animation values for interactive elements
  const pulseAnim = useSharedValue(1);
  const rotateAnim = useSharedValue(0);

  useEffect(() => {
    // Subtle pulse animation for the profile image
    pulseAnim.value = withSequence(
      withDelay(1000, withTiming(1.05, { duration: 800 })),
      withTiming(1, { duration: 800 })
    );
    
    // Subtle rotation for social icons
    rotateAnim.value = withSequence(
      withDelay(1500, withTiming(1, { duration: 500 })),
      withTiming(0, { duration: 500 })
    );
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );
    return {
      height: height,
    };
  });

  const profileContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-HEADER_MAX_HEIGHT / 2, 0, HEADER_SCROLL_DISTANCE],
      [1.3, 1, 0.7],
      Extrapolation.CLAMP
    );
    
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2],
      [1, 0],
      Extrapolation.CLAMP
    );
    
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -20],
      Extrapolation.CLAMP
    );
    
    return {
      transform: [
        { scale: scale },
        { translateY: translateY }
      ],
      opacity: opacity,
    };
  });
  
  const profileImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnim.value }]
    };
  });
  
  const socialIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      rotateAnim.value,
      [0, 1],
      [0, 15],
      Extrapolation.CLAMP
    );
    
    return {
      transform: [{ rotate: `${rotate}deg` }]
    };
  });

  const minimalHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 1.5, HEADER_SCROLL_DISTANCE],
      [0, 1],
      Extrapolation.CLAMP
    );
    
    const translateY = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [20, 0],
      Extrapolation.CLAMP
    );
    
    return {
      opacity: opacity,
      transform: [{ translateY: translateY }]
    };
  });

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <LinearGradient
        colors={['#4361EE', '#3A0CA3']} // More vivid gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background pattern/decoration */}
        <View style={styles.headerDecoration1} />
        <View style={styles.headerDecoration2} />
        
        {/* Content visible when expanded */}
        <Animated.View style={[styles.profileContainer, profileContainerStyle]}>
          <Animated.Image
            source={{ uri: 'https://media.licdn.com/dms/image/v2/D5603AQFMRPfY1VA0Ww/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1709724527763?e=2147483647&v=beta&t=1SyIbV-nFtq4p5fJIuFDcpHA08z2fBMU3Bmq_EB5-Io' }} // Use a better placeholder or real image
            style={[styles.profileImage, profileImageStyle]}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>K S SREEHARI</Text>
            <Text style={styles.title}>SOFTWARE ENGINEER</Text>
            <View style={styles.socialLinks}>
              <Animated.View style={socialIconStyle}>
                <TouchableOpacity 
                  style={styles.socialIcon} 
                  onPress={() => openLink('https://github.com/Sharma12321')}
                >
                  <FontAwesome5 name="github" size={22} color="white" />
                </TouchableOpacity>
              </Animated.View>
              
              <Animated.View style={socialIconStyle}>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => openLink('https://linkedin.com/in/k-s-sree-hari-sharma-08a766213')}
                >
                  <FontAwesome5 name="linkedin" size={22} color="white" />
                </TouchableOpacity>
              </Animated.View>
              
              <Animated.View style={socialIconStyle}>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => openLink('https://sharma-sreehari.web.val.run')}
                >
                  <FontAwesome5 name="globe" size={22} color="white" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </Animated.View>
        
        {/* Content visible when collapsed */}
        <Animated.View style={[styles.minimalHeaderContent, minimalHeaderStyle]}>
          <Text style={styles.minimalHeaderTitle}>K S SREEHARI</Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
    backgroundColor: '#3A0CA3',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerDecoration1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: 20,
    right: -50,
  },
  headerDecoration2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    bottom: 40,
    left: 20,
  },
  profileContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  nameContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
    letterSpacing: 1.2,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 18,
  },
  socialIcon: {
    marginHorizontal: 14,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimalHeaderContent: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  minimalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
});