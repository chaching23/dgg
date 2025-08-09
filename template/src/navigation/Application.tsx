import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { Login, Signup, Startup } from '@/screens';
import { storage, StorageKeys } from '@/storage';
import AppDrawer from '@/navigation/AppDrawer';

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
            <Stack.Screen component={AppDrawer} name={Paths.Example} />
          ) : (
            <>
              <Stack.Screen component={Login} name={Paths.Login} />
              <Stack.Screen component={Signup} name={Paths.Signup} />
              <Stack.Screen component={AppDrawer} name={Paths.Example} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
