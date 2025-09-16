import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GemIcon, MenuIcon, PlusIcon } from '@/components/disrupt/PixelIcons';
import { useTheme } from '@/theme';
import { storage, StorageKeys } from '@/storage';

type Props = {
  onPressAdd?: () => void;
  onPressMenu?: () => void;
};

export default function TopHeader({ onPressAdd, onPressMenu }: Props) {
  const { fonts } = useTheme();
  const { navigate } = require('@react-navigation/native').useNavigation();

  // const username = storage.getString(StorageKeys.username) || 'Guest';
  // wins kept in storage; not displayed in top header per design
  const [gems, setGems] = useState<number>(storage.getNumber(StorageKeys.walletGems as any) || 0);
  const [dollars, setDollars] = useState<number>(storage.getNumber(StorageKeys.walletBalance as any) || 0);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener?.((changedKey) => {
      if (changedKey === StorageKeys.walletGems) setGems(storage.getNumber(StorageKeys.walletGems as any) || 0);
      if (changedKey === StorageKeys.walletBalance) setDollars(storage.getNumber(StorageKeys.walletBalance as any) || 0);
    });
    return () => {
      listener?.remove?.();
    };
  }, []);

  // const winsText = useMemo(() => `${wins}/10`, [wins]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 }}>
      {/* Left: Menu */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPressMenu} style={{ padding: 8 }}>
          <MenuIcon size={20} />
        </TouchableOpacity>
      </View>

      {/* Center: Gems */}
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <GemIcon size={18} />
        <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginLeft: 6 }]}>{gems}</Text>
      </View>

      {/* Right: Diamonds + plus */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <GemIcon size={18} color={'#66E0FF'} />
        <Text style={[fonts.size_16, fonts.bold, { color: '#FFFFFF', marginLeft: 6, marginRight: 6 }]}>{gems}</Text>
        <TouchableOpacity onPress={() => (onPressAdd ? onPressAdd() : navigate('addMoneyModal'))} style={{ paddingHorizontal: 8, paddingVertical: 8, borderRadius: 10, backgroundColor: '#0E3B1F' }}>
          <PlusIcon size={16} color={'#00E676'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


