import './polyfills'; // Import first!
import 'react-native-url-polyfill/auto';

// Try direct import of buffer if needed
import { Buffer as BufferPolyfill } from 'buffer';
if (typeof global.Buffer === 'undefined') {
  global.Buffer = BufferPolyfill;
}

import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use hardcoded values for Expo Snack (in production, use environment variables)
const supabaseUrl = 'https://cocguqwdtasmimjmktlq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY2d1cXdkdGFzbWltam1rdGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Njg5NTEsImV4cCI6MjA2MTM0NDk1MX0.XTidymwaJ31PU1hcDCpEyvKiHzGGh71qK9JqUu6Ao4E';

// Custom storage implementation for React Native
const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return Platform.OS === 'web' 
      ? localStorage.getItem(key)
      : SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    return Platform.OS === 'web'
      ? localStorage.setItem(key, value)
      : SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    return Platform.OS === 'web'
      ? localStorage.removeItem(key)
      : SecureStore.deleteItemAsync(key);
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});