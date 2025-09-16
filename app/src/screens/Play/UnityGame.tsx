import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';
import { connectMatchmaking, finishMatch, onMatchResult, offMatchResult } from '@/services/matchmaking';

type Mode = 'FREE' | 'CASH' | 'GEMS';

type Props = {
  route: { params: { gameTitle: string; mode: Mode; stake: number; matchId?: string; seed?: number } };
  navigation: any;
};

export default function UnityGame({ route, navigation }: Props) {
  const { gameTitle, mode, stake, matchId, seed } = route.params || { gameTitle: 'Game', mode: 'FREE', stake: 0 };
  const { layout, fonts } = useTheme();

  // Placeholder: when hooked to Unity, messages will drive finish()
  const sendToUnity = () => {
    finish('WIN');
  };


  useEffect(() => {
    connectMatchmaking('http://localhost:4000');
    const handleResult = (_payload: any) => {
      const parent = navigation.getParent?.();
      parent?.navigate?.('Results');
    };
    onMatchResult(handleResult);
    return () => offMatchResult(handleResult);
  }, [navigation]);

  const finish = (result: 'WIN' | 'LOSS') => {
    if (matchId) finishMatch({ matchId, score: result === 'WIN' ? 1 : 0 });
    try {
      const raw = storage.getString(StorageKeys.walletHistory) || '[]';
      const history = JSON.parse(raw) as any[];

      if (mode === 'GEMS') {
        const delta = (Math.abs(stake) * 10) * (result === 'WIN' ? 1 : -1);
        const currentGems = Number(storage.getNumber(StorageKeys.walletGems as any) || 0);
        storage.set(StorageKeys.walletGems, currentGems + delta);
        history.unshift({ id: String(Date.now()), game: gameTitle, amountGems: delta });
      } else {
        history.unshift({ id: String(Date.now()), game: gameTitle, amountGems: 0 });
      }

      storage.set(StorageKeys.walletHistory, JSON.stringify(history).slice(0, 4000));
    } catch {}

    const parent = navigation.getParent?.();
    parent?.navigate?.('Results');
  };

  return (
    <SafeScreen>
      <View style={[layout.flex_1, { padding: 16 }]}> 
        <View style={{ flex: 1, borderRadius: 14, backgroundColor: '#0F0F0F', borderWidth: 1, borderColor: '#222', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>{gameTitle}</Text>
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 6 }]}>Unity game placeholder</Text>
          <Text style={[fonts.size_12, { color: '#7C7C7C', marginTop: 2 }]}>Mode: {mode} {mode === 'GEMS' ? `${stake * 10} gems` : ''}</Text>
          {matchId ? <Text style={[fonts.size_12, { color: '#555', marginTop: 4 }]}>Match: {matchId.slice(-6)} • Seed: {String(seed ?? '')}</Text> : null}
        </View>

        <View style={{ height: 12 }} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={sendToUnity} style={{ flex: 1, backgroundColor: '#0E251F', paddingVertical: 14, borderRadius: 10, borderWidth: 1, borderColor: '#00E07A', marginRight: 8, alignItems: 'center' }}>
            <Text style={{ color: '#00E07A', fontWeight: '800' }}>Start in Unity</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => finish('WIN')} style={{ flex: 1, backgroundColor: '#0E251F', paddingVertical: 14, borderRadius: 10, borderWidth: 1, borderColor: '#00E07A', marginLeft: 8, alignItems: 'center' }}>
            <Text style={{ color: '#00E07A', fontWeight: '800' }}>Simulate Win</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeScreen>
  );
}




