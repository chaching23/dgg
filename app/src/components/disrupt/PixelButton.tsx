import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  height?: number;
};

export default function PixelButton({ title, onPress, color = '#00CEC8', textColor = '#000000', disabled, height = 48 }: Props) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8} style={{ height }}>
      {/* Pixel border */}
      <View style={{ position: 'absolute', inset: 0, borderWidth: 2, borderColor: '#000000' }} />
      {/* Fill */}
      <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: textColor, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}


