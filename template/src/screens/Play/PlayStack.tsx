import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/screens/Home/Home';
import GameMatch from '@/screens/Play/GameMatch';

type PlayStackParamList = {
  home: undefined;
  gameMatch: { gameId: string; gameTitle: string };
};

const Stack = createStackNavigator<PlayStackParamList>();

export default function PlayStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="gameMatch" component={GameMatch} />
    </Stack.Navigator>
  );
}


