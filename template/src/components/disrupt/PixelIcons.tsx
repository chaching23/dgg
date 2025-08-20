import React from 'react';
import Svg, { Rect } from 'react-native-svg';

type Props = { size?: number; color?: string };

const px = (n: number) => n; // explicit for readability

export function TrophyIcon({ size = 20, color = '#00CEC8' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Top rim */}
      <Rect x={px(3)} y={px(2)} width={px(10)} height={px(2)} fill={color} />
      {/* Handles */}
      <Rect x={px(2)} y={px(4)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(12)} y={px(4)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(2)} y={px(6)} width={px(2)} height={px(1)} fill={color} />
      <Rect x={px(12)} y={px(6)} width={px(2)} height={px(1)} fill={color} />
      {/* Cup body */}
      <Rect x={px(4)} y={px(4)} width={px(8)} height={px(2)} fill={color} />
      <Rect x={px(5)} y={px(6)} width={px(6)} height={px(2)} fill={color} />
      <Rect x={px(6)} y={px(8)} width={px(4)} height={px(2)} fill={color} />
      {/* Stem and base */}
      <Rect x={px(7)} y={px(10)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(5)} y={px(12)} width={px(6)} height={px(2)} fill={color} />
      {/* Accent (medal dot) */}
      <Rect x={px(7)} y={px(7)} width={px(2)} height={px(2)} fill={'#000000'} />
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
      {/* Modern gamepad silhouette with pronounced grips */}
      {/* Outline */}
      <Rect x={px(2)} y={px(6)} width={px(12)} height={px(4)} fill={'#000000'} />
      <Rect x={px(3)} y={px(5)} width={px(10)} height={px(1)} fill={'#000000'} />
      <Rect x={px(2)} y={px(8)} width={px(2)} height={px(2)} fill={'#000000'} />
      <Rect x={px(12)} y={px(8)} width={px(2)} height={px(2)} fill={'#000000'} />
      <Rect x={px(3)} y={px(10)} width={px(3)} height={px(1)} fill={'#000000'} />
      <Rect x={px(10)} y={px(10)} width={px(3)} height={px(1)} fill={'#000000'} />

      {/* Fill */}
      <Rect x={px(3)} y={px(6)} width={px(10)} height={px(4)} fill={color} />
      <Rect x={px(4)} y={px(5)} width={px(8)} height={px(1)} fill={color} />
      <Rect x={px(3)} y={px(8)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(11)} y={px(8)} width={px(2)} height={px(2)} fill={color} />
      <Rect x={px(4)} y={px(10)} width={px(2)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(10)} width={px(2)} height={px(1)} fill={color} />

      {/* D-pad (left) */}
      <Rect x={px(5)} y={px(7)} width={px(3)} height={px(1)} fill={'#000000'} />
      <Rect x={px(6)} y={px(6)} width={px(1)} height={px(3)} fill={'#000000'} />

      {/* Dual analog sticks */}
      <Rect x={px(6)} y={px(8)} width={px(1)} height={px(1)} fill={'#000000'} />
      <Rect x={px(9)} y={px(8)} width={px(1)} height={px(1)} fill={'#000000'} />

      {/* ABXY cluster (right) */}
      <Rect x={px(11)} y={px(7)} width={px(1)} height={px(1)} fill={'#000000'} />
      <Rect x={px(12)} y={px(7)} width={px(1)} height={px(1)} fill={'#000000'} />
      <Rect x={px(11)} y={px(8)} width={px(1)} height={px(1)} fill={'#000000'} />
      <Rect x={px(12)} y={px(8)} width={px(1)} height={px(1)} fill={'#000000'} />

      {/* Start/Select (center) */}
      <Rect x={px(8)} y={px(7)} width={px(1)} height={px(1)} fill={'#000000'} />
    </Svg>
  );
}

