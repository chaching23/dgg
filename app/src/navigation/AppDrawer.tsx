import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import AppTabs from './AppTabs';
// AddMoney now shown as a modal, not as a drawer item
import { Alert, Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { supabase } from '@/services/instance';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { storage, StorageKeys } from '@/storage';
import { DollarIcon, GemIcon, MenuIcon, PlusIcon } from '@/components/disrupt/PixelIcons';
import { Paths } from '@/navigation/paths';

const Drawer = createDrawerNavigator();

function SettingsScreen() {
  const { layout, gutters, fonts } = useTheme();
  return (
    <View style={[layout.flex_1, gutters.padding_24]}>
      <Text style={[fonts.size_24]}>Settings</Text>
    </View>
  );
}

// Moved real screen to screens/Wallet/AddMoney

function CustomDrawerContent(props: any) {
  const { colors, variant, changeTheme } = useTheme();
  const navigation = useNavigation();
  const onLogout = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const emailConfirmed = Boolean((data.user as any)?.email_confirmed_at);
      const proceed = async () => {
        storage.delete(StorageKeys.authToken);
        await supabase.auth.signOut();
        const action = CommonActions.reset({ index: 0, routes: [{ name: Paths.Startup }] });
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
      const action = CommonActions.reset({ index: 0, routes: [{ name: Paths.Startup }] });
      const parent = navigation.getParent?.();
      if (parent) parent.dispatch(action);
      else navigation.dispatch(action);
    }
  }, [navigation]);

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile header */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#222' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('@/assets/branding/DisruptP.png')} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 10 }} />
          <View>
            <Text style={{ color: colors.gray50 as string, fontWeight: '700' }}>@{storage.getString(StorageKeys.username) || 'guest'}</Text>
            <Text style={{ color: colors.gray400 as string }}>👑 {storage.getNumber(StorageKeys.winsCount as any) || 0}</Text>
          </View>
        </View>
      </View>

      <DrawerItemList {...props} />

      <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: variant === 'dark' ? (colors.gray50 as string) : (colors.gray800 as string), fontWeight: '600' }}>Theme</Text>
        <Switch
          value={variant === 'dark'}
          onValueChange={() => changeTheme(variant === 'dark' ? 'default' : 'dark')}
          trackColor={{ false: '#767577', true: colors.gray400 as string }}
          thumbColor={variant === 'dark' ? (colors.gray50 as string) : (colors.gray800 as string)}
        />
      </View>
      <DrawerItem
        label="Logout"
        labelStyle={{ color: (variant === 'dark' ? (colors.gray50 as string) : (colors.gray800 as string)) }}
        onPress={onLogout}
      />
    </DrawerContentScrollView>
  );
}

export default function AppDrawer() {
  // Center header: Gems
  // Deprecated: we now render a 4-way header layout inline
  // Removed unused header helper (inlined below).

  // Right header: Cash + Plus
  const HeaderRightCashPlus = () => {
    const { fonts, variant } = useTheme();
    const navigation = useNavigation();
    const [balance, setBalance] = React.useState<number>(storage.getNumber(StorageKeys.walletBalance as any) || 0);
    React.useEffect(() => {
      const listener = storage.addOnValueChangedListener?.((changedKey) => {
        if (changedKey === StorageKeys.walletBalance) setBalance(storage.getNumber(StorageKeys.walletBalance as any) || 0);
      });
      return () => listener?.remove?.();
    }, []);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <DollarIcon size={18} color={'#00C853'} />
        <Text style={[fonts.size_16, fonts.bold, { color: variant === 'dark' ? '#FFFFFF' : '#111111', marginLeft: 6, marginRight: 6 }]}>${balance.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(Paths.AddMoneyModal as never)} style={{ paddingHorizontal: 8, paddingVertical: 8, borderRadius: 10, backgroundColor: variant === 'dark' ? '#1C1C1C' : '#EFEFEF' }}>
          <PlusIcon size={16} />
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <Drawer.Navigator drawerContent={(p) => <CustomDrawerContent {...p} />}>
      <Drawer.Screen
        component={AppTabs}
        name="App"
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {/* Left: Hamburger */}
              <View style={{ width: '25%', alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingHorizontal: 12 }}>
                  <MenuIcon size={20} />
                </TouchableOpacity>
              </View>
              {/* Ruby: icon + number (red number) */}
              <View style={{ width: '25%', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <GemIcon size={18} />
                  <Text style={{ color: '#FF3B30', fontWeight: '700', marginLeft: 6 }}>{storage.getNumber(StorageKeys.walletGems as any) || 0}</Text>
                </View>
              </View>
              {/* Spacer slot to keep 3-item layout */}
              <View style={{ width: '25%' }} />
              {/* Right: Cash + plus */}
              <View style={{ width: '25%', alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <HeaderRightCashPlus />
              </View>
            </View>
          ),
          headerLeft: () => null,
          headerRight: () => null,
          headerStyle: { backgroundColor: useTheme().variant === 'dark' ? '#000000' : '#FFFFFF' },
          headerShadowVisible: false,
        })}
      />
      <Drawer.Screen component={SettingsScreen} name="Settings" options={{ headerStyle: { backgroundColor: useTheme().variant === 'dark' ? '#000000' : '#FFFFFF' }, headerShadowVisible: false }} />
    </Drawer.Navigator>
  );
}

