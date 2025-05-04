import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cocguqwdtasmimjmktlq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY2d1cXdkdGFzbWltam1rdGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Njg5NTEsImV4cCI6MjA2MTM0NDk1MX0.XTidymwaJ31PU1hcDCpEyvKiHzGGh71qK9JqUu6Ao4E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});