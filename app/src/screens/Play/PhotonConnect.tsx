import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';
import { PHOTON_APP_ID, PHOTON_REGION, buildPhotonRoomName, buildPhotonUserId } from '@/services/photon';

type Mode = 'FREE' | 'CASH' | 'GEMS';

type Props = {
  route: { params: { gameTitle: string; mode: Mode; stake: number; matchId?: string; seed?: number } };
  navigation: any;
};

export default function PhotonConnect({ route, navigation }: Props) {
  const { gameTitle, mode, stake, matchId, seed } = route.params || { gameTitle: 'Game', mode: 'FREE', stake: 0 };
  const { layout, fonts } = useTheme();
  const [status, setStatus] = useState<string>('Starting Unity…');
  const connectedRef = useRef(false);

  const userId = useMemo(() => buildPhotonUserId(storage.getString(StorageKeys.username) || undefined), []);
  const room = useMemo(() => buildPhotonRoomName(matchId), [matchId]);

  // Placeholder flow until Unity is integrated on iOS
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!connectedRef.current) {
        connectedRef.current = true;
        navigation.replace('unityGame', { gameTitle, mode, stake, matchId, seed });
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [navigation, gameTitle, mode, stake, matchId, seed]);

  useEffect(() => {
    setStatus('Connecting to Photon…');
  }, [room, userId]);

  return (
    <SafeScreen>
      <View style={[layout.flex_1, { padding: 16 }]}> 
        <View style={{ flex: 1, borderRadius: 14, backgroundColor: '#0F0F0F', borderWidth: 1, borderColor: '#222', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[fonts.size_12, { color: '#BBBBBB' }]}>Unity loading placeholder…</Text>
        </View>
        <View style={{ height: 12 }} />
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator color="#00CEC8" />
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 8 }]}>{status}</Text>
          <Text style={[fonts.size_12, { color: '#7C7C7C', marginTop: 4 }]}>Room: {room} • User: {userId}</Text>
        </View>
      </View>
    </SafeScreen>
  );
}


