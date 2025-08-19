import React, { useCallback, useMemo, useState } from 'react';
import { TextInput, View, TextInputProps, LayoutChangeEvent } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

type GradientInputProps = TextInputProps & {
  containerStyle?: any;
  borderRadius?: number;
};

export function GradientInput({ containerStyle, borderRadius = 16, style, placeholderTextColor = '#BBBBBB', ...props }: GradientInputProps) {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.width || height !== size.height) setSize({ width, height });
  }, [size.width, size.height]);

  const radii = useMemo(() => ({ rx: borderRadius, ry: borderRadius }), [borderRadius]);

  return (
    <View style={[{ position: 'relative', width: '100%' }, containerStyle]} onLayout={onLayout}>
      <View style={{ backgroundColor: '#0F0F0F', borderRadius, paddingVertical: 16, paddingHorizontal: 18 }}>
        <TextInput
          {...props}
          placeholderTextColor={placeholderTextColor}
          style={[{ color: '#FFFFFF' }, style]}
        />
      </View>
      {/* Render border on top to avoid being hidden by the filled background */}
      {size.width > 0 && size.height > 0 ? (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
          <Svg width={size.width} height={size.height}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#00CEC8" />
                <Stop offset="100%" stopColor="#CC00CC" />
              </LinearGradient>
            </Defs>
            <Rect
              x={1}
              y={1}
              width={size.width - 2}
              height={size.height - 2}
              rx={radii.rx}
              ry={radii.ry}
              fill="transparent"
              stroke="url(#grad)"
              strokeWidth={2}
            />
          </Svg>
        </View>
      ) : null}
    </View>
  );
}

export default GradientInput;


