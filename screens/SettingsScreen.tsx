import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

// Settings item component
const SettingsItem = ({ icon, title, description, children, last = false }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.settingsItem, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <View style={styles.settingsIcon}>
        <MaterialIcons name={icon} size={24} color={colors.accent} />
      </View>
      <View style={styles.settingsContent}>
        <Text style={[styles.settingsTitle, { color: colors.text }]}>{title}</Text>
        {description && <Text style={[styles.settingsDescription, { color: colors.subText }]}>{description}</Text>}
      </View>
      <View style={styles.settingsAction}>
        {children}
      </View>
    </View>
  );
};

// Animated card component
const AnimatedCard = ({ children, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    backgroundColor: colors.card,
  }));

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 400 }));
  }, []);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, colors, setThemeMode } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <CustomHeader 
        title="Settings" 
        icon="settings" 
        colors={['#7F00FF', '#E100FF']} 
      />
      
      <View style={styles.content}>
        <AnimatedCard index={0}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          <SettingsItem 
            icon="dark-mode" 
            title="Dark Mode" 
            description="Enable dark theme for the app"
          >
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#50E3C280' }}
              thumbColor={isDarkMode ? '#50E3C2' : '#f4f3f4'}
            />
          </SettingsItem>
          
          <SettingsItem 
            icon="brightness-6" 
            title="Theme Mode" 
            description="Choose how theme is applied"
            last
          >
            <View style={styles.themeModeButtons}>
              <TouchableOpacity 
                style={[
                  styles.themeModeButton, 
                  { backgroundColor: colors.border }
                ]} 
                onPress={() => setThemeMode('system')}
              >
                <Text style={{ color: colors.text }}>System</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.themeModeButton, 
                  { backgroundColor: colors.border }
                ]} 
                onPress={() => setThemeMode('light')}
              >
                <Text style={{ color: colors.text }}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.themeModeButton, 
                  { backgroundColor: colors.border }
                ]} 
                onPress={() => setThemeMode('dark')}
              >
                <Text style={{ color: colors.text }}>Dark</Text>
              </TouchableOpacity>
            </View>
          </SettingsItem>
        </AnimatedCard>
        
        <AnimatedCard index={1}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <SettingsItem 
            icon="info-outline" 
            title="Version" 
            description="1.0.0"
          >
            <MaterialIcons name="chevron-right" size={24} color={colors.subText} />
          </SettingsItem>
          <SettingsItem 
            icon="code" 
            title="Developer" 
            description="K S Sreehari"
            last
          >
            <MaterialIcons name="chevron-right" size={24} color={colors.subText} />
          </SettingsItem>
        </AnimatedCard>
        
        <AnimatedCard index={2}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact</Text>
          <SettingsItem 
            icon="email" 
            title="Send Feedback" 
            description="Help me improve the app"
            last
          >
            <MaterialIcons name="chevron-right" size={24} color={colors.subText} />
          </SettingsItem>
        </AnimatedCard>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  settingsIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsDescription: {
    fontSize: 14,
    marginTop: 3,
  },
  settingsAction: {
    justifyContent: 'center',
  },
  themeModeButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  themeModeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 3,
    borderRadius: 5,
  }
});