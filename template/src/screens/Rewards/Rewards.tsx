import React from 'react';
import { Text, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import PixelButton from '@/components/disrupt/PixelButton';

export default function Rewards() {
  const { layout, gutters, fonts } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.flex_1, gutters.padding_16]}>
        <Text style={[fonts.size_24, fonts.bold, { color: '#FFFFFF' }]}>Rewards</Text>
        <View style={{ height: 12 }} />
        <Text style={[fonts.size_12, { color: '#BBBBBB' }]}>Complete actions to earn cash and gems</Text>

        <View style={{ height: 20 }} />
        <View style={{ backgroundColor: '#111', borderRadius: 14, padding: 16 }}>
          <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Refer a friend</Text>
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 4 }]}>Get $5 when they play their first game</Text>
          <View style={{ height: 10 }} />
          <PixelButton title="Copy Invite Link" onPress={() => {}} />
        </View>

        <View style={{ height: 12 }} />
        <View style={{ backgroundColor: '#111', borderRadius: 14, padding: 16 }}>
          <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Leave a review</Text>
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 4 }]}>Earn $2 by leaving a review</Text>
          <View style={{ height: 10 }} />
          <PixelButton title="Open App Store" onPress={() => {}} />
        </View>

        <View style={{ height: 12 }} />
        <View style={{ backgroundColor: '#111', borderRadius: 14, padding: 16 }}>
          <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Status</Text>
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 4 }]}>Complete 4/4 to unlock a new deal</Text>
          <View style={{ height: 10 }} />
          <View style={{ height: 12, backgroundColor: '#222', borderRadius: 8 }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#00CEC8', borderRadius: 8 }} />
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}


