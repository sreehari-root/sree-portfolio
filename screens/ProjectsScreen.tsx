import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // Added FontAwesome5
// Remove LinearGradient if not used directly here
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

// Replace with your actual project data
const projectsData = [
  {
    title: 'PersonalVault',
    description: 'Used to store the personal and secure information.',
    technologies: [], // Add technologies used if known
    imageUrl: 'https://api.a0.dev/assets/image?text=Vault%20Icon&aspect=16:9', // Placeholder image
    link: null // Add GitHub/Live link if available
  },
  {
    title: 'MAYA Ai assistance',
    description: 'Developed using python which will help in mini tasks and research.',
    technologies: ['Python'],
    imageUrl: 'https://api.a0.dev/assets/image?text=AI%20Assistant&aspect=16:9', // Placeholder image
    link: null 
  },
  {
    title: 'Portfolio website',
    description: 'Using HTML CSS JS to create and to get data from it used telegram bot token.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Telegram Bot API'],
    imageUrl: 'https://api.a0.dev/assets/image?text=Portfolio%20Website&aspect=16:9', // Placeholder image
    link: null // Add link if available
  },
  {
    title: 'Telegram chatbot',
    description: 'Developed a chatbot which helps in explaining tasks and provide the information using the gemini API.',
    technologies: ['Python', 'Telegram Bot API', 'Gemini API'], // Assuming Python
    imageUrl: 'https://api.a0.dev/assets/image?text=Chatbot&aspect=16:9', // Placeholder image
    link: null
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

export default function ProjectsScreen() {

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomHeader 
        title="Projects" 
        icon="code" 
        colors={['#C471ED', '#F64F59']} // Example colors
      />
      
      <View style={styles.content}>
        {projectsData.map((project, index) => (
          <AnimatedCard key={index} index={index}>
            <Image source={{ uri: project.imageUrl }} style={styles.projectImage} />
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              
              {project.technologies && project.technologies.length > 0 && (
                <View style={styles.techContainer}>
                  {project.technologies.map((tech, i) => (
                    <View key={i} style={styles.techTag}>
                      <Text style={styles.techText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              )}

              {project.link && (
                <TouchableOpacity style={styles.linkButton} onPress={() => openLink(project.link)}>
                   <FontAwesome5 name="github" size={16} color="#C471ED" style={styles.linkIcon} /> 
                   {/* Or use 'link' icon */}
                  <Text style={styles.linkText}>View Project / Code</Text>
                </TouchableOpacity>
              )}
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
    backgroundColor: '#f0f2f5',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 25, // More space between project cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Slightly larger shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden', // Clip image corners
  },
  projectImage: {
    width: '100%',
    height: 180, // Adjust height as needed
    backgroundColor: '#eee', // Placeholder background
  },
  projectInfo: {
    padding: 18,
  },
  projectTitle: {
    fontSize: 20, // Larger title
    fontWeight: 'bold',
    color: '#C471ED', // Theme color
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
    marginBottom: 15,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15, // Space before link button
  },
  techTag: {
    backgroundColor: 'rgba(196, 113, 237, 0.1)', // Theme color background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(196, 113, 237, 0.3)',
  },
  techText: {
    color: '#a044c5', // Darker theme color
    fontSize: 12,
    fontWeight: '500',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start', // Align button to the left
  },
  linkIcon: {
    marginRight: 8,
  },
  linkText: {
    fontSize: 15,
    color: '#C471ED', // Theme color
    fontWeight: '600',
  },
});