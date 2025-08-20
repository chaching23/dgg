import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from '@/theme';
import { Text } from 'react-native';
import { Leaderboard, Profile } from '@/screens';
import PlayStack from '@/screens/Play/PlayStack';
import Results from '@/screens/Results/Results';
import Rewards from '@/screens/Rewards/Rewards';
import { PlusIcon, SquareIcon, TriangleIcon, CrossIcon, CircleIcon, DollarIcon } from '@/components/disrupt/PixelIcons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { variant } = useTheme();
  const isDark = variant === 'dark';
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const sizeByRoute: Record<string, number> = {
            Results: 28,
            Leaders: 32,
            Play: 40,
            Rewards: 32,
            Profile: 28,
          };
          const size = sizeByRoute[route.name] ?? 20;
          switch (route.name) {
            case 'Results':
              return <SquareIcon size={size} color={color as string} />;
            case 'Leaders':
              return <TriangleIcon size={size} color={color as string} />;
            case 'Play':
              return <CrossIcon size={size} color={color as string} />;
            case 'Rewards':
              return <DollarIcon size={size} color={color as string} />;
            case 'Profile':
              return <CircleIcon size={size} color={color as string} />;
            default:
              return <Text style={{ color, fontSize: 16 }}>•</Text>;
          }
        },
        tabBarActiveTintColor: isDark ? '#00CEC8' : '#00A5A0',
        tabBarInactiveTintColor: isDark ? '#5BAEA9' : '#7C7C7C',
        tabBarLabelStyle: { fontSize: 12, letterSpacing: 0.5 },
        tabBarStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
          borderTopColor: isDark ? '#000000' : '#EDEDED',
        },
      })}
    >
      <Tab.Screen name="Results" component={Results} />
      <Tab.Screen name="Leaders" component={Leaderboard} />
      <Tab.Screen name="Play" component={PlayStack} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

