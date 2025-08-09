import type { RootScreenProps } from '@/navigation/types';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { Paths } from '@/navigation/paths';
import { useAuthController } from '@/hooks';

function Signup({ navigation }: RootScreenProps<Paths.Signup>) {
  const { t } = useTranslation();
  const { components, gutters, layout, fonts } = useTheme();
  const { signup, isLoading } = useAuthController();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      await signup(name, email, password);
      navigation.reset({ index: 0, routes: [{ name: Paths.Example }] });
    } catch (e) {
      Alert.alert('Signup failed');
    }
  };

  return (
    <SafeScreen style={[{ backgroundColor: '#000000' }]}>
      <View style={[layout.flex_1, layout.justifyCenter, gutters.padding_24]}>
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

        <TouchableOpacity disabled={isLoading} onPress={onSubmit} style={[components.buttonPrimary, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[fonts.size_16, fonts.alignCenter, fonts.uppercase, { color: '#000000' }]}>
            {t('signup', { defaultValue: 'Sign up' })}
          </Text>
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

