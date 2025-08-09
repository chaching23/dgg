import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import AppTabs from './AppTabs';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { useAuthController } from '@/hooks';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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

function LogoutScreen() {
  const { logout } = useAuthController();
  const { layout, gutters, fonts } = useTheme();
  return (
    <View style={[layout.flex_1, gutters.padding_24]}>
      <Text style={[fonts.size_24, gutters.marginBottom_16]}>Logout</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Confirm Logout</Text>
      </TouchableOpacity>
    </View>
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
    <Drawer.Navigator>
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
      <Drawer.Screen component={LogoutScreen} name="Logout" />
    </Drawer.Navigator>
  );
}

