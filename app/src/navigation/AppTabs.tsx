import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from '@/theme';
import { Text, TouchableOpacity, View } from 'react-native';
import { Leaderboard, Profile } from '@/screens';
import PlayStack from '@/screens/Play/PlayStack';
import Results from '@/screens/Results/Results';
import Rewards from '@/screens/Rewards/Rewards';
import { PlusIcon, SquareIcon, TriangleIcon, CrossIcon, CircleIcon, DollarIcon, GemIcon, CrownIcon } from '@/components/disrupt/PixelIcons';
import { storage, StorageKeys } from '@/storage';
import { Paths } from '@/navigation/paths';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { variant } = useTheme();
  const isDark = variant === 'dark';
  const HeaderTop = () => {
    const { fonts } = useTheme();
    const navigation = require('@react-navigation/native').useNavigation();
    const [balance, setBalance] = React.useState<number>(Number(storage.getNumber(StorageKeys.walletBalance as any) || 0));
    const [gems, setGems] = React.useState<number>(Number(storage.getNumber(StorageKeys.walletGems as any) || 0));
    const [wins, setWins] = React.useState<number>(Number(storage.getNumber(StorageKeys.winsCount as any) || 0));
    React.useEffect(() => {
      const listener = storage.addOnValueChangedListener?.((changedKey) => {
        if (changedKey === StorageKeys.walletBalance) setBalance(Number(storage.getNumber(StorageKeys.walletBalance as any) || 0));
        if (changedKey === StorageKeys.walletGems) setGems(Number(storage.getNumber(StorageKeys.walletGems as any) || 0));
        if (changedKey === StorageKeys.winsCount) setWins(Number(storage.getNumber(StorageKeys.winsCount as any) || 0));
      });
      return () => listener?.remove?.();
    }, []);
    const winsDisplay = `${Math.min(10, Math.max(0, wins || 0))}/10`;
    return (
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Crown + wins progress */}
        <View style={{ width: '25%', alignItems: 'flex-start', flexDirection: 'row' }}>
          <CrownIcon size={20} color={'#FFD700'} />
          <Text style={[fonts.size_16 ?? fonts.size_12, fonts.bold, { color: isDark ? '#FFFFFF' : '#111111', marginLeft: 6 }]}>{winsDisplay}</Text>
        </View>
        {/* Center: Red diamond count */}
        <View style={{ width: '25%', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GemIcon size={18} color={'#FF3B30'} />
            <Text style={[fonts.size_16 ?? fonts.size_12, fonts.bold, { color: isDark ? '#FFFFFF' : '#111111', marginLeft: 6 }]}>{gems}</Text>
          </View>
        </View>
        {/* Right: Cash and Plus button (pixel Dollar icon to match Trophy) */}
        <View style={{ width: '25%', alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <DollarIcon size={18} color={'#00C853'} />
          <Text style={[fonts.size_16 ?? fonts.size_12, fonts.bold, { color: isDark ? '#FFFFFF' : '#111111', marginLeft: 6, marginRight: 6 }]}>
            ${balance.toFixed(2)}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Paths.AddMoneyModal as never)} style={{ paddingHorizontal: 8, paddingVertical: 8, borderRadius: 10, backgroundColor: isDark ? '#1C1C1C' : '#EFEFEF' }}>
            <PlusIcon size={16} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: () => <HeaderTop />,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: isDark ? '#000000' : '#FFFFFF' },
        tabBarIcon: ({ color }) => {
          const sizeByRoute: Record<string, number> = {
            Results: 28,
            Leaders: 32,
            Play: 40,
            Rewards: 32,
            Profile: 28,
          };
          const size = sizeByRoute[route.name] ?? 20;
          switch (route.name) {
            case 'Results':
              return <SquareIcon size={size} color={color as string} />;
            case 'Leaders':
              return <TriangleIcon size={size} color={color as string} />;
            case 'Play':
              return <CrossIcon size={size} color={color as string} />;
            case 'Rewards':
              return <DollarIcon size={size} color={color as string} />;
            case 'Profile':
              return <CircleIcon size={size} color={color as string} />;
            default:
              return <Text style={{ color, fontSize: 16 }}>•</Text>;
          }
        },
        tabBarActiveTintColor: isDark ? '#00CEC8' : '#00A5A0',
        tabBarInactiveTintColor: isDark ? '#5BAEA9' : '#7C7C7C',
        tabBarLabelStyle: { fontSize: 12, letterSpacing: 0.5 },
        tabBarStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
          borderTopColor: isDark ? '#000000' : '#EDEDED',
        },
      })}
    >
      <Tab.Screen name="Results" component={Results} />
      <Tab.Screen name="Leaders" component={Leaderboard} />
      <Tab.Screen name="Play" component={PlayStack} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

