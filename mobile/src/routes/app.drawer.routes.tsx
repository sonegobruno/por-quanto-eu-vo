/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import nativeBaseTheme from 'styles/native-base-theme';
import { Car, House } from 'phosphor-react-native';
import { CarsList } from 'screens/CarsList';
import { Home } from '../screens/Home';
import { Drawer } from './components/Drawer';
import { drawerIconConfig } from './drawer.config';

const { Navigator, Screen } = createDrawerNavigator();

export function AppDrawerRoutes() {
  return (
    <Navigator
      drawerContent={props => <Drawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -15,
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: nativeBaseTheme.colors.primary[300],
        drawerActiveTintColor: nativeBaseTheme.colors.neutral[100],
        drawerInactiveBackgroundColor: 'transparent',
        drawerInactiveTintColor: nativeBaseTheme.colors.neutral[500],
        drawerPosition: 'right',
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Inicio',
          drawerIcon: ({ focused }) => <House {...drawerIconConfig(focused)} />,
        }}
      />
      <Screen
        name="CarsList"
        component={CarsList}
        options={{
          drawerLabel: 'Meus carros',
          drawerIcon: ({ focused }) => <Car {...drawerIconConfig(focused)} />,
        }}
      />
    </Navigator>
  );
}
