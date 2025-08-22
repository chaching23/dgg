import type { RootScreenProps } from '@/navigation/types';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import GradientInput from '@/components/disrupt/GradientInput';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { Paths } from '@/navigation/paths';
import { resolveEmailIfUsername, supabase } from '@/services/instance';
import { Linking } from 'react-native';
import { storage, StorageKeys } from '@/storage';

function Login({ navigation }: RootScreenProps<Paths.Login>) {
  const { t } = useTranslation();
  const { components, gutters, layout, fonts, variant } = useTheme();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      setLoading(true);
      const raw = email.trim();
      const identifier = await resolveEmailIfUsername(raw);
      const { data, error } = await supabase.auth.signInWithPassword({ email: identifier, password });
      if (error) throw error as any;
      const accessToken = data.session?.access_token ?? null;
      if (accessToken) storage.set(StorageKeys.authToken, accessToken);
      navigation.reset({ index: 0, routes: [{ name: Paths.Example }] });
    } catch (e: any) {
      const msg = e?.message ?? 'Unknown error';
      if (msg.toLowerCase().includes('confirm')) {
        if (email.includes('@')) {
          try {
            await supabase.auth.resend({ type: 'signup', email: email.trim(), options: { emailRedirectTo: 'disrupt://auth/callback' } });
          } catch {}
        }
        Alert.alert(
          'Email not confirmed',
          'Please confirm your email to sign in, or use Apple to continue immediately.',
        );
      } else {
        Alert.alert('Login failed', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const token = session.access_token ?? null;
        if (token) storage.set(StorageKeys.authToken, token);
        navigation.reset({ index: 0, routes: [{ name: Paths.Example }] });
      }
    });
    const handler = async (url: string) => {
      const parsed = new URL(url);
      const code = parsed.searchParams.get('code');
      if (code) await supabase.auth.exchangeCodeForSession(code);
    };
    const subLink = Linking.addEventListener('url', ({ url }) => handler(url));
    void (async () => { const u = await Linking.getInitialURL(); if (u) await handler(u); })();
    return () => { subLink.remove(); sub.data.subscription.unsubscribe(); };
  }, [navigation]);

  const onApple = async () => {
    try {
      const redirectTo = 'disrupt://auth/callback';
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: { redirectTo },
      });
      if (error) throw error;
      if (data?.url) {
        await Linking.openURL(data.url);
      } else {
        Alert.alert('Apple Sign In', 'No auth URL returned. Check Supabase provider config.');
      }
    } catch (e: any) {
      Alert.alert('Apple login failed', e?.message ?? 'Unknown error');
    }
  };

  return (
    <SafeScreen>
      <View style={[layout.flex_1, layout.justifyCenter, gutters.padding_24]}>
        <View style={[layout.itemsCenter, gutters.marginBottom_24]}>
          <Image
            source={require('@/assets/branding/DisruptP.png')}
            style={{ width: 480, height: 350, resizeMode: 'contain' }}
          />
        </View>
        <Text style={[fonts.size_24, fonts.bold, gutters.marginBottom_16]}>
          <Text style={{ color: '#00CEC8' }}>
            {t('login_title', { defaultValue: 'Login' })}
          </Text>
        </Text>

        {/* Removed top Apple button per request */}

        <GradientInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder={t('email', { defaultValue: 'Email' })}
          placeholderTextColor="#CCCCCC"
          containerStyle={[gutters.marginBottom_16]}
          borderRadius={16}
          value={email}
        />
        <GradientInput
          onChangeText={setPassword}
          placeholder={t('password', { defaultValue: 'Password' })}
          placeholderTextColor="#CCCCCC"
          secureTextEntry
          containerStyle={[gutters.marginBottom_24]}
          borderRadius={16}
          value={password}
        />

        <TouchableOpacity disabled={loading} onPress={onSubmit} style={[components.buttonPrimary, { backgroundColor: '#FFFFFF' }] }>
          <Text style={[fonts.size_16, fonts.alignCenter, fonts.uppercase, { color: '#000000' }]}>
            {loading ? t('loading', { defaultValue: 'Loading...' }) : t('login', { defaultValue: 'Login' })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(Paths.Signup)}
          style={[gutters.marginTop_16]}
        >
          <Text style={[fonts.size_12, variant === 'dark' ? { color: '#FFFFFF' } : { color: '#111111' }] }>
            {t('no_account', { defaultValue: "Don't have an account? Sign up" })}
          </Text>
        </TouchableOpacity>
        {/* Separator above Apple Sign In */}
        <View style={{ height: 1, backgroundColor: '#2A2A2A', marginTop: 16, marginBottom: 12 }} />
        {/* Standard Apple Sign In button at bottom with subtle shadow */}
        <TouchableOpacity
          onPress={onApple}
          style={{
            marginTop: 0,
            height: 44,
            borderRadius: 10,
            backgroundColor: '#000000',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

export default Login;

