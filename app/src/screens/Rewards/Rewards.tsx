import React, { useMemo, useState, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import PixelButton from '@/components/disrupt/PixelButton';
import { DollarIcon, GemIcon } from '@/components/disrupt/PixelIcons';

export default function Rewards() {
  const { layout, gutters, fonts } = useTheme();
  const [completedCount, setCompletedCount] = useState<number>(0);
  const incrementStatus = useCallback(() => {
    setCompletedCount((current) => Math.min(4, current + 1));
  }, []);
  const data = useMemo(() => (
    [
      { key: 'status', type: 'status' as const },
      { key: 'refer', type: 'refer' as const },
      { key: 'review', type: 'review' as const },
      { key: 'recurring', type: 'recurring' as const },
      { key: 'limited', type: 'limited' as const },
    ]
  ), []);

  return (
    <SafeScreen>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        contentContainerStyle={[gutters.padding_16]}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'status':
              return (
                <View style={{ marginBottom: 14, backgroundColor: '#111', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#222' }}>
                  <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Status</Text>
                  <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 4 }]}>{`${completedCount}/4`}</Text>
                  <View style={{ height: 10 }} />
                  <View style={{ height: 12, backgroundColor: '#222', borderRadius: 8, overflow: 'hidden' }}>
                    <View style={{ width: `${completedCount * 25}%`, height: '100%', backgroundColor: '#00CEC8' }} />
                  </View>
                </View>
              );
            case 'refer':
              return (
                <View style={{ marginBottom: 14, backgroundColor: '#111', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#222' }}>
                  <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Refer a friend</Text>
                  <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 4 }]}>Get $5 when they play their first game</Text>
                  <View style={{ height: 10 }} />
                  <PixelButton title="Copy Invite Link" onPress={incrementStatus} />
                </View>
              );
            case 'review':
              return (
                <View style={{ marginBottom: 18, backgroundColor: '#111', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#222' }}>
                  <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Leave a review</Text>
                  <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 4 }]}>Earn $2 by leaving a review</Text>
                  <View style={{ height: 10 }} />
                  <PixelButton title="Open App Store" onPress={incrementStatus} />
                </View>
              );
            case 'recurring':
              return (
                <View style={{ marginBottom: 18, backgroundColor: '#111', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#222' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <GemIcon size={18} />
                    <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginLeft: 8 }]}>Recurring Offers</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{ flex: 1, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#222' }}>
                      <DollarIcon size={18} />
                      <Text style={[fonts.size_14, fonts.bold, { color: '#FFFFFF', marginLeft: 8 }]}>+$5 bonus</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#222' }}>
                      <GemIcon size={18} />
                      <Text style={[fonts.size_14, fonts.bold, { color: '#FFFFFF', marginLeft: 8 }]}>+100 red diamond</Text>
                    </View>
                  </View>
                  <View style={{ height: 10 }} />
                  <PixelButton title="Only $15" onPress={incrementStatus} />
                </View>
              );
            case 'limited':
              return (
                <View style={{ marginBottom: 18, backgroundColor: '#111', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#222' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <DollarIcon size={18} />
                    <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginLeft: 8 }]}>Limited Time Offers</Text>
                  </View>
                  {/* Offer 1 */}
                  <View style={{ backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#222' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <DollarIcon size={18} />
                      <Text style={[fonts.size_14, fonts.bold, { color: '#FFFFFF', marginLeft: 8 }]}>$50 gets you $10 free bonus</Text>
                    </View>
                    <View style={{ height: 10 }} />
                    <PixelButton title="Only $50" onPress={incrementStatus} />
                  </View>
                  <View style={{ height: 10 }} />
                  {/* Offer 2 */}
                  <View style={{ backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#222' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <DollarIcon size={18} />
                      <Text style={[fonts.size_14, fonts.bold, { color: '#FFFFFF', marginLeft: 8 }]}>$200 get $50 free bonus</Text>
                    </View>
                    <View style={{ height: 10 }} />
                    <PixelButton title="Only $200" onPress={incrementStatus} />
                  </View>
                </View>
              );
            default:
              return null;
          }
        }}
      />
    </SafeScreen>
  );
}


