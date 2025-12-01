import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { api } from "../api/api";

export default function CadastroAlunoScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");

  async function salvarAluno() {
    if (!nome || !curso) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      const response = await api.post("/alunos", { nome, curso });

      Alert.alert(
        "Sucesso!",
        `Aluno cadastrado.\nEmail: ${response.data.usuario_gerado.email}\nSenha: ${response.data.usuario_gerado.senha_inicial}`
      );

      setNome("");
      setCurso("");

      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível cadastrar o aluno.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Aluno</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Curso"
        style={styles.input}
        value={curso}
        onChangeText={setCurso}
      />

      <Button title="Salvar" onPress={salvarAluno} color="#1e90ff" />
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
