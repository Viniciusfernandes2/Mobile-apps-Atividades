import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import CadastroAlunoScreen from "../screens/CadastroAlunoScreen";
import CadastroProfessorScreen from "../screens/CadastroProfessorScreen";
import CadastroDisciplinaScreen from "../screens/CadastroDisciplinaScreen";
import LancarNotaScreen from "../screens/LancarNotaScreen";
import BoletimScreen from "../screens/BoletimScreen";
import PerfilScreen from "../screens/PerfilScreen";
import AlterarSenhaScreen from "../screens/AlterarSenhaScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="CadastroAluno" component={CadastroAlunoScreen} />
        <Stack.Screen name="CadastroProfessor" component={CadastroProfessorScreen} />
        <Stack.Screen name="CadastroDisciplina" component={CadastroDisciplinaScreen} />

        <Stack.Screen name="LancarNota" component={LancarNotaScreen} />
        <Stack.Screen name="Boletim" component={BoletimScreen} />
        <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
