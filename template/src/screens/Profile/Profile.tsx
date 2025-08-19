import React from 'react';
import { Image, Text, View } from 'react-native';
import { ControllerIcon, TrophyIcon } from '@/components/disrupt/PixelIcons';

import { SafeScreen } from '@/components/templates';
// import { supabase } from '@/services/instance';
// import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';
// Sparkline used inside Tabs
import Tabs from './Tabs';

function Profile() {
  const { layout, fonts, variant } = useTheme();

  // logout handled via drawer; function removed
  return (
    <SafeScreen>
      <View style={[layout.flex_1, { paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('@/assets/branding/DisruptP.png')} style={{ width: 56, height: 56, borderRadius: 8, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>@{storage.getString(StorageKeys.username) || 'guest'}</Text>
            <Text style={[fonts.size_12, { color: '#BBBBBB' }]}>Player</Text>
          </View>
          {/* Battery progress with 4 segments */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            {Array.from({ length: 4 }).map((_, i) => {
              const wins = storage.getNumber(StorageKeys.winsCount as any) || 0;
              const thresholds = [10, 100, 1000, 5000];
              const filled = wins >= thresholds[i];
              const color = filled ? '#00CE34' : i === 0 ? '#FF3B30' : i === 1 ? '#FF9500' : i === 2 ? '#FFD60A' : '#00CEC8';
              return <View key={i} style={{ width: 12, height: 24, backgroundColor: color, borderWidth: 1, borderColor: '#333' }} />;
            })}
          </View>
        </View>
        <View style={{ height: 16 }} />

        <View style={{ flexDirection: 'row' }}>
          {/* Games played */}
          <View style={{ flex: 1, backgroundColor: '#111', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 12, marginRight: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ControllerIcon size={16} />
              <Text style={[fonts.size_12, { color: '#BBBBBB', marginLeft: 6 }]}>Games</Text>
            </View>
            <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginTop: 4 }]}>{storage.getNumber(StorageKeys.gamesPlayed as any) || 0}</Text>
          </View>

          {/* Wins */}
          <View style={{ flex: 1, backgroundColor: '#111', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 12, marginRight: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TrophyIcon size={16} />
              <Text style={[fonts.size_12, { color: '#BBBBBB', marginLeft: 6 }]}>Wins</Text>
            </View>
            <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginTop: 4 }]}>{storage.getNumber(StorageKeys.winsCount as any) || 0}</Text>
          </View>

          {/* Biggest prize */}
          <View style={{ flex: 1, backgroundColor: '#111', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[fonts.size_12, { color: '#BBBBBB' }]}>💲 Biggest</Text>
            </View>
            <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginTop: 4 }]}>${(storage.getNumber(StorageKeys.biggestPrize as any) || 0).toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 16 }} />
        {/* Tabbed graphs */}
        <Tabs />
        <View style={{ height: 16 }} />
        <Text style={[fonts.size_16, fonts.bold, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>High Scores</Text>
        {[{ game: 'Puzzle Dash', score: 1200 }, { game: 'Aim Trainer', score: 980 }, { game: 'Memory Flip', score: 910 }].map((row) => (
          <View key={row.game} style={{ backgroundColor: '#111', borderRadius: 12, padding: 12, marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[fonts.size_12, { color: '#FFFFFF' }]}>{row.game}</Text>
            <Text style={[fonts.size_12, fonts.bold, { color: '#FFFFFF' }]}>{row.score}</Text>
          </View>
        ))}

        <View style={{ height: 16 }} />
      </View>
    </SafeScreen>
  );
}

export default Profile;

