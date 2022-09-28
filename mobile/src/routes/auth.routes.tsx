import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateUser } from 'screens/CreateUser';
import { Login } from 'screens/Login';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
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
    </Navigator>
  );
}
