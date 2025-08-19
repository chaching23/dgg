import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from '@/theme';
import { Text } from 'react-native';
import { Home, Leaderboard, Profile } from '@/screens';
import Results from '@/screens/Results/Results';
import Rewards from '@/screens/Rewards/Rewards';
import { ControllerIcon, GiftIcon, ListIcon, TrophyIcon, UserIcon } from '@/components/disrupt/PixelIcons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { variant } = useTheme();
  const isDark = variant === 'dark';
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const size = 18;
          switch (route.name) {
            case 'Results':
              return <TrophyIcon size={size} color={color as string} />;
            case 'Leaderboard':
              return <ListIcon size={size} color={color as string} />;
            case 'Play':
              return <ControllerIcon size={size} color={color as string} />;
            case 'Rewards':
              return <GiftIcon size={size} color={color as string} />;
            case 'Profile':
              return <UserIcon size={size} color={color as string} />;
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
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Play" component={Home} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

