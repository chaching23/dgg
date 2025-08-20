import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Polyline, Stop, Text as SvgText } from 'react-native-svg';

type Props = {
  etf: number[];
  winnings: number[];
  etfColor?: string;
  winningsColor?: string;
  withAxis?: boolean;
};

export default function CombinedSparkline({
  etf,
  winnings,
  etfColor = '#00CEC8',
  winningsColor = '#5BAEA9',
  withAxis = true,
}: Props) {
  const width = 320;
  const height = 60;

  const all = [...etf, ...winnings];
  const min = Math.min(...all, 0);
  const max = Math.max(...all, 1);
  const range = Math.max(max - min, 1);

  const toPoints = (data: number[]) =>
    data
      .map((v, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

  const etfPoints = toPoints(etf);
  const winPoints = toPoints(winnings);
  const tickIndexes = withAxis
    ? [0, Math.floor((Math.max(etf.length, winnings.length) - 1) * 0.33), Math.floor((Math.max(etf.length, winnings.length) - 1) * 0.66), Math.max(Math.max(etf.length, winnings.length) - 1, 0)]
    : [];

  return (
    <View style={{ backgroundColor: '#0A0A0A', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 }}>
      <Svg width={width} height={height + (withAxis ? 14 : 0)}>
        <Defs>
          <LinearGradient id="etfGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={etfColor} stopOpacity={0.6} />
            <Stop offset="100%" stopColor={etfColor} stopOpacity={1} />
          </LinearGradient>
          <LinearGradient id="winGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={winningsColor} stopOpacity={0.6} />
            <Stop offset="100%" stopColor={winningsColor} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Polyline points={etfPoints} fill="none" stroke="url(#etfGrad)" strokeWidth={2.5} />
        <Polyline points={winPoints} fill="none" stroke="url(#winGrad)" strokeWidth={2.5} />
        {withAxis &&
          tickIndexes.map((idx, i) => {
            const x = (idx / Math.max(Math.max(etf.length, winnings.length) - 1, 1)) * width;
            const value = ((etf[idx] ?? winnings[idx]) ?? 0) as number;
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


