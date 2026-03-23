import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if(!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.")
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
        getItem: async (key) => SecureStore.getItemAsync(key),
        setItem: async (key, value) => SecureStore.setItemAsync(key, value),
        removeItem: async (key) => SecureStore.deleteItemAsync(key),  
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})