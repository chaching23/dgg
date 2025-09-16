import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { Login, Signup, Startup } from '@/screens';
import GameMatch from '@/screens/Play/GameMatch';
import AddMoney from '@/screens/Wallet/AddMoney';
import Settings from '@/screens/Settings/Settings';
import CashOut from '@/screens/Wallet/CashOut';
import { storage, StorageKeys } from '@/storage';
import AppTabs from '@/navigation/AppTabs';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  const token = storage.getString(StorageKeys.authToken);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Startup} name={Paths.Startup} />
          {token ? (
            <>
              <Stack.Screen component={AppTabs} name={Paths.Example} />
              <Stack.Screen
                component={AddMoney}
                name={Paths.AddMoneyModal}
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#000000' },
                  headerTitle: 'Add Money',
                  headerTintColor: '#FFFFFF',
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                component={Settings}
                name={Paths.Settings}
                options={{
                  presentation: 'card',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#000000' },
                  headerTintColor: '#FFFFFF',
                  headerShadowVisible: false,
                  headerTitle: '',
                  headerBackTitle: 'Back',
                  headerBackTitleVisible: true,
                }}
              />
              <Stack.Screen
                component={CashOut}
                name={Paths.CashOut}
                options={{
                  presentation: 'card',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#000000' },
                  headerTintColor: '#FFFFFF',
                  headerShadowVisible: false,
                  headerTitle: '',
                  headerBackTitle: 'Back',
                  headerBackTitleVisible: true,
                }}
              />
              <Stack.Screen component={GameMatch} name={Paths.GameMatch} />
            </>
          ) : (
            <>
              <Stack.Screen component={Login} name={Paths.Login} />
              <Stack.Screen component={Signup} name={Paths.Signup} />
              <Stack.Screen component={AppTabs} name={Paths.Example} />
              <Stack.Screen
                component={AddMoney}
                name={Paths.AddMoneyModal}
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#000000' },
                  headerTitle: 'Add Money',
                  headerTintColor: '#FFFFFF',
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                component={Settings}
                name={Paths.Settings}
                options={{
                  presentation: 'card',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#000000' },
                  headerTintColor: '#FFFFFF',
                  headerShadowVisible: false,
                  headerTitle: '',
                  headerBackTitle: 'Back',
                  headerBackTitleVisible: true,
                }}
              />
              <Stack.Screen
                component={CashOut}
                name={Paths.CashOut}
                options={{
                  presentation: 'card',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#000000' },
                  headerTintColor: '#FFFFFF',
                  headerShadowVisible: false,
                  headerTitle: '',
                  headerBackTitle: 'Back',
                  headerBackTitleVisible: true,
                }}
              />
              <Stack.Screen component={GameMatch} name={Paths.GameMatch} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
