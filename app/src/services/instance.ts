// Supabase client for Disrupt app
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://dhkfkddclnoriilgbnkx.supabase.co';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoa2ZrZGRjbG5vcmlpbGdibmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzMwMTIsImV4cCI6MjA3MDUwOTAxMn0.YxjGZb15YahcHyrz03L41d6GReWSao6xDxelUNyBdHA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function resolveEmailIfUsername(identifier: string): Promise<string> {
  if (identifier.includes('@')) return identifier;
  try {
    const { data } = await supabase.rpc('get_email_by_username', { p_username: identifier });
    return (data as string) || identifier;
  } catch {
    return identifier;
  }
}
import ky from 'ky';
import { storage, StorageKeys } from '@/storage';

const DEFAULT_PUBLIC_API = 'https://jsonplaceholder.typicode.com';
const apiBase = (process.env.API_URL ?? DEFAULT_PUBLIC_API).replace(/\/$/, '');
const prefixUrl = `${apiBase}/`;

export const instance = ky.extend({
  headers: {
    Accept: 'application/json',
  },
  prefixUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = storage.getString(StorageKeys.authToken);
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
