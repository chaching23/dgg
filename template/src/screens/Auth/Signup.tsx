import type { RootScreenProps } from '@/navigation/types';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { Paths } from '@/navigation/paths';
import { supabase } from '@/services/instance';
import { storage, StorageKeys } from '@/storage';

function Signup({ navigation }: RootScreenProps<Paths.Signup>) {
  const { t } = useTranslation();
  const { components, gutters, layout, fonts } = useTheme();
  const isLoading = false;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      if (!name || !email || !password || password.length < 8) {
        Alert.alert('Please fill all fields (min 8 char password)');
        return;
      }
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: name },
          emailRedirectTo: 'disrupt://auth/callback',
        },
      });
      if (error) throw error;

      // Always sign in after sign-up to let user in immediately (even if email confirmation pending)
      const { data: signedIn, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) {
        // If sign-in is blocked due to unconfirmed email, resend confirmation and inform user
        const msg = (signInErr as any)?.message || '';
        if (msg.toLowerCase().includes('confirm') || msg.toLowerCase().includes('not confirmed')) {
          await supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: 'disrupt://auth/callback' } });
          Alert.alert('Verify your email', 'We sent a confirmation email. You can continue using Discord login for instant access.');
        } else {
          throw signInErr;
        }
      }

      // Set username on profile when session is available
      const session = (await supabase.auth.getSession()).data.session;
      if (session?.user?.id) {
        const token = session.access_token ?? null;
        if (token) storage.set(StorageKeys.authToken, token);
        await supabase.from('profiles').update({ username: name }).eq('id', session.user.id);
      }

      navigation.reset({ index: 0, routes: [{ name: Paths.Example }] });
    } catch (e: any) {
      Alert.alert('Signup failed', e?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) navigation.reset({ index: 0, routes: [{ name: Paths.Example }] });
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
            source={require('@/assets/branding/disrupt.png')}
            style={{ width: 280, height: 100, resizeMode: 'contain' }}
          />
        </View>
        <Text style={[fonts.size_24, fonts.bold, gutters.marginBottom_16]}>
          <Text style={{ color: '#FFFFFF' }}>
            {t('signup_title', { defaultValue: 'Create account' })}
          </Text>
        </Text>

        <TextInput
          onChangeText={setName}
          placeholder={t('name', { defaultValue: 'Name' })}
          placeholderTextColor="#CCCCCC"
          style={[components.input, gutters.marginBottom_12, { color: '#FFFFFF', backgroundColor: '#1B1B1B', borderColor: '#444444' }]}
          value={name}
        />
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
          secureTextEntry
          placeholderTextColor="#CCCCCC"
          style={[components.input, gutters.marginBottom_24, { color: '#FFFFFF', backgroundColor: '#1B1B1B', borderColor: '#444444' }]}
          value={password}
        />

        <TouchableOpacity disabled={isLoading || loading} onPress={onSubmit} style={[components.buttonPrimary, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[fonts.size_16, fonts.alignCenter, fonts.uppercase, { color: '#000000' }]}>
            {loading ? t('loading', { defaultValue: 'Loading...' }) : t('signup', { defaultValue: 'Sign up' })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDiscord} style={[components.buttonPrimary, { backgroundColor: '#5865F2', marginTop: 12 }]}>
          <Text style={[fonts.size_16, fonts.alignCenter, fonts.uppercase, { color: '#FFFFFF' }]}>Continue with Discord</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(Paths.Login)} style={[gutters.marginTop_16]}>
          <Text style={[fonts.size_12, { color: '#FFFFFF' }] }>
            {t('have_account', { defaultValue: 'Have an account? Log in' })}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

export default Signup;

