import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native'; // Make sure this import is present
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import EducationScreen from "./screens/EducationScreen";
import ExperienceScreen from "./screens/ExperienceScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import GalleryScreen from "./screens/GalleryScreen";
import VideosScreen from "./screens/VideosScreen";
import CertificatesScreen from "./screens/CertificatesScreen";
import SkillsScreen from "./screens/SkillsScreen";
import AdminScreen from "./screens/AdminScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import ContactScreen from "./screens/ContactScreen"; 
import { ThemeProvider } from './utils/ThemeContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Education" component={EducationScreen} />
      <Stack.Screen name="Experience" component={ExperienceScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Videos" component={VideosScreen} />
      <Stack.Screen name="Certificates" component={CertificatesScreen} />
      <Stack.Screen name="Skills" component={SkillsScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} /> 
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider style={styles.container}>
        <Toaster /> {/* Make sure this component is present */}
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});
