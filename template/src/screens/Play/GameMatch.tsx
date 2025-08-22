import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
// import type { RootScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import PixelButton from '@/components/disrupt/PixelButton';
import { GemIcon } from '@/components/disrupt/PixelIcons';
import { storage, StorageKeys } from '@/storage';
import { connectMatchmaking, joinQueue, onMatchStart, offMatchStart } from '@/services/matchmaking';
import { ImageBackground } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = any;

export default function GameMatch({ route, navigation }: Props) {
  const { gameTitle } = (route?.params || { gameId: 'unknown', gameTitle: 'Game' }) as any;
  const { layout, fonts } = useTheme();
  const [selected, setSelected] = useState<'FREE' | 'GEMS'>('FREE');
  const [stake, setStake] = useState<number>(1); // represents target win amount for CASH; for GEMS, represents 10*stake units
  const [matching, setMatching] = useState<boolean>(false);
  // const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stakes = useMemo(() => [1, 2, 3, 6, 10, 20, 50], []);
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    connectMatchmaking('http://localhost:4000');
    const handler = ({ matchId, seed }: any) => {
      setMatching(false);
      navigation.navigate('unityGame' as never, { gameTitle, mode: 'GEMS', stake, matchId, seed } as never);
    };
    onMatchStart(handler);
    return () => offMatchStart(handler);
  }, [navigation, gameTitle, stake]);

  const startMatch = () => {
    setMatching(true);
    const playerId = storage.getString(StorageKeys.username) || `p_${Date.now()}`;
    joinQueue({ playerId, stake });
  };

  return (
    <SafeScreen>
      <View style={[layout.flex_1, { paddingHorizontal: 16, paddingVertical: 16 }]}> 
        {/* Layout: header/back + banner + tabs at top, controls centered, button at bottom */}
        <View style={{ flex: 1 }}>
          {/* Game banner taller, back button overlaid */}
          <View style={{ borderRadius: 18, height: 260, borderWidth: 1, borderColor: '#222', overflow: 'hidden', backgroundColor: '#151515' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, paddingVertical: 6, paddingHorizontal: 8, backgroundColor: 'rgba(17,17,17,0.85)', borderRadius: 10, borderWidth: 1, borderColor: '#2A2A2A' }}>
              <Text style={{ color: '#FFFFFF' }}>← Back</Text>
            </TouchableOpacity>
            <ImageBackground source={require('@/assets/branding/DisruptP.png')} resizeMode="cover" style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', textShadowColor: '#000', textShadowRadius: 8 }]}>{gameTitle}</Text>
              <Text style={[fonts.size_12, { color: '#EDEDED', marginTop: 4 }]}>Arcade Match</Text>
            </ImageBackground>
          </View>
          <View style={{ height: 16 }} />
          {/* Mode selector: Free | Diamonds (1v1) */}
          <View style={{ flexDirection: 'row', backgroundColor: '#0F0F0F', borderRadius: 12 }}>
            {([
              { key: 'FREE', label: 'Free' },
              { key: 'GEMS', label: 'Diamonds (1v1)' },
            ] as const).map((t) => (
              <TouchableOpacity
                key={t.key}
                onPress={() => setSelected(t.key)}
                style={{ flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12, backgroundColor: selected === t.key ? '#111' : 'transparent' }}
              >
                <Text style={{ color: selected === t.key ? '#00CEC8' : '#5BAEA9', fontWeight: '700' }}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Center controls */}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {/* Win amount selector +/-, center amount, and progress bar */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#BBBBBB', marginBottom: 6, fontWeight: '700' }}>WIN</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setStake((s) => Math.max(1, s - 1))}
                  disabled={selected === 'FREE'}
                  style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 24 }}>−</Text>
                </TouchableOpacity>
                <View style={{ minWidth: 120, alignItems: 'center', justifyContent: 'center' }}>
                  {selected === 'GEMS' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                      <GemIcon size={18} color={'#66E0FF'} />
                      <Text style={{ color: '#FFFFFF', fontSize: 44, fontWeight: '800', marginLeft: 6 }}>{stake}</Text>
                    </View>
                  ) : (
                    <Text style={{ color: '#FFFFFF', fontSize: 44, fontWeight: '800', marginLeft: 6 }}>Free</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => setStake((s) => Math.min(50, s + 1))}
                  disabled={selected === 'FREE'}
                  style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 24 }}>+</Text>
                </TouchableOpacity>
              </View>
              {/* Entry */}
              <View style={{ height: 14 }} />
              {selected !== 'FREE' && (
                <Text style={{ color: '#00E07A', fontWeight: '800' }}>{`${stake} diamonds Entry`}</Text>
              )}
              {/* Progress bar boxes */}
              <View style={{ height: 12 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                {stakes.map((thr) => {
                  const filled = stake >= thr && selected !== 'FREE';
                  return (
                    <View key={thr} style={{ flex: 1, height: 32, marginHorizontal: 4, borderRadius: 6, backgroundColor: filled ? '#0D221E' : '#151515', borderWidth: 2, borderColor: filled ? '#00E07A' : '#222' }} />
                  );
                })}
              </View>
            </View>
          </View>
          {/* Footer: Play button and status */}
          <View>
            <PixelButton title={selected === 'FREE' ? 'Play for Free' : `Play for ${stake} diamonds`} onPress={startMatch} />
            <View style={{ height: 12 }} />
            {matching ? (
              <View style={{ alignItems: 'center', padding: 10 }}>
                <ActivityIndicator color="#00CEC8" />
                <Text style={{ color: '#BBBBBB', marginTop: 10 }}>Finding a player…</Text>
                <Text style={{ color: '#555', marginTop: 4, fontSize: 12 }}>We’ll auto-start if another player joins later.</Text>
              </View>
            ) : (
              <Text style={{ color: '#555', fontSize: 12, textAlign: 'center' }}>Tap play to match with another player. If no one joins in 5s, you’ll be queued and the result will appear in Results.</Text>
            )}
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}


