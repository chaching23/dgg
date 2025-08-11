import React, { useCallback } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { SafeScreen } from '@/components/templates';
import { supabase } from '@/services/instance';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';

function Profile() {
  const { layout, fonts, variant } = useTheme();
  const navigation = useNavigation();

  const handleLogout = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const emailConfirmed = Boolean((data.user as any)?.email_confirmed_at);

      const doSignOut = async () => {
        await supabase.auth.signOut();
        // @ts-ignore
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      };

      if (!emailConfirmed) {
        Alert.alert(
          'Email confirmation recommended',
          'Confirm your email to avoid losing access if you logout before verifying.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => void doSignOut() },
          ],
        );
        return;
      }

      await doSignOut();
    } catch (e) {
      await supabase.auth.signOut();
      // @ts-ignore
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }, [navigation]);
  return (
    <SafeScreen>
      <View style={[layout.flex_1, { paddingHorizontal: 10, paddingTop: 0, paddingBottom: 10 }]}>
        <Text style={[fonts.size_24 ?? fonts.size_16, fonts.bold, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>Profile</Text>
        <Text style={[fonts.size_12, variant === 'dark' ? fonts.gray50 : fonts.gray800]}>Your profile details will appear here.</Text>
        <View style={{ height: 16 }} />
        <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#fff', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ color: '#000', fontWeight: '700' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

export default Profile;

