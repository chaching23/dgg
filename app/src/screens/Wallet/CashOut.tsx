import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';

export default function CashOut() {
  const { fonts, variant } = useTheme();
  const isDark = variant === 'dark';
  const withdrawable = Number(storage.getNumber(StorageKeys.walletBalance as any) || 0).toFixed(2);

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={{ backgroundColor: isDark ? '#0F0F0F' : '#F2F2F2', borderRadius: 16, borderWidth: 1, borderColor: isDark ? '#222' : '#E2E2E2', padding: 16 }}>
          <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF' }]}>Cash Out</Text>
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 8 }]}>Only winnings can an be withdrawn, and bonus cash is forfeited upon withdrawal</Text>
          <Text style={[fonts.size_12, { color: '#BBBBBB', marginTop: 8 }]}>$6 minimum withdrawal.</Text>
        </View>

        <View style={{ height: 22 }} />
        <Text style={[fonts.size_12, { color: isDark ? '#BBBBBB' : '#555' }]}>Available methods</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginBottom: 8, paddingHorizontal: 24 }}>
          {['Debit', 'PayPal', 'Venmo', 'Bank'].map((m) => (
            <View key={m} style={{ alignItems: 'center' }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: isDark ? '#111' : '#EDEDED', alignItems: 'center', justifyContent: 'center' }} />
              <Text style={[fonts.size_12, { color: isDark ? '#BBBBBB' : '#333', marginTop: 8 }]}>{m}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 22 }} />
        {[{ k: 'Withdrawable Cash', v: `$${withdrawable}` }, { k: 'Bonus Cash', v: '$0' }, { k: 'Daily Limit Remaining', v: '$150' }].map((row, i) => (
          <View key={row.k} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: i < 2 ? 1 : 0, borderColor: isDark ? '#1A1A1A' : '#E2E2E2' }}>
            <Text style={[fonts.size_12, { color: '#FFFFFF' }]}>{row.k}</Text>
            <Text style={[fonts.size_12, { color: row.k === 'Withdrawable Cash' ? '#00E07A' : '#FFFFFF' }]}>{row.v}</Text>
          </View>
        ))}

        <View style={{ height: 32 }} />
        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: '#00E07A', borderRadius: 24, paddingVertical: 16, alignItems: 'center' }}>
          <Text style={[fonts.size_16, fonts.bold, { color: '#0A0A0A' }]}>Cash out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
}


