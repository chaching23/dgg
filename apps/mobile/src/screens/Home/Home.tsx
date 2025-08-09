import React, { useEffect, useState } from 'react';
import { Box, HStack, Heading, Pressable, ScrollView, Text, VStack, Badge, Avatar, useColorMode } from 'native-base';

type Game = { id: string; title: string; subtitle?: string };

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Replace with real API when available
    setGames([
      { id: '1', title: 'Slots Deluxe' },
      { id: '2', title: 'Poker Pro' },
      { id: '3', title: 'Blackjack 21' },
      { id: '4', title: 'Roulette Live' },
    ]);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: colorMode === 'dark' ? '#000' : '#fff' }}>
      <VStack space={6}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="lg">Home</Heading>
          <HStack space={4} alignItems="center">
            <Badge>Coins: 1200</Badge>
            <Avatar size="sm">DG</Avatar>
          </HStack>
        </HStack>

        <VStack space={3}>
          <Heading size="md">Featured</Heading>
          {games.map((g) => (
            <Pressable key={g.id} onPress={() => { /* navigation to Unity screen */ }}>
              {({ isPressed }) => (
                <Box p={4} borderWidth={1} borderColor={colorMode === 'dark' ? '#333' : '#ccc'} bg={colorMode === 'dark' ? 'muted.900' : 'muted.50'} borderRadius={10} opacity={isPressed ? 0.7 : 1}>
                  <Text fontSize="lg" fontWeight="bold">{g.title}</Text>
                  {g.subtitle ? <Text color="coolGray.500">{g.subtitle}</Text> : null}
                </Box>
              )}
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

