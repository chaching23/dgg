import React, { useState } from 'react';
import { Alert, Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import GradientInput from '@/components/disrupt/GradientInput';
import PixelButton from '@/components/disrupt/PixelButton';
import { storage, StorageKeys } from '@/storage';

export default function AddMoney() {
  const { layout, gutters, fonts, variant } = useTheme();
  const [amount, setAmount] = useState('');
  const [balance, setBalanceState] = useState<number>(() => {
    const value = storage.getNumber(StorageKeys.walletBalance as any);
    return typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  });
  const [gems, setGemsState] = useState<number>(() => {
    const value = storage.getNumber(StorageKeys.walletGems as any);
    return typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  });

  const burst = useState(new Animated.Value(0))[0];

  const setBalance = (value: number) => {
    setBalanceState(value);
    storage.set(StorageKeys.walletBalance, value);
    try {
      const raw = storage.getString(StorageKeys.walletHistory) || '[]';
      const arr = JSON.parse(raw) as number[];
      arr.push(value);
      storage.set(StorageKeys.walletHistory, JSON.stringify(arr).slice(0, 4000));
    } catch {}
  };
  const setGems = (value: number) => {
    setGemsState(value);
    storage.set(StorageKeys.walletGems, value);
  };

  const onQuickAdd = (val: number) => {
    setAmount(String(val));
  };

  const onAddMoney = () => {
    const parsed = parseFloat(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive number.');
      return;
    }
    const newBalance = balance + 10; // fixed $10 per request
    const newGems = gems + 100;
    setBalance(newBalance);
    setGems(newGems);
    setAmount('');

    burst.setValue(0);
    Animated.timing(burst, { toValue: 1, duration: 850, easing: Easing.out(Easing.exp), useNativeDriver: true }).start(() => {
      Alert.alert('Success', `Added $10 and 100 rubies!`);
    });
  };

  return (
    <SafeScreen>
      <View style={[layout.flex_1, gutters.padding_24]}>
        <Text style={[fonts.size_24, fonts.bold, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>Add Money</Text>
        <View style={{ height: 8 }} />
        <Text style={[fonts.size_12, variant === 'dark' ? fonts.gray400 : fonts.gray200]}>Current balance (local): ${balance.toFixed(2)}</Text>

        <View style={{ height: 24 }} />
        <GradientInput
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
        />

        <View style={{ height: 12 }} />
        <View style={{ flexDirection: 'row' }}>
          {[10, 25, 50].map((v, idx) => (
            <TouchableOpacity
              key={v}
              onPress={() => onQuickAdd(v)}
              style={{
                borderRadius: 12,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#1C1C1C',
                marginRight: idx < 2 ? 8 : 0,
              }}
            >
              <Text style={[fonts.size_12, { color: '#FFFFFF' }]}>${v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
        <PixelButton title="Apple Pay - Add $10" onPress={onAddMoney} />
        <View style={{ height: 10 }} />
        <PixelButton title="Stripe - Add $10" onPress={onAddMoney} />
        <View style={{ height: 10 }} />
        <PixelButton title="Venmo - Add $10" onPress={onAddMoney} />

        <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: '40%', alignItems: 'center', opacity: burst.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.2] }) }] }}>
          <Text style={{ color: '#FFFFFF', fontSize: 28 }}>💥</Text>
        </Animated.View>
      </View>
    </SafeScreen>
  );
}


