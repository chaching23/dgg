import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ControllerIcon, TrophyIcon, DollarIcon } from '@/components/disrupt/PixelIcons';

import { SafeScreen } from '@/components/templates';
// import { supabase } from '@/services/instance';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';
import { Paths } from '@/navigation/paths';
// Sparkline used inside Tabs
// import Tabs from './Tabs';

function Profile() {
  const { layout, fonts, variant } = useTheme();
  const navigation = useNavigation();

  // logout handled via drawer; function removed
  return (
    <SafeScreen>
      <View style={[layout.flex_1, { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }]}>
        {/* Header with large shaded background as profile image */}
        <View style={{ borderRadius: 18, height: 240, borderWidth: 1, borderColor: '#222', overflow: 'hidden' }}>
          <ImageBackground source={require('@/assets/branding/DisruptP.png')} resizeMode="cover" style={{ flex: 1 }}>
            {/* Shade overlay */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)' }} />
            {/* Square avatar overlay */}
            <Image source={require('@/assets/branding/DisruptP.png')} style={{ position: 'absolute', left: 16, bottom: 16 + 44, width: 120, height: 120, borderRadius: 16, borderWidth: 1, borderColor: '#2A2A2A' }} />
            {/* Actions */}
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
              <TouchableOpacity style={{ paddingVertical: 6, paddingHorizontal: 8, backgroundColor: 'rgba(17,17,17,0.85)', borderRadius: 10, borderWidth: 1, borderColor: '#2A2A2A' }}>
                <Text style={{ color: '#FFFFFF' }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate(Paths.Settings as never)} style={{ paddingVertical: 6, paddingHorizontal: 8, backgroundColor: 'rgba(17,17,17,0.85)', borderRadius: 10, borderWidth: 1, borderColor: '#2A2A2A' }}>
                <Text style={{ color: '#FFFFFF' }}>Settings</Text>
              </TouchableOpacity>
            </View>
            {/* Text info */}
            <View style={{ position: 'absolute', left: 16 + 120 + 12, bottom: 16 + 44 }}>
              <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>@{storage.getString(StorageKeys.username) || 'guest'}</Text>
              <Text style={[fonts.size_12, { color: '#EDEDED', marginTop: 4 }]}>Player</Text>
            </View>
          </ImageBackground>
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

          {/* Biggest prize (pixel Dollar icon to match Trophy) */}
          <View style={{ flex: 1, backgroundColor: '#111', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DollarIcon size={16} color={'#00E07A'} />
              <Text style={[fonts.size_12, { color: '#BBBBBB', marginLeft: 6 }]}>Biggest</Text>
            </View>
            <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginTop: 4 }]}>${(storage.getNumber(StorageKeys.biggestPrize as any) || 0).toFixed(2)}</Text>
          </View>
        </View>

        {/* Graphs removed */}
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

