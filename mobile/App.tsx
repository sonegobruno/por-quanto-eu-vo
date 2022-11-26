import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

import AppHooksProvider from 'hooks';
import { LogBox } from 'react-native';
import { Routes } from './src/routes';
import AppProviders from './src/context';

LogBox.ignoreLogs(['Setting a timer']);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => {
        setAppIsReady(true);
      });
    }
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AppProviders>
      <AppHooksProvider>
        <Routes />
      </AppHooksProvider>
    </AppProviders>
  );
}
