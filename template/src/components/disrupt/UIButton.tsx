import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export const UIButton: React.FC<Props> = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        {
          backgroundColor: '#FFFFFF',
          paddingVertical: 14,
          paddingHorizontal: 18,
          borderRadius: 12,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text style={[{ color: '#000000', fontWeight: '700', fontSize: 16 }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};





