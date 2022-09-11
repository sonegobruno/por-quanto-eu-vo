import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateUser } from 'screens/CreateUser';
import { Login } from 'screens/Login';
import { GasPriceShow } from '../screens/GasPriceShow';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="CreateUser"
        component={CreateUser}
        options={{
          headerTitle: 'Criar conta',
        }}
      />

      <Screen
        name="Home"
        component={Home}
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
