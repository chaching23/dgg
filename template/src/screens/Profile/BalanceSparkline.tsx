import React from 'react';
import { View } from 'react-native';
import Svg, { LinearGradient, Defs, Stop, Polyline, Polygon, Text as SvgText } from 'react-native-svg';

type Props = { data: number[]; color?: string; showShadow?: boolean; withAxis?: boolean };

export default function BalanceSparkline({ data, color = '#00CEC8', showShadow = true, withAxis = true }: Props) {
  const width = 320;
  const height = 60;
  const min = Math.min(...data, 0);
  const max = Math.max(...data, 1);
  const range = Math.max(max - min, 1);
  const points = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `${points} ${width},${height} 0,${height}`;
  const tickIndexes = withAxis ? [0, Math.floor((data.length - 1) * 0.33), Math.floor((data.length - 1) * 0.66), Math.max(data.length - 1, 0)] : [];
  return (
    <View style={{ backgroundColor: '#0A0A0A', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 }}>
      <Svg width={width} height={height + (withAxis ? 14 : 0)}>
        <Defs>
          <LinearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <Stop offset="100%" stopColor={color} stopOpacity={1} />
          </LinearGradient>
          <LinearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <Stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </LinearGradient>
        </Defs>
        {showShadow && <Polygon points={areaPoints} fill="url(#area)" />}
        <Polyline points={points} fill="none" stroke="url(#spark)" strokeWidth={2.5} />
        {withAxis && tickIndexes.map((idx, i) => {
          const x = (idx / Math.max(data.length - 1, 1)) * width;
          const value = data[idx] ?? 0;
          return (
            <SvgText key={i} x={x} y={height + 12} fill="#5BAEA9" fontSize="10" textAnchor={i === 0 ? 'start' : i === tickIndexes.length - 1 ? 'end' : 'middle'}>
              {value.toFixed(0)}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}


