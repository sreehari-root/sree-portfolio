import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
// Remove LinearGradient if not used directly here
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

// Replace with your actual certificate data
const certificateData = [
  {
    name: 'Microsoft Technology Associate (MTA)',
    issuer: 'Microsoft',
    date: null, // Add date if known
    imageUrl: 'https://api.a0.dev/assets/image?text=MSFT%20Cert&aspect=1:1', // Placeholder
    link: null // Add verification link if available
  },
  {
    name: 'Oracle Certification', // Be more specific if possible (e.g., OCP Java SE 11)
    issuer: 'Oracle / Success Software Academy', // Clarify issuer if needed
    date: null,
    imageUrl: 'https://api.a0.dev/assets/image?text=Oracle%20Cert&aspect=1:1', // Placeholder
    link: null
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA / Cybrary', // Clarify issuer if needed
    date: null,
    imageUrl: 'https://api.a0.dev/assets/image?text=Sec%2B%20Cert&aspect=1:1', // Placeholder
    link: null
  },
   {
    name: 'Cybersecurity Analyst',
    issuer: 'IBM',
    date: null,
    imageUrl: 'https://api.a0.dev/assets/image?text=IBM%20Cert&aspect=1:1', // Placeholder
    link: null
  },
   {
    name: 'CyberSecurity Internship', // Consider if this is a certificate or experience
    issuer: 'Palo Alto Networks',
    date: null,
    imageUrl: 'https://api.a0.dev/assets/image?text=PaloAlto%20Cert&aspect=1:1', // Placeholder
    link: null
  },
   {
    name: 'Ethical Hacking Essentials',
    issuer: 'EC-Council / CodeRed', // Clarify issuer if needed
    date: null,
    imageUrl: 'https://api.a0.dev/assets/image?text=EHE%20Cert&aspect=1:1', // Placeholder
    link: null
  },
   {
    name: 'CyberSecurity Essentials',
    issuer: 'Cisco',
    date: null,
    imageUrl: 'https://api.a0.dev/assets/image?text=Cisco%20Cert&aspect=1:1', // Placeholder
    link: null
  },
];

// Reusable Animated Card Component (ensure this is defined or imported)
const AnimatedCard = ({ children, index, onPress, disabled }) => {
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

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
       <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={disabled ? 1 : 0.7}>
          {children}
       </TouchableOpacity>
    </Animated.View>
  );
};


export default function CertificatesScreen() {

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomHeader 
        title="Certificates" 
        icon="card-membership" 
        colors={['#F7B733', '#FC4A1A']} 
      />
      
      <View style={styles.content}>
        {certificateData.map((cert, index) => (
          <AnimatedCard 
             key={index} 
             index={index} 
             onPress={() => openLink(cert.link)}
             disabled={!cert.link} // Disable TouchableOpacity if no link
          >
            <View style={styles.certificateItem}>
              <Image
                source={{ uri: cert.imageUrl }}
                style={styles.certificateImage}
              />
              <View style={styles.certificateInfo}>
                <Text style={styles.certificateName}>{cert.name}</Text>
                <Text style={styles.issuer}>{cert.issuer}</Text>
                {cert.date && <Text style={styles.date}>Issued: {cert.date}</Text>}
                {cert.link && <MaterialIcons name="open-in-new" size={18} color="#F7B733" style={styles.linkIcon} />}
              </View>
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
    backgroundColor: '#f0f2f5', // Consistent background
  },
  content: {
    padding: 16,
  },
  cardContainer: { // Container for animation and shadow
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  certificateItem: { // Content layout inside TouchableOpacity
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  certificateImage: {
    width: 70, // Slightly smaller
    height: 70,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#eee', // Placeholder background
  },
  certificateInfo: {
    flex: 1, // Take remaining space
  },
  certificateName: {
    fontSize: 17, // Adjust size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  issuer: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  date: {
    fontSize: 13, // Adjust size
    color: '#888',
    marginTop: 4,
  },
  linkIcon: {
    position: 'absolute', // Position link icon if needed
    right: 0,
    top: 0,
  },
});