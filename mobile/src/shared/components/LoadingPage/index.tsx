import { View } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import nativeBaseTheme from 'styles/native-base-theme';
import { StatusBar } from '../StatusBar';

export function LoadingPage() {
  return (
    <>
      <StatusBar
        style="dark"
        translucent
        backgroundColor={nativeBaseTheme.colors.neutral[100]}
      />
      <View
        bg="neutral.100"
        flex="1"
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator
          color={nativeBaseTheme.colors.primary[500]}
          size={32}
        />
      </View>
    </>
  );
}
