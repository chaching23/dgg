import type { RootScreenProps } from '@/navigation/types';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UIButton } from '@/components/disrupt/UIButton';
import { UITextField } from '@/components/disrupt/UITextField';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { Paths } from '@/navigation/paths';
import { resolveEmailIfUsername, supabase } from '@/services/instance';
import { Linking } from 'react-native';
import { storage, StorageKeys } from '@/storage';

function Login({ navigation }: RootScreenProps<Paths.Login>) {
  const { t } = useTranslation();
  const { components, gutters, layout, fonts } = useTheme();
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
          'Please confirm your email to sign in, or use Discord to continue immediately.',
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

  const onDiscord = async () => {
    const redirectTo = 'disrupt://auth/callback';
    await supabase.auth.signInWithOAuth({ provider: 'discord', options: { redirectTo } });
  };

  return (
    <SafeScreen style={[{ backgroundColor: '#000000' }]}>
      <View style={[layout.flex_1, layout.justifyCenter, gutters.padding_24]}>
        <View style={[layout.itemsCenter, gutters.marginBottom_24]}>
          <Image
            source={require('@/assets/branding/DisruptG.png')}
            style={{ width: 580, height: 300, resizeMode: 'contain' }}
          />
        </View>
        <Text style={[fonts.size_24, fonts.bold, gutters.marginBottom_16]}>
          <Text style={{ color: '#FFFFFF' }}>
            {t('login_title', { defaultValue: 'Login' })}
          </Text>
        </Text>

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder={t('email', { defaultValue: 'Email' })}
          placeholderTextColor="#CCCCCC"
          style={[components.input, gutters.marginBottom_12, { color: '#FFFFFF', backgroundColor: '#1B1B1B', borderColor: '#444444' }]}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder={t('password', { defaultValue: 'Password' })}
          placeholderTextColor="#CCCCCC"
          secureTextEntry
          style={[components.input, gutters.marginBottom_24, { color: '#FFFFFF', backgroundColor: '#1B1B1B', borderColor: '#444444' }]}
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
          <Text style={[fonts.size_12, { color: '#FFFFFF' }] }>
            {t('no_account', { defaultValue: "Don't have an account? Sign up" })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDiscord} style={[components.buttonPrimary, { backgroundColor: '#5865F2', marginTop: 12 }]}>
          <Text style={[fonts.size_16, fonts.alignCenter, fonts.uppercase, { color: '#FFFFFF' }]}>Continue with Discord</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

export default Login;

