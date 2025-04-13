import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/pages/loginScreen';
import CadastroScreen from './src/pages/cadastroscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
