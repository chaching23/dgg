import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import AppTabs from './AppTabs';
import { Alert, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { supabase } from '@/services/instance';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Paths } from '@/navigation/paths';
import { storage, StorageKeys } from '@/storage';

const Drawer = createDrawerNavigator();

function SettingsScreen() {
  const { layout, gutters, fonts } = useTheme();
  return (
    <View style={[layout.flex_1, gutters.padding_24]}>
      <Text style={[fonts.size_24]}>Settings</Text>
    </View>
  );
}

function AddMoneyScreen() {
  const { layout, gutters, fonts } = useTheme();
  return (
    <View style={[layout.flex_1, gutters.padding_24]}>
      <Text style={[fonts.size_24]}>Add Money</Text>
    </View>
  );
}

function CustomDrawerContent(props: any) {
  const { colors, variant } = useTheme();
  const navigation = useNavigation();
  const onLogout = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const emailConfirmed = Boolean((data.user as any)?.email_confirmed_at);
      const proceed = async () => {
        storage.delete(StorageKeys.authToken);
        await supabase.auth.signOut();
        const action = CommonActions.reset({ index: 0, routes: [{ name: Paths.Login }] });
        const parent = navigation.getParent?.();
        if (parent) parent.dispatch(action);
        else navigation.dispatch(action);
      };
      if (!emailConfirmed) {
        Alert.alert(
          'Confirm before logout',
          'If you have not confirmed your email, you might lose your account.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Proceed', style: 'destructive', onPress: () => void proceed() },
          ],
        );
      } else {
        await proceed();
      }
    } catch {
      storage.delete(StorageKeys.authToken);
      await supabase.auth.signOut();
      const action = CommonActions.reset({ index: 0, routes: [{ name: Paths.Login }] });
      const parent = navigation.getParent?.();
      if (parent) parent.dispatch(action);
      else navigation.dispatch(action);
    }
  }, [navigation]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{ color: (variant === 'dark' ? (colors.gray50 as string) : (colors.gray800 as string)) }}
        onPress={onLogout}
      />
    </DrawerContentScrollView>
  );
}

export default function AppDrawer() {
  const ThemeToggle = () => {
    const { variant, changeTheme, colors } = useTheme();
    const isDark = variant === 'dark';
    const onToggle = useCallback(() => {
      changeTheme(isDark ? 'default' : 'dark');
    }, [changeTheme, isDark]);
    return (
      <Switch
        testID="theme-toggle"
        value={isDark}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: colors.gray400 as string }}
        thumbColor={isDark ? (colors.gray50 as string) : (colors.gray800 as string)}
      />
    );
  };

  return (
    <Drawer.Navigator drawerContent={(p) => <CustomDrawerContent {...p} />}>
      <Drawer.Screen
        component={AppTabs}
        name="App"
        options={({ route }) => ({
          title: getFocusedRouteNameFromRoute(route) ?? 'Home',
          headerRight: () => <ThemeToggle />,
        })}
      />
      <Drawer.Screen component={SettingsScreen} name="Settings" />
      <Drawer.Screen component={AddMoneyScreen} name="AddMoney" options={{ title: 'Add Money' }} />
    </Drawer.Navigator>
  );
}

