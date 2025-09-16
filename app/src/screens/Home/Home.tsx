import React, { useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SafeScreen } from '@/components/templates';
import VideoPreview from '@/components/disrupt/VideoPreview';
import { GAMES } from '@/constants/games';
import { useTheme } from '@/theme';

type FeatureBox = {
  id: string;
  title: string;
  subtitle?: string;
  color: string;
  size: 'normal' | 'tall';
};

const FEATURES: FeatureBox[] = [
  { id: 'alert', title: 'ALERT', color: '#F59E0B', size: 'normal' },
  { id: 'avatar', title: 'AVATAR', color: '#3B82F6', size: 'tall' },
  { id: 'badge', title: 'BADGE', color: '#22C55E', size: 'normal' },
  { id: 'box', title: 'BOX', color: '#EC4899', size: 'normal' },
  { id: 'button', title: 'BUTTON', color: '#06B6D4', size: 'tall' },
  { id: 'center', title: 'CENTER', color: '#F59E0B', size: 'normal' },
  { id: 'checkbox', title: 'CHECKBOX', color: '#EF4444', size: 'normal' },
  { id: 'divider', title: 'DIVIDER', color: '#A855F7', size: 'tall' },
  { id: 'fab', title: 'FAB', color: '#22C55E', size: 'normal' },
  { id: 'form', title: 'FORM', color: '#3B82F6', size: 'normal' },
  { id: 'icon', title: 'ICON', color: '#EC4899', size: 'tall' },
  { id: 'toast', title: 'TOAST', color: '#06B6D4', size: 'normal' },
];

function Home() {
  const { fonts, borders, layout, variant } = useTheme();
  const navigation = useNavigation();

  const columns = useMemo(() => {
    const left: FeatureBox[] = [];
    const right: FeatureBox[] = [];
    let leftHeight = 0;
    let rightHeight = 0;
    const getHeight = (f: FeatureBox) => (f.size === 'tall' ? 160 : 120) + 20; // include vertical margins (10 top + 10 bottom)
    for (const f of FEATURES) {
      if (leftHeight <= rightHeight) {
        left.push(f);
        leftHeight += getHeight(f);
      } else {
        right.push(f);
        rightHeight += getHeight(f);
      }
    }
    return { left, right };
  }, []);

  // Compact, edge-to-edge grid with no gaps

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}>
        <View style={[layout.row, { paddingHorizontal: 10 }]}>
          <View style={{ width: '50%', paddingHorizontal: 10 }}>
            {GAMES.slice(0, 4).map((game, idx) => {
              const feature = FEATURES[idx % FEATURES.length];
              const height = feature.size === 'tall' ? 160 : 160;
              return (
                <TouchableOpacity
                  key={game.id}
                  activeOpacity={0.9}
                  style={[
                    borders.rounded_16,
                    styles.shadow,
                    {
                      height,
                      backgroundColor: '#0F0F0F',
                      borderWidth: 0,
                      padding: 10,
                      marginVertical: 10,
                    },
                  ]}
                  onPress={() => navigation.navigate('gameMatch' as never, { gameId: game.id, gameTitle: game.title } as never)}
                >
                  <View style={{ borderRadius: 12, overflow: 'hidden', flex: 1 }}>
                    <VideoPreview source={game.previewVideo} style={{ flex: 1, borderRadius: 12 }} />
                  </View>
                  <View style={{ position: 'absolute', left: 14, bottom: 12 }}>
                    <Text style={[fonts.size_16 ?? fonts.size_12, fonts.bold, { color: '#FFFFFF' }]}>{game.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ width: '50%', paddingHorizontal: 10 }}>
            {GAMES.slice(0, 4).map((game, idx) => {
              const feature = FEATURES[(idx + 1) % FEATURES.length];
              const height = feature.size === 'tall' ? 160 : 160;
              return (
                <TouchableOpacity
                  key={game.id + '_r'}
                  activeOpacity={0.9}
                  style={[
                    borders.rounded_16,
                    styles.shadow,
                    {
                      height,
                      backgroundColor: '#0F0F0F',
                      borderWidth: 0,
                      padding: 10,
                      marginVertical: 10,
                    },
                  ]}
                  onPress={() => navigation.navigate('gameMatch' as never, { gameId: game.id, gameTitle: game.title } as never)}
                >
                  <View style={{ borderRadius: 12, overflow: 'hidden', flex: 1 }}>
                    <VideoPreview source={game.previewVideo} style={{ flex: 1, borderRadius: 12 }} />
                  </View>
                  <View style={{ position: 'absolute', left: 14, bottom: 12 }}>
                    <Text style={[fonts.size_16 ?? fonts.size_12, fonts.bold, { color: '#FFFFFF' }]}>{game.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
});

export default Home;

