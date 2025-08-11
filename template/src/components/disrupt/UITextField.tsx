import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export const UITextField: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      placeholderTextColor="#CCCCCC"
      {...props}
      style={[
        {
          padding: 12,
          borderRadius: 8,
          borderColor: '#444444',
          borderWidth: 1,
          color: '#FFFFFF',
          backgroundColor: '#1B1B1B',
        },
        props.style,
      ]}
    />
  );
};


