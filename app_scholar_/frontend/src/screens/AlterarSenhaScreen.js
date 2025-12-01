import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { api } from "../api/api";

export default function AlterarSenhaScreen({ navigation }) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  async function alterar() {
    if (!senhaAtual || !novaSenha) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      const response = await api.put("/usuarios/senha", {
        senhaAtual,
        novaSenha,
      });

      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      navigation.goBack();

    } catch (error) {
      console.log(error);

      if (error?.response?.status === 401) {
        return Alert.alert("Erro", "Senha atual incorreta.");
      }

      Alert.alert("Erro", "Não foi possível alterar a senha.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>

      <TextInput
        placeholder="Senha Atual"
        secureTextEntry
        style={styles.input}
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      <TextInput
        placeholder="Nova Senha"
        secureTextEntry
        style={styles.input}
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <Button title="Salvar" onPress={alterar} color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
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
