import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const StorageKeys = {
  authToken: 'auth.token',
} as const;

