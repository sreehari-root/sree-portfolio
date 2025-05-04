import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // Added FontAwesome5
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Reusable Animated Card Component (copied from ExperienceScreen example)
const AnimatedCard = ({ children, index, style = {} }) => {
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

  return <Animated.View style={[styles.card, animatedStyle, style]}>{children}</Animated.View>;
};

export default function AboutScreen() {
  const navigation = useNavigation(); // Get navigation object
  
  // Function to handle opening links
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  
  // Function to handle email
  const openEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(err => console.error("Couldn't open email", err));
  };

  // Function to handle phone call
  const openPhone = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(err => console.error("Couldn't open phone dialer", err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomHeader 
        title="About Me" 
        icon="person" 
        colors={['#FF6B6B', '#FF8E53']} // Example colors, adjust if needed
      />
      
      <View style={styles.content}>
        {/* Summary Card */}
        <AnimatedCard index={0}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>
            To work in a healthy, innovative and challenging environment extracting the best out of me, which is conducive to learn and grow at professional as well as personal level thereby directing my future endeavors as an asset to the organization.
          </Text>
        </AnimatedCard>

        {/* Contact Info Card */}
        <AnimatedCard index={1}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity style={styles.contactItem} onPress={() => openEmail('sreeharisharma087@gmail.com')}>
            <MaterialIcons name="email" size={20} color="#FF6B6B" style={styles.contactIcon} />
            <Text style={styles.contactText}>sreeharisharma087@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={() => openPhone('+916361619336')}>
            <MaterialIcons name="phone" size={20} color="#FF6B6B" style={styles.contactIcon} />
            <Text style={styles.contactText}>+91 6361619336</Text>
          </TouchableOpacity>
          <View style={styles.contactItem}>
            <MaterialIcons name="location-on" size={20} color="#FF6B6B" style={styles.contactIcon} />
            <Text style={styles.contactText}>Bangalore, KA</Text>
          </View>
        </AnimatedCard>

        {/* Links Card */}
        <AnimatedCard index={2}>
           <Text style={styles.sectionTitle}>Links</Text>
           <TouchableOpacity style={styles.contactItem} onPress={() => openLink('https://linkedin.com/in/k-s-sree-hari-sharma-08a766213')}>
             <FontAwesome5 name="linkedin" size={20} color="#FF6B6B" style={styles.contactIcon} />
             <Text style={styles.contactText}>LinkedIn</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.contactItem} onPress={() => openLink('https://github.com/Sharma12321')}>
             <FontAwesome5 name="github" size={20} color="#FF6B6B" style={styles.contactIcon} />
             <Text style={styles.contactText}>GitHub</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.contactItem} onPress={() => openLink('https://sharma-sreehari.web.val.run')}>
             <FontAwesome5 name="globe" size={20} color="#FF6B6B" style={styles.contactIcon} />
             <Text style={styles.contactText}>Website</Text>
           </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={() => openLink('https://www.instagram.com/sreehari_sharma/')}>
              <FontAwesome5 name="instagram" size={20} color="#FF6B6B" style={styles.contactIcon} />
              <Text style={styles.contactText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={() => openLink('https://www.facebook.com/sreehari.sharma.3/')}>
              <FontAwesome5 name="facebook" size={20} color="#FF6B6B" style={styles.contactIcon} />
              <Text style={styles.contactText}>Facebook</Text>
            </TouchableOpacity>
           <TouchableOpacity style={styles.contactItem} onPress={() => openLink('https://twitter.com/sreehari_sharma')}>
             <FontAwesome5 name="twitter" size={20} color="#FF6B6B" style={styles.contactIcon} />
             <Text style={styles.contactText}>Twitter</Text>
           </TouchableOpacity>
           {/* Add personal website if applicable */}
           {/* <TouchableOpacity style={styles.contactItem} onPress={() => openLink('YOUR_WEBSITE_URL')}>
             <MaterialIcons name="web" size={20} color="#FF6B6B" style={styles.contactIcon} />
             <Text style={styles.contactText}>Portfolio Website</Text>
           </TouchableOpacity> */}
        </AnimatedCard>
        
        {/* Proud Of Card */}
        <AnimatedCard index={3}>
          <Text style={styles.sectionTitle}>Proud Of</Text>
          <View style={styles.bulletPoint}>
             <MaterialIcons name="star" size={18} color="#FFD700" />
             <Text style={styles.bulletText}>Got 1st place in the RMDT (Research) for the idea of AiCyberScan Tool</Text>
          </View>
        </AnimatedCard>

        {/* Extracurricular Card */}
        <AnimatedCard index={4}>
          <Text style={styles.sectionTitle}>Extracurricular Activities</Text>
          <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Main Coordinator of Inter-College Technical Fest, DSATM.</Text>
          </View>
           <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Worked as a freelancer in Web development.</Text>
          </View>
           <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Founder of SkillSculptor an online course platform.</Text>
          </View>
        </AnimatedCard>

        {/* Hobbies Card & Admin Login Button */}
        <AnimatedCard index={5} style={{ marginBottom: 30 }}> 
          <Text style={styles.sectionTitle}>Hobbies</Text>
          <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Up to date with AI tech</Text>
          </View>
          <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Traveling</Text>
          </View>
          <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Reading Books</Text>
          </View>
           <View style={styles.bulletPoint}>
             <MaterialIcons name="arrow-right" size={18} color="#FF6B6B" />
             <Text style={styles.bulletText}>Learning Vedas</Text>
          </View>

          {/* Admin Login Button */}
          <TouchableOpacity 
            style={styles.adminLoginButton} 
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <MaterialIcons name="admin-panel-settings" size={20} color="white" />
            <Text style={styles.adminLoginButtonText}>Admin Login</Text>
          </TouchableOpacity>
        </AnimatedCard>
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
  card: { // Style for the animated card
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
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 12,
  },
  contactText: {
    fontSize: 15,
    color: '#444',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top for potentially longer text
    marginBottom: 10,
  },
  bulletText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#555',
    flex: 1, // Allow text to wrap
    lineHeight: 21,
  },
  adminLoginButton: { // Style for the new button
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C63FF', // Use a distinct color
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 25, // Add space above the button
    alignSelf: 'center', // Center the button
  },
  adminLoginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});