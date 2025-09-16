import React, { useState } from 'react';
import { Alert, Animated, Easing, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import GradientInput from '@/components/disrupt/GradientInput';
import PixelButton from '@/components/disrupt/PixelButton';
import { isApplePayAvailable, presentApplePay, finalizeApplePay } from '@/services/payments';
import { storage, StorageKeys } from '@/storage';
import { initIap, purchaseWallet10, getProducts } from '@/services/iap';

export default function AddMoney() {
  const { layout, gutters, fonts, variant } = useTheme();
  const [amount, setAmount] = useState('');
  const [gems, setGemsState] = useState<number>(() => {
    const value = storage.getNumber(StorageKeys.walletGems as any);
    return typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  });

  const burst = useState(new Animated.Value(0))[0];

  const setGems = (value: number) => {
    setGemsState(value);
    storage.set(StorageKeys.walletGems, value);
  };

  React.useEffect(() => {
    (async () => {
      await initIap();
      const products = await getProducts();
      // eslint-disable-next-line no-console
      console.log('IAP products', products);
    })();
  }, []);

  const onQuickAdd = (val: number) => {
    setAmount(String(val));
  };

  const WEBSITE_CHECKOUT_URL = 'https://buy.stripe.com/test_7sYeVe0iffyp1kNaw74Ja00';
  const onWebsiteCheckout = async () => {
    try {
      await Linking.openURL(WEBSITE_CHECKOUT_URL);
    } catch (e: any) {
      Alert.alert('Open website failed', e?.message || String(e));
    }
  };

  const onApplePayTopup = async () => {
    try {
      const available = await isApplePayAvailable();
      if (!available) {
        Alert.alert('Apple Pay not available', 'We need to enable Apple Pay in the app first.');
        return;
      }
      const amt = Number(amount || 10);
      const res = await presentApplePay({
        merchantId: 'merchant.com.example.arcade',
        countryCode: 'US',
        currencyCode: 'USD',
        amount: amt,
        label: 'Wallet Top‑up',
      });
      if (res.success) {
        // Here you would confirm the PaymentIntent on your backend, then credit locally
        const newGems = gems + Math.round(amt);
        setGems(newGems);
        try {
          const raw = storage.getString(StorageKeys.walletHistory) || '[]';
          const arr = JSON.parse(raw) as any[];
          arr.unshift({ id: String(Date.now()), game: 'Top‑up (Apple Pay)', amountGems: Math.round(amt) });
          storage.set(StorageKeys.walletHistory, JSON.stringify(arr).slice(0, 4000));
        } catch {}
        await finalizeApplePay(true);
        Alert.alert('Success', `Added ${Math.round(amt)} diamonds!`);
      } else {
        await finalizeApplePay(false);
      }
    } catch (e: any) {
      Alert.alert('Apple Pay error', e?.message || 'Try again later');
    }
  };

  return (
    <SafeScreen>
      <View style={[layout.flex_1, gutters.padding_24]}>
        <Text style={[fonts.size_24, fonts.bold, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>Add Money</Text>
        <View style={{ height: 8 }} />
        <Text style={[fonts.size_12, variant === 'dark' ? fonts.gray400 : fonts.gray200]}>Diamonds (local): {gems}</Text>

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
        <PixelButton title="Go to website for purchase (no fee) – $10.00" onPress={onWebsiteCheckout} />
        <View style={{ height: 10 }} />
        <PixelButton title="Top‑up with Apple Pay (scaffold)" onPress={onApplePayTopup} />
        <View style={{ height: 10 }} />
        <PixelButton title="Buy 10 Diamonds (Apple) – $12.99" onPress={async () => {
          try {
            await purchaseWallet10(() => {
              const newGems = gems + 10;
              setGems(newGems);
              try {
                const raw = storage.getString(StorageKeys.walletHistory) || '[]';
                const arr = JSON.parse(raw) as any[];
                arr.unshift({ id: String(Date.now()), game: 'Top‑up (Apple)', amountGems: 10 });
                storage.set(StorageKeys.walletHistory, JSON.stringify(arr).slice(0, 4000));
              } catch {}
              burst.setValue(0);
              Animated.timing(burst, { toValue: 1, duration: 850, easing: Easing.out(Easing.exp), useNativeDriver: true }).start();
            });
          } catch (e: any) {
            Alert.alert('Purchase failed', e?.message || 'Try again later');
          }
        }} />
        <View style={{ height: 10 }} />
        <PixelButton title="Simulate +10 Diamonds" onPress={() => {
          const newGems = gems + 10;
          setGems(newGems);
          setAmount('');
          try {
            const raw = storage.getString(StorageKeys.walletHistory) || '[]';
            const arr = JSON.parse(raw) as any[];
            arr.unshift({ id: String(Date.now()), game: 'Top‑up (Simulated)', amountGems: 10 });
            storage.set(StorageKeys.walletHistory, JSON.stringify(arr).slice(0, 4000));
          } catch {}
          burst.setValue(0);
          Animated.timing(burst, { toValue: 1, duration: 850, easing: Easing.out(Easing.exp), useNativeDriver: true }).start(() => {
            Alert.alert('Success', `Added 10 diamonds!`);
          });
        }} />

        <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: '40%', alignItems: 'center', opacity: burst.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.2] }) }] }}>
          <Text style={{ color: '#FFFFFF', fontSize: 28 }}>💥</Text>
        </Animated.View>
      </View>
    </SafeScreen>
  );
}


