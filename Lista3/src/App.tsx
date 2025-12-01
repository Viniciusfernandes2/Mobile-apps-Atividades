import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// Importações das telas
import Um from "./screens/Exercise1";
import Dois from "./screens/Exercise2";
import Tres from "./screens/Exercise3";
import Quatro from "./screens/Exercise4";
import Cinco from "./screens/Exercise5";
import Seis from "./screens/Exercise6";
import Sete from "./screens/Exercise7";
import Oito from "./screens/Exercise8";

// Correção: forçar um ID único p/ evitar erro de tipagem do React Navigation 7
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        id="DrawerRoot" // <-- ESSENCIAL para remover o erro "id missing"
        initialRouteName="Exercício 1"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#ffffff",
            width: 280,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "500",
          },
          drawerActiveTintColor: "#6366f1",
          drawerInactiveTintColor: "#64748b",
        }}
      >
        <Drawer.Screen
          name="Exercício 1"
          component={Um}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="play-circle" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 2"
          component={Dois}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="call" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 3"
          component={Tres}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="logo-instagram" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 4"
          component={Quatro}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 5"
          component={Cinco}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 6"
          component={Seis}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="camera" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 7"
          component={Sete}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="images" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Exercício 8"
          component={Oito}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="trash" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
