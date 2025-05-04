import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TextInput, 
  TouchableOpacity, ActivityIndicator, Linking, Alert
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import { useTheme } from '../utils/ThemeContext'; // Add this import

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme(); // Get colors from theme context

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your message');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Insert data into Supabase contact_messages table
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { name, email, subject, message }
        ]);
        
      if (error) throw error;
      
      Alert.alert('Success', 'Message sent successfully!');
      
      // Clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const openDirectContact = (type) => {
    switch (type) {
      case 'email':
        Linking.openURL('mailto:sreeharisharma087@gmail.com');
        break;
      case 'phone':
        Linking.openURL('tel:+916361619336');
        break;
      case 'linkedin':
        Linking.openURL('https://linkedin.com/in/k-s-sree-hari-sharma-08a766213');
        break;
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <CustomHeader 
        title="Contact Me" 
        icon="email" 
        colors={['#FF8842', '#FF5555']} 
      />
      
      <View style={styles.content}>
        {/* Direct Contact Options */}
        <View style={[styles.directContact, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Get in Touch</Text>
          
          <TouchableOpacity 
            style={styles.contactMethod}
            onPress={() => openDirectContact('email')}
          >
            <View style={[styles.iconWrapper, { backgroundColor: '#FF8842' }]}>
              <MaterialIcons name="email" size={24} color="white" />
            </View>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.subText }]}>Email</Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>sreeharisharma087@gmail.com</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.subText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactMethod}
            onPress={() => openDirectContact('phone')}
          >
            <View style={[styles.iconWrapper, { backgroundColor: '#5C6BC0' }]}>
              <MaterialIcons name="phone" size={24} color="white" />
            </View>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.subText }]}>Phone</Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>+91 6361619336</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.subText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.contactMethod, { borderBottomWidth: 0 }]}
            onPress={() => openDirectContact('linkedin')}
          >
            <View style={[styles.iconWrapper, { backgroundColor: '#0077B5' }]}>
              <MaterialIcons name="person" size={24} color="white" />
            </View>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.subText }]}>LinkedIn</Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>Connect with me</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.subText} />
          </TouchableOpacity>
        </View>
        
        {/* Contact Form */}
        <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Send Message</Text>
          
          <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
            <MaterialIcons name="person" size={20} color="#FF8842" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Your Name"
              placeholderTextColor={colors.subText}
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
            <MaterialIcons name="email" size={20} color="#FF8842" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Your Email"
              placeholderTextColor={colors.subText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
            <MaterialIcons name="subject" size={20} color="#FF8842" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Subject (Optional)"
              placeholderTextColor={colors.subText}
              value={subject}
              onChangeText={setSubject}
            />
          </View>
          
          <View style={[styles.messageContainer, { backgroundColor: colors.background }]}>
            <TextInput
              style={[styles.messageInput, { color: colors.text }]}
              placeholder="Your Message"
              placeholderTextColor={colors.subText}
              value={message}
              onChangeText={setMessage}
              multiline
              textAlignVertical="top"
              numberOfLines={6}
            />
          </View>
          
          <TouchableOpacity
            style={[styles.submitButton, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <MaterialIcons name="send" size={20} color="white" style={styles.submitIcon} />
                <Text style={styles.submitText}>Send Message</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
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
  directContact: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDetails: {
    flex: 1,
    marginLeft: 15,
  },
  contactLabel: {
    fontSize: 13,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  formContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
  },
  messageContainer: {
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
  },
  messageInput: {
    fontSize: 15,
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: '#FF8842',
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitIcon: {
    marginRight: 8,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});