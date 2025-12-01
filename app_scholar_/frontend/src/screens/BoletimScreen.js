import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/api";

export default function BoletimScreen() {
  const [perfil, setPerfil] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [boletim, setBoletim] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      const p = await AsyncStorage.getItem("perfil");
      const userId = await AsyncStorage.getItem("userId");

      setPerfil(p);

      if (p === "aluno") {
        // aluno vê o próprio boletim
        setAlunoId(userId);
      }
    }
    carregarDados();
  }, []);

  async function buscarBoletim() {
    if (!alunoId) {
      return Alert.alert("Erro", "Informe o ID do aluno.");
    }

    try {
      const response = await api.get(`/boletim/${alunoId}`);
      setBoletim(response.data);

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar o boletim.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Boletim</Text>

      {(perfil === "admin" || perfil === "professor") && (
        <>
          <TextInput
            placeholder="ID do aluno"
            style={styles.input}
            keyboardType="numeric"
            value={alunoId}
            onChangeText={setAlunoId}
          />

          <Button title="Buscar Boletim" onPress={buscarBoletim} />
        </>
      )}

      {perfil === "aluno" && (
        <Button title="Carregar Meu Boletim" onPress={buscarBoletim} />
      )}

      <View style={{ marginTop: 20 }}>
        {boletim && (
          <>
            <Text style={styles.sectionTitle}>Aluno</Text>
            <Text>Nome: {boletim.aluno.nome}</Text>
            <Text>Matrícula: {boletim.aluno.matricula}</Text>
            <Text>Curso: {boletim.aluno.curso}</Text>

            <Text style={styles.sectionTitle}>Notas</Text>

            {boletim.boletim.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{item.disciplina}</Text>
                <Text>Nota 1: {item.nota1}</Text>
                <Text>Nota 2: {item.nota2}</Text>
                <Text>Média: {item.media}</Text>
                <Text>Situação: {item.situacao}</Text>
              </View>
            ))}

            <Text style={styles.final}>
              Situação Final: {boletim.situacao_geral}
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  final: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
