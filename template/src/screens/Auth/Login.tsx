import type { RootScreenProps } from '@/navigation/types';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { Paths } from '@/navigation/paths';
import { useAuthController } from '@/hooks';

function Login({ navigation }: RootScreenProps<Paths.Login>) {
  const { t } = useTranslation();
  const { components, gutters, layout, fonts } = useTheme();
  const { login, isLoading } = useAuthController();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      await login(email, password);
      navigation.reset({ index: 0, routes: [{ name: Paths.Example }] });
    } catch (e) {
      Alert.alert('Login failed');
    }
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

        <TouchableOpacity disabled={isLoading} onPress={onSubmit} style={[components.buttonPrimary, { backgroundColor: '#FFFFFF' }] }>
          <Text style={[fonts.size_16, fonts.alignCenter, fonts.uppercase, { color: '#000000' }]}>
            {t('login', { defaultValue: 'Login' })}
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
      </View>
    </SafeScreen>
  );
}

export default Login;

