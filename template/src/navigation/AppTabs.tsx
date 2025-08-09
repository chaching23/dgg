import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { Home, Leaderboard, Notifications, Profile, Search } from '@/screens';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const emojiMap: Record<string, string> = {
            Home: '🏠',
            Profile: '👤',
            Leaderboard: '🏆',
            Notifications: '🔔',
            Search: '🔎',
          };
          const emoji = emojiMap[route.name] ?? '•';
          return <Text style={{ color, fontSize: 16 }}>{emoji}</Text>;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