export function JoystickIcon({ size = 20, color = '#00FFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Base platform */}
      <Rect x={px(3)} y={px(12)} width={px(10)} height={px(2)} fill={color} />
      <Rect x={px(4)} y={px(11)} width={px(8)} height={px(1)} fill={color} />
      {/* Stem */}
      <Rect x={px(7)} y={px(6)} width={px(2)} height={px(5)} fill={color} />
      {/* Ball top (emoji-like) */}
      <Rect x={px(6)} y={px(3)} width={px(4)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(4)} width={px(6)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(5)} width={px(6)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(6)} width={px(4)} height={px(1)} fill={color} />
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
      {/* Symmetric red diamond (sharper tips) */}
      <Rect x={px(8)} y={px(2)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(7)} y={px(3)} width={px(3)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(4)} width={px(5)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(5)} width={px(7)} height={px(1)} fill={color} />
      <Rect x={px(4)} y={px(6)} width={px(9)} height={px(1)} fill={color} />
      <Rect x={px(3)} y={px(7)} width={px(11)} height={px(1)} fill={color} />
      <Rect x={px(4)} y={px(8)} width={px(9)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(9)} width={px(7)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(10)} width={px(5)} height={px(1)} fill={color} />
      <Rect x={px(7)} y={px(11)} width={px(3)} height={px(1)} fill={color} />
      <Rect x={px(8)} y={px(12)} width={px(1)} height={px(1)} fill={color} />
    </Svg>
  );
}

export function CashIcon({ size = 20, color = '#00FF5B' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Green square outline */}
      <Rect x={px(3)} y={px(3)} width={px(10)} height={px(10)} fill={'none'} />
      <Rect x={px(3)} y={px(3)} width={px(10)} height={px(1)} fill={color} />
      <Rect x={px(3)} y={px(12)} width={px(10)} height={px(1)} fill={color} />
      <Rect x={px(3)} y={px(3)} width={px(1)} height={px(10)} fill={color} />
      <Rect x={px(12)} y={px(3)} width={px(1)} height={px(10)} fill={color} />
    </Svg>
  );
}

export function MoneyBagIcon({ size = 20, color = '#00FF5B' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Knot */}
      <Rect x={px(7)} y={px(3)} width={px(2)} height={px(1)} fill={'#000000'} />
      {/* Neck */}
      <Rect x={px(6)} y={px(4)} width={px(4)} height={px(1)} fill={color} />
      {/* Upper body */}
      <Rect x={px(5)} y={px(5)} width={px(6)} height={px(2)} fill={color} />
      {/* Mid body */}
      <Rect x={px(4)} y={px(7)} width={px(8)} height={px(4)} fill={color} />
      {/* Lower body */}
      <Rect x={px(3)} y={px(11)} width={px(10)} height={px(2)} fill={color} />
      {/* Base shadow accent */}
      <Rect x={px(5)} y={px(13)} width={px(6)} height={px(1)} fill={'#000000'} />
    </Svg>
  );
}

export function DollarIcon({ size = 20, color = '#00FF5B' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Central vertical stroke */}
      <Rect x={px(8)} y={px(3)} width={px(1)} height={px(10)} fill={color} />
      {/* Classic pixel "$" with thicker bars */}
      <Rect x={px(6)} y={px(4)} width={px(5)} height={px(2)} fill={color} />
      <Rect x={px(6)} y={px(6)} width={px(2)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(7)} width={px(5)} height={px(2)} fill={color} />
      <Rect x={px(9)} y={px(9)} width={px(2)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(10)} width={px(5)} height={px(2)} fill={color} />
    </Svg>
  );
}

export function PlusIcon({ size = 18, color = '#00E676' }: Props) {
  const s = size;
  const dark = '#00A84B';
  const light = color || '#00E676';
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Outer darker cross */}
      <Rect x={px(6)} y={px(2)} width={px(4)} height={px(12)} fill={dark} />
      <Rect x={px(2)} y={px(6)} width={px(12)} height={px(4)} fill={dark} />
      {/* Inner lighter cross for two-tone effect */}
      <Rect x={px(7)} y={px(3)} width={px(2)} height={px(10)} fill={light} />
      <Rect x={px(3)} y={px(7)} width={px(10)} height={px(2)} fill={light} />
    </Svg>
  );
}

export function SquareIcon({ size = 20, color = '#FFFFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Outline square */}
      <Rect x={px(4)} y={px(4)} width={px(8)} height={px(1)} fill={color} />
      <Rect x={px(4)} y={px(11)} width={px(8)} height={px(1)} fill={color} />
      <Rect x={px(4)} y={px(5)} width={px(1)} height={px(6)} fill={color} />
      <Rect x={px(11)} y={px(5)} width={px(1)} height={px(6)} fill={color} />
    </Svg>
  );
}

