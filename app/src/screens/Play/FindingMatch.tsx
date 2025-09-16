import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';
import { connectMatchmaking, joinQueue, onMatchStart, offMatchStart } from '@/services/matchmaking';

type Mode = 'FREE' | 'CASH' | 'GEMS';

type Props = {
  route: { params: { gameTitle: string; mode: Mode; stake: number } };
  navigation: any;
};

export default function FindingMatch({ route, navigation }: Props) {
  const { gameTitle, mode, stake } = route.params || { gameTitle: 'Game', mode: 'FREE', stake: 0 };
  const { layout, fonts } = useTheme();
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const s = connectMatchmaking('http://localhost:4000');
    const playerId = storage.getString(StorageKeys.username) || `p_${Date.now()}`;
    joinQueue({ playerId, stake });

    const handler = ({ matchId, seed }: any) => {
      navigation.replace('photonConnect', { gameTitle, mode, stake, matchId, seed });
    };
    onMatchStart(handler);
    return () => offMatchStart(handler);
  }, [navigation, gameTitle, mode, stake]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <SafeScreen>
      <View style={[layout.flex_1, { padding: 16 }]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 6, paddingHorizontal: 8, backgroundColor: '#111', borderRadius: 10, borderWidth: 1, borderColor: '#2A2A2A' }}>
            <Text style={{ color: '#FFFFFF' }}>← Back</Text>
          </TouchableOpacity>
          <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginLeft: 12 }]}>{gameTitle}</Text>
        </View>

        <View style={{ flex: 1, borderRadius: 14, backgroundColor: '#0F0F0F', borderWidth: 1, borderColor: '#222', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color="#00CEC8" />
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 10 }]}>Finding a player…</Text>
          <Text style={[fonts.size_12, { color: '#555', marginTop: 4 }]}>Elapsed: {seconds}s • {mode === 'GEMS' ? `${stake} diamonds` : 'Free'}</Text>
        </View>
      </View>
    </SafeScreen>
  );
}


