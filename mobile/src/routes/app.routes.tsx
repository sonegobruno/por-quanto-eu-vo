import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateCar } from 'screens/CreateCar';
import { GasPriceShow } from '../screens/GasPriceShow';
import { AppDrawerRoutes } from './app.drawer.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="Drawer"
        component={AppDrawerRoutes}
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

      <Screen
        name="CreateCar"
        component={CreateCar}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
