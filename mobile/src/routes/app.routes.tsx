import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateUser } from 'screens/CreateUser';
import { GasPriceShow } from '../screens/GasPriceShow';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="CreateUser"
        component={CreateUser}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="GasPriceShow"
        component={GasPriceShow}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
