import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AppTabs from './AppTabs';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { useAuthController } from '@/hooks';

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
  return (
    <Drawer.Navigator>
      <Drawer.Screen component={AppTabs} name="App" options={{ title: 'App' }} />
      <Drawer.Screen component={SettingsScreen} name="Settings" />
      <Drawer.Screen component={AddMoneyScreen} name="AddMoney" options={{ title: 'Add Money' }} />
      <Drawer.Screen component={LogoutScreen} name="Logout" />
    </Drawer.Navigator>
  );
}

