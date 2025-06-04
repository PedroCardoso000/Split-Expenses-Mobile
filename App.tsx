import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/pages/loginScreen";
import CadastroScreen from "./src/pages/cadastroscreen";
import HomeScreen from "./src/pages/homeScreen";
import GrupoDetalhes from "./src/pages/grupoDetalhes";
import CriarGrupo from "./src/pages/criarGrupo";
import CriarDespesa from "./src/pages/criarDespesas";
import { AuthProvider } from "./src/contexts/AuthContext";

const Stack = createNativeStackNavigator();

/**
 * Componente principal da aplica o, que renderiza o navigation container e
 * define as telas que ser o renderizadas
 * 
 * As telas definidas s o:
 * - Login: tela de login
 * - Cadastro: tela de cadastro de usu rio
 * - Home: tela principal, lista os grupos do usu rio
 * - GrupoDetalhes: tela de detalhes de um grupo
 * - CriarGrupo: tela de criar um novo grupo
 * - CriarDespesa: tela de criar uma nova despesa
 * 
 * @returns JSX.Element
 */

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  GrupoDetalhes: { grupoDetalhe: number };
  CriarGrupo: undefined;
  CriarDespesa: undefined;
};


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GrupoDetalhes"
            component={(grupoDetalhe: any) => GrupoDetalhes(grupoDetalhe)}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CriarGrupo"
            component={CriarGrupo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CriarDespesa"
            component={CriarDespesa}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>

  );
}
