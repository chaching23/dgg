import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@/theme';

const Tab = createBottomTabNavigator();

function Placeholder({ title }: { title: string }) {
  const { layout, gutters, fonts } = useTheme();
  return <Text style={[layout.justifyCenter, gutters.padding_24, fonts.size_24]}>{title}</Text>;
}

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" children={() => <Placeholder title="Home" />} />
      <Tab.Screen name="Profile" children={() => <Placeholder title="Profile" />} />
      <Tab.Screen name="Leaderboard" children={() => <Placeholder title="Leaderboard" />} />
      <Tab.Screen name="Notifications" children={() => <Placeholder title="Notifications" />} />
      <Tab.Screen name="Search" children={() => <Placeholder title="Search" />} />
    </Tab.Navigator>
  );
}

