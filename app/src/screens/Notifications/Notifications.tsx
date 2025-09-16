import React from 'react';
import { Text, View } from 'react-native';

import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';

function Notifications() {
  const { layout, fonts, variant } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.flex_1, { paddingHorizontal: 10, paddingTop: 0, paddingBottom: 10 }]}>
        <Text style={[fonts.size_24 ?? fonts.size_16, fonts.bold, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>Notifications</Text>
        <Text style={[fonts.size_12, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>Your notifications will appear here.</Text>
      </View>
    </SafeScreen>
  );
}

export default Notifications;

