import React from 'react';
import Svg, { Rect } from 'react-native-svg';

type Props = { size?: number; color?: string };

const px = (n: number) => n; // explicit for readability

export function TrophyIcon({ size = 20, color = '#00CEC8' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(3)} y={px(2)} width={px(10)} height={px(2)} fill={color} />
      <Rect x={px(2)} y={px(4)} width={px(2)} height={px(4)} fill={color} />
      <Rect x={px(12)} y={px(4)} width={px(2)} height={px(4)} fill={color} />
      <Rect x={px(4)} y={px(4)} width={px(8)} height={px(5)} fill={color} />
      <Rect x={px(6)} y={px(9)} width={px(4)} height={px(2)} fill={color} />
      <Rect x={px(5)} y={px(11)} width={px(6)} height={px(2)} fill={color} />
    </Svg>
  );
}

export function ListIcon({ size = 20, color = '#00B8FF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {[3, 7, 11].map((y) => (
        <Rect key={y} x={px(3)} y={px(y)} width={px(10)} height={px(2)} fill={color} />
      ))}
      {[3, 7, 11].map((y) => (
        <Rect key={`dot-${y}`} x={px(1)} y={px(y)} width={px(1)} height={px(2)} fill={color} />
      ))}
    </Svg>
  );
}

export function ControllerIcon({ size = 20, color = '#FF0000' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(2)} y={px(7)} width={px(12)} height={px(3)} fill={color} />
      <Rect x={px(4)} y={px(5)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(10)} y={px(5)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(6)} y={px(9)} width={px(4)} height={px(2)} fill={color} />
    </Svg>
  );
}

export function GiftIcon({ size = 20, color = '#A63DFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(2)} y={px(5)} width={px(12)} height={px(8)} fill={color} />
      <Rect x={px(2)} y={px(4)} width={px(12)} height={px(1)} fill={color} />
      <Rect x={px(7)} y={px(4)} width={px(2)} height={px(9)} fill={'#FFD800'} />
    </Svg>
  );
}

export function UserIcon({ size = 20, color = '#FFFFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(6)} y={px(3)} width={px(4)} height={px(4)} fill={color} />
      <Rect x={px(4)} y={px(7)} width={px(8)} height={px(6)} fill={color} />
    </Svg>
  );
}

export function MenuIcon({ size = 20, color = '#00CEC8' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {[3, 7, 11].map((y) => (
        <Rect key={y} x={px(2)} y={px(y)} width={px(12)} height={px(2)} fill={color} />
      ))}
    </Svg>
  );
}

export function GemIcon({ size = 20, color = '#FF3B30' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Ruby shape: top line, slanted shoulders, and base */}
      <Rect x={px(4)} y={px(2)} width={px(8)} height={px(2)} fill={color} />
      <Rect x={px(3)} y={px(4)} width={px(10)} height={px(2)} fill={color} />
      <Rect x={px(2)} y={px(6)} width={px(12)} height={px(2)} fill={color} />
      <Rect x={px(3)} y={px(8)} width={px(10)} height={px(2)} fill={color} />
      <Rect x={px(5)} y={px(10)} width={px(6)} height={px(2)} fill={color} />
    </Svg>
  );
}

export function CashIcon({ size = 20, color = '#00FF5B' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(3)} y={px(4)} width={px(10)} height={px(8)} fill={color} />
      <Rect x={px(5)} y={px(6)} width={px(6)} height={px(4)} fill={'#000000'} />
    </Svg>
  );
}

export function PlusIcon({ size = 18, color = '#FFFFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(7)} y={px(3)} width={px(2)} height={px(10)} fill={color} />
      <Rect x={px(3)} y={px(7)} width={px(10)} height={px(2)} fill={color} />
    </Svg>
  );
}

export function CrownIcon({ size = 20, color = '#00CEC8' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      <Rect x={px(2)} y={px(8)} width={px(12)} height={px(4)} fill={color} />
      <Rect x={px(3)} y={px(6)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(7)} y={px(5)} width={px(2)} height={px(3)} fill={color} />
      <Rect x={px(11)} y={px(6)} width={px(2)} height={px(2)} fill={color} />
    </Svg>
  );
}

export default {
  TrophyIcon,
  ListIcon,
  ControllerIcon,
  GiftIcon,
  UserIcon,
  MenuIcon,
  GemIcon,
  CashIcon,
  PlusIcon,
  CrownIcon,
};


