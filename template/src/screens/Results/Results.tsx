import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';

type ResultItem = {
  id: string;
  game: string;
  amount: number; // positive for win, negative for loss
};

const sampleData: ResultItem[] = [
  { id: '1', game: 'Puzzle Dash', amount: 5 },
  { id: '2', game: 'Aim Trainer', amount: -3 },
  { id: '3', game: 'Memory Flip', amount: 12 },
];

export default function Results() {
  const { layout, gutters, fonts } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.flex_1, gutters.padding_16]}>
        <Text style={[fonts.size_24, fonts.bold, { color: '#FFFFFF' }]}>Results</Text>
        <FlatList
          data={sampleData}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => {
            const positive = item.amount >= 0;
            // Update progression
            if (positive) {
              try {
                const current = Number(storage.getNumber(StorageKeys.winsCount as any) || 0);
                storage.set(StorageKeys.winsCount, current + 1);
              } catch {}
            }
            try {
              const raw = storage.getString(StorageKeys.winningsHistory) || '[]';
              const arr = JSON.parse(raw) as number[];
              const last = arr[arr.length - 1] ?? 0;
              arr.push(last + item.amount);
              storage.set(StorageKeys.winningsHistory, JSON.stringify(arr).slice(0, 4000));
            } catch {}
            // ETF allocation: 30% equally among players (placeholder: 2 players)
            try {
              const players = 2; // TODO: derive based on match context
              const pot = Math.abs(item.amount) * 2; // simplistic placeholder
              const etfAdd = (0.3 * pot) / players;
              const currentPool = Number(storage.getNumber(StorageKeys.etfPoolBalance as any) || 0);
              const nextPool = currentPool + etfAdd;
              storage.set(StorageKeys.etfPoolBalance, nextPool);
              const raw = storage.getString(StorageKeys.etfHistory) || '[]';
              const arr = JSON.parse(raw) as number[];
              arr.push(nextPool);
              storage.set(StorageKeys.etfHistory, JSON.stringify(arr).slice(0, 4000));
            } catch {}
            return (
              <View style={{ backgroundColor: '#111', borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[fonts.size_16, { color: '#FFFFFF' }]}>{item.game}</Text>
                <Text style={[fonts.size_16, { color: positive ? '#00E07A' : '#FF4D4D' }]}>
                  {positive ? '+' : ''}${item.amount.toFixed(2)}
                </Text>
              </View>
            );
          }}
          contentContainerStyle={{ paddingTop: 12 }}
        />
      </View>
    </SafeScreen>
  );
}


