import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import AppHooksProvider from 'hooks';
import { Routes } from './src/routes';
import AppProviders from './src/context';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AppProviders>
      <AppHooksProvider>
        <Routes />
      </AppHooksProvider>
    </AppProviders>
  );
}
