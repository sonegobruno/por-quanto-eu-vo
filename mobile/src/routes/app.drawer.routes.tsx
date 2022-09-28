/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

import { theme } from 'styles/theme';
import { Home } from '../screens/Home';
import { CustomDrawer } from './CustomDrawer';

const { Navigator, Screen } = createDrawerNavigator();

export function AppDrawerRoutes() {
  return (
    <Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerIcon: () => (
          <MaterialIcons
            name="home"
            size={24}
            color={theme.colors.neutral_100}
          />
        ),
        drawerLabel: 'Inicio',
        drawerLabelStyle: {
          color: theme.colors.neutral_100,
          marginLeft: -15,
        },
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: theme.colors.primary_300,
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
