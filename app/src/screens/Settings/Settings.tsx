import React, { useCallback } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';
import { supabase } from '@/services/instance';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Paths } from '@/navigation/paths';

type Item = { title: string; subtitle?: string; onPress?: () => void };

export default function Settings() {
  const { fonts, variant } = useTheme();
  const isDark = variant === 'dark';
  const navigation = useNavigation();

  const onLogout = useCallback(async () => {
    try {
      storage.delete(StorageKeys.authToken);
      await supabase.auth.signOut();
    } catch {}
    const action = CommonActions.reset({ index: 0, routes: [{ name: Paths.Startup as never }] as any });
    const parent = (navigation as any).getParent?.();
    if (parent) parent.dispatch(action);
    else (navigation as any).dispatch(action);
  }, [navigation]);

  const primary: Item[] = [
    { title: 'Cash Out', subtitle: 'Cash out your winnings', onPress: () => navigation.navigate(Paths.CashOut as never) },
    { title: 'Sound and Haptics', subtitle: 'Change your preferences' },
    { title: 'Customer Support', subtitle: 'Questions or concerns' },
    { title: 'Refund Request', subtitle: 'Claim money back for a failed game' },
    { title: 'FAQ', subtitle: 'Get answers to common questions' },
  ];

  const secondary: Item[] = [
    { title: 'Log Out', onPress: onLogout },
    { title: 'Terms of Use' },
    { title: 'Privacy Policy' },
    { title: 'Regulatory Information' },
    { title: 'Responsible Gaming Policy' },
    { title: 'Data Preferences' },
    { title: 'Delete Account' },
  ];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={[fonts.size_16, fonts.bold, { color: isDark ? '#FFFFFF' : '#111111', marginBottom: 12 }]}>Account, Settings and Legal</Text>

        {primary.map((it) => (
          <TouchableOpacity
            key={it.title}
            onPress={it.onPress}
            activeOpacity={0.8}
            style={{ backgroundColor: isDark ? '#0F0F0F' : '#F2F2F2', borderRadius: 16, borderWidth: 1, borderColor: isDark ? '#222' : '#E2E2E2', paddingVertical: 16, paddingHorizontal: 16, marginBottom: 12 }}
          >
            <Text style={[fonts.size_16, fonts.bold, { color: isDark ? '#00E07A' : '#0B8F4D' }]}>{it.title}</Text>
            {it.subtitle ? (
              <Text style={[fonts.size_12, { color: isDark ? '#BBBBBB' : '#555555', marginTop: 4 }]}>{it.subtitle}</Text>
            ) : null}
          </TouchableOpacity>
        ))}

        <View style={{ height: 8 }} />
        {secondary.map((it, idx) => (
          <TouchableOpacity
            key={it.title}
            onPress={it.onPress}
            activeOpacity={0.7}
            style={{ paddingVertical: 18, borderTopWidth: idx === 0 ? 1 : 0, borderBottomWidth: 1, borderColor: isDark ? '#1A1A1A' : '#E2E2E2' }}
          >
            <Text style={[fonts.size_12, { color: isDark ? '#FFFFFF' : '#111111' }]}>{it.title}</Text>
          </TouchableOpacity>
        ))}

        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Text style={[fonts.size_12, { color: '#888888' }]}>Version 0.0.1</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}


