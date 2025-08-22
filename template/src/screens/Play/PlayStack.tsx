import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/screens/Home/Home';
import GameMatch from '@/screens/Play/GameMatch';
import UnityGame from '@/screens/Play/UnityGame';

type PlayStackParamList = {
  home: undefined;
  gameMatch: { gameId: string; gameTitle: string };
  unityGame: { gameTitle: string; mode: 'FREE'|'CASH'|'GEMS'; stake: number; matchId?: string; seed?: number };
};

const Stack = createStackNavigator<PlayStackParamList>();

export default function PlayStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="gameMatch" component={GameMatch} />
      <Stack.Screen name="unityGame" component={UnityGame} />
    </Stack.Navigator>
  );
}




