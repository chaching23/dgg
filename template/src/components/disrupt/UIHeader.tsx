import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
};

export const UIHeader: React.FC<Props> = ({ title, onBack, showBack }) => {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 18, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between' }}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} style={{ backgroundColor: 'rgba(245,246,255,0.1)', height: 43, width: 43, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff' }}>{'<'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 44 }} />
      )}
      <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{title}</Text>
      <View style={{ width: 44 }} />
    </View>
  );
};





