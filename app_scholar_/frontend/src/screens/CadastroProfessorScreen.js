import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { api } from "../api/api";

export default function CadastroProfessorScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [titulacao, setTitulacao] = useState("");
  const [tempoDocencia, setTempoDocencia] = useState("");

  async function salvarProfessor() {
    if (!nome || !titulacao || !tempoDocencia) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      const response = await api.post("/professores", {
        nome,
        titulacao,
        tempoDocencia,
      });

      Alert.alert(
        "Sucesso!",
        `Professor cadastrado.\nEmail: ${response.data.usuario_gerado.email}\nSenha: ${response.data.usuario_gerado.senha_inicial}`
      );

      setNome("");
      setTitulacao("");
      setTempoDocencia("");

      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível cadastrar o professor.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Professor</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Titulação (ex: Mestre em TI)"
        style={styles.input}
        value={titulacao}
        onChangeText={setTitulacao}
      />

      <TextInput
        placeholder="Tempo de Docência (anos)"
        style={styles.input}
        keyboardType="numeric"
        value={tempoDocencia}
        onChangeText={setTempoDocencia}
      />

      <Button title="Salvar" onPress={salvarProfessor} color="#1e90ff" />
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