export function TriangleIcon({ size = 20, color = '#FFFFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Small, crisp symmetric triangle outline */}
      {/* Apex */}
      <Rect x={px(8)} y={px(4)} width={px(1)} height={px(1)} fill={color} />
      {/* Left edge diagonal */}
      <Rect x={px(7)} y={px(5)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(6)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(7)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(4)} y={px(8)} width={px(1)} height={px(1)} fill={color} />
      {/* Right edge diagonal */}
      <Rect x={px(9)} y={px(5)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(6)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(11)} y={px(7)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(12)} y={px(8)} width={px(1)} height={px(1)} fill={color} />
      {/* Base */}
      <Rect x={px(4)} y={px(9)} width={px(9)} height={px(1)} fill={color} />
    </Svg>
  );
}

export function CrossIcon({ size = 20, color = '#FFFFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Thin X outline using single-pixel diagonals */}
      {/* TL -> BR */}
      <Rect x={px(4)} y={px(4)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(5)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(6)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(7)} y={px(7)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(8)} y={px(8)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(9)} y={px(9)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(10)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(11)} y={px(11)} width={px(1)} height={px(1)} fill={color} />
      {/* TR -> BL */}
      <Rect x={px(11)} y={px(4)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(5)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(9)} y={px(6)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(8)} y={px(7)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(7)} y={px(8)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(9)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(10)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(4)} y={px(11)} width={px(1)} height={px(1)} fill={color} />
    </Svg>
  );
}

export function CircleIcon({ size = 20, color = '#FFFFFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* 1px ring, round shape */}
      {/* Top arc */}
      <Rect x={px(6)} y={px(3)} width={px(4)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(4)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(4)} width={px(1)} height={px(1)} fill={color} />
      {/* Upper sides */}
      <Rect x={px(4)} y={px(5)} width={px(1)} height={px(2)} fill={color} />
      <Rect x={px(11)} y={px(5)} width={px(1)} height={px(2)} fill={color} />
      {/* Mid sides */}
      <Rect x={px(3)} y={px(7)} width={px(1)} height={px(2)} fill={color} />
      <Rect x={px(12)} y={px(7)} width={px(1)} height={px(2)} fill={color} />
      {/* Lower sides */}
      <Rect x={px(4)} y={px(9)} width={px(1)} height={px(2)} fill={color} />
      <Rect x={px(11)} y={px(9)} width={px(1)} height={px(2)} fill={color} />
      {/* Bottom arc */}
      <Rect x={px(6)} y={px(12)} width={px(4)} height={px(1)} fill={color} />
      <Rect x={px(5)} y={px(11)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(11)} width={px(1)} height={px(1)} fill={color} />
    </Svg>
  );
}

export function CrownIcon({ size = 20, color = '#9C6BFF' }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 16 16">
      {/* Simple, sharp crown: wide base with tapered spikes */}
      {/* Base */}
      <Rect x={px(2)} y={px(12)} width={px(12)} height={px(2)} fill={color} />
      {/* Left spike taper */}
      <Rect x={px(4)} y={px(6)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(3)} y={px(7)} width={px(2)} height={px(1)} fill={color} />
      <Rect x={px(3)} y={px(8)} width={px(3)} height={px(4)} fill={color} />
      {/* Center spike taper */}
      <Rect x={px(8)} y={px(4)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(7)} y={px(5)} width={px(3)} height={px(1)} fill={color} />
      <Rect x={px(6)} y={px(6)} width={px(5)} height={px(6)} fill={color} />
      {/* Right spike taper */}
      <Rect x={px(11)} y={px(6)} width={px(1)} height={px(1)} fill={color} />
      <Rect x={px(11)} y={px(7)} width={px(2)} height={px(1)} fill={color} />
      <Rect x={px(10)} y={px(8)} width={px(3)} height={px(4)} fill={color} />
    </Svg>
  );
}

export default {
  TrophyIcon,
  ListIcon,
  ControllerIcon,
  JoystickIcon,
  GiftIcon,
  UserIcon,
  MenuIcon,
  GemIcon,
  CashIcon,
  DollarIcon,
  PlusIcon,
  CrownIcon,
  MoneyBagIcon,
  SquareIcon,
  TriangleIcon,
  CrossIcon,
  CircleIcon,
};


