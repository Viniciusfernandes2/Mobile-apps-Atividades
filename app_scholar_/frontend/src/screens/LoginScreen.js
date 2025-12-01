import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      const response = await api.post("/auth/login", { email, senha });

      // Salvar token, perfil, userId, nome e email localmente
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("perfil", response.data.perfil);
      await AsyncStorage.setItem("userId", String(response.data.user.id));
      await AsyncStorage.setItem("userNome", response.data.user.nome);
      await AsyncStorage.setItem("userEmail", response.data.user.email);

      Alert.alert("Sucesso!", "Login realizado.");
      navigation.replace("Home");

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={handleLogin} color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});
