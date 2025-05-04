// filepath: c:\timepass\Sreeportfolio App\a0-project\screens\AdminLoginScreen.tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';

// Helper function to show notification with fallback
const notify = (type, message) => {
  try {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  } catch (e) {
    // Fallback to Alert if toast fails
    Alert.alert(type === 'success' ? 'Success' : 'Error', message);
  }
};

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Use the specific credentials provided
      const targetEmail = 'admin@sree.com';
      const targetPassword = 'Admin@123';

      if (email.toLowerCase() !== targetEmail) {
        notify('error', 'Invalid admin email.');
        setLoading(false);
        return;
      }
      
      // Attempt login with Supabase using the entered password but expected email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: targetEmail, 
        password: password 
      });

      if (error || !data.user) {
        // Check if the error is due to incorrect password specifically
        if (error && error.message.includes('Invalid login credentials')) {
          notify('error', 'Incorrect admin password.');
        } else {
          notify('error', error?.message || 'Login failed. Please check credentials.');
        }
        setLoading(false);
        return;
      }
      
      // Check if the logged-in user's email matches the required admin email
      if (data.user.email?.toLowerCase() === targetEmail) {
        notify('success', 'Successfully logged in as admin');
        navigation.navigate('Admin');
      } else {
        // Log out if the email doesn't match
        await supabase.auth.signOut();
        notify('error', 'Admin authentication failed.');
      }

    } catch (error) {
      console.error('Login error:', error);
      notify('error', 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CustomHeader 
          title="Admin Login" 
          icon="login" 
          colors={['#6C63FF', '#4834DF']} 
        />
        
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Admin Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Admin Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>
          
          {/* Add hint for demo purposes
          <Text style={styles.hintText}>
            Hint: admin@gmail.com / Admin@123
          </Text> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    // Use boxShadow for web compatibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Keep elevation for native
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    // Use boxShadow for web compatibility
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Keep elevation for native
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#a9a3ff',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hintText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 12,
  }
});