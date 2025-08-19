import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { storage, StorageKeys } from '@/storage';
import BalanceSparkline from './BalanceSparkline';

export default function Tabs() {
  const [active, setActive] = useState<'ETF' | 'WINNINGS'>('ETF');
  const etfRaw = JSON.parse(storage.getString(StorageKeys.etfHistory) || '[]') as number[];
  const winRaw = JSON.parse(storage.getString(StorageKeys.winningsHistory) || '[]') as number[];
  const [range, setRange] = useState<'1D' | '1W' | '1M' | 'ALL'>('ALL');

  const sliceData = (arr: number[]) => {
    if (range === 'ALL') return arr;
    const n = arr.length;
    const pick = range === '1D' ? 24 : range === '1W' ? 24 * 7 : 24 * 30;
    return arr.slice(Math.max(n - pick, 0));
  };
  const etf = useMemo(() => sliceData(etfRaw), [etfRaw, range]);
  const win = useMemo(() => sliceData(winRaw), [winRaw, range]);
  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        {[
          { key: 'ETF', label: 'Web3 ETF Savings' },
          { key: 'WINNINGS', label: 'Winnings' },
        ].map((t) => {
          const isActive = active === (t.key as any);
          return (
            <TouchableOpacity key={t.key} onPress={() => setActive(t.key as any)} style={{ backgroundColor: isActive ? '#0F0F0F' : '#111', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, marginRight: 8, borderWidth: isActive ? 1 : 0, borderColor: '#00CEC8' }}>
              <Text style={{ color: isActive ? '#00CEC8' : '#5BAEA9', fontWeight: '700' }}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 8 }}>
        {(['1D', '1W', '1M', 'ALL'] as const).map((r) => (
          <TouchableOpacity key={r} onPress={() => setRange(r)} style={{ backgroundColor: range === r ? '#0F0F0F' : '#111', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, marginRight: 6, borderWidth: range === r ? 1 : 0, borderColor: '#00CEC8' }}>
            <Text style={{ color: range === r ? '#00CEC8' : '#5BAEA9', fontWeight: '700', fontSize: 12 }}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {active === 'ETF' ? (
        <BalanceSparkline data={etf} color={'#00CEC8'} showShadow withAxis />
      ) : (
        <BalanceSparkline data={win} color={'#5BAEA9'} showShadow withAxis />
      )}
    </View>
  );
}


