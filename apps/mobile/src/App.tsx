import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { MMKV } from 'react-native-mmkv';

import ApplicationNavigator from '@/navigation/Application';
import { ThemeProvider } from '@/theme';
import '@/translations';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={extendTheme({ config: { initialColorMode: 'dark' }, colors: { primary: { 500: '#ff0033' } } })}>
          <ThemeProvider storage={storage}>
            <ApplicationNavigator />
          </ThemeProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
