import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const StorageKeys = {
  authToken: 'auth.token',
  walletBalance: 'wallet.balance',
  walletGems: 'wallet.gems',
  walletHistory: 'wallet.history',
  winsCount: 'profile.wins',
  username: 'profile.username',
  gamesPlayed: 'profile.gamesPlayed',
  biggestPrize: 'profile.biggestPrize',
  preferredEtf: 'invest.preferredEtf',
  etfPoolBalance: 'invest.etf.poolBalance',
  etfHistory: 'invest.etf.history',
  winningsHistory: 'wallet.winningsHistory',
} as const;

