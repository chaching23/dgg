import React, { useState } from 'react';
import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  borderRadius?: number;
  height?: number;
  style?: any;
  loading?: boolean;
};

export default function GradientButton({
  title,
  onPress,
  disabled,
  borderRadius = 16,
  height = 52,
  style,
  loading = false,
}: Props) {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const content = (
    <Text style={{
      color: '#000000',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      textAlign: 'center',
      fontSize: 16,
    }}>
      {title}
    </Text>
  );

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onLayout={(e) => setSize(e.nativeEvent.layout)}
      onPress={onPress}
      style={[{
        height,
        borderRadius,
        overflow: 'hidden',
        justifyContent: 'center',
      }, style]}
      activeOpacity={0.8}
    >
      {/* Gradient fill background */}
      {size.width > 0 ? (
        <Svg width={size.width} height={size.height} style={{ position: 'absolute', inset: 0 }}>
          <Defs>
            <LinearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#00CEC8" />
              <Stop offset="100%" stopColor="#CC00CC" />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={size.width} height={size.height} rx={borderRadius} ry={borderRadius} fill="url(#btnGrad)" />
        </Svg>
      ) : null}

      <View style={{ paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', height }}>
        {loading ? <ActivityIndicator color="#000" /> : content}
      </View>
    </TouchableOpacity>
  );
}


