import type { ComponentTheme } from '@/theme/types/theme';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type AllStyle = {} & Record<string, ImageStyle | TextStyle | ViewStyle>;

const generateComponentStyles = ({ backgrounds, fonts, layout }: ComponentTheme) => {
  return {
    buttonCircle: {
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...backgrounds.purple100,
      ...fonts.gray400,
      borderRadius: 35,
      height: 64,
      width: 64,
    },
    buttonPrimary: {
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...backgrounds.purple500,
      height: 48,
      borderRadius: 8,
    },
    input: {
      height: 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: (backgrounds.gray200 as any).backgroundColor ?? '#A1A1A1',
      paddingHorizontal: 12,
    },
    circle250: {
      borderRadius: 140,
      height: 250,
      width: 250,
    },
  } as const satisfies AllStyle;
};

export default generateComponentStyles;
