import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { api } from "../api/api";
import PickerWeb from "../utils/PickerWeb";

export default function LancarNotaScreen({ navigation }) {
  const [alunoId, setAlunoId] = useState(0);
  const [disciplinaId, setDisciplinaId] = useState(0);
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");

  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const a = await api.get("/alunos");
        const d = await api.get("/disciplinas");

        setAlunos(a.data);
        setDisciplinas(d.data);

      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível carregar os dados.");
      }
    }
    carregarDados();
  }, []);

  async function salvarNota() {
    if (alunoId === 0 || disciplinaId === 0 || !nota1 || !nota2) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      await api.post("/notas", {
        alunoId: Number(alunoId),
        disciplinaId: Number(disciplinaId),
        nota1: Number(nota1),
        nota2: Number(nota2),
      });

      Alert.alert("Sucesso!", "Nota lançada com sucesso!");

      setAlunoId(0);
      setDisciplinaId(0);
      setNota1("");
      setNota2("");

      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível lançar a nota.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lançar Nota</Text>

      <Text style={styles.label}>Aluno:</Text>
      <PickerWeb
        selectedValue={alunoId}
        onValueChange={setAlunoId}
        items={[
          { label: "Selecione o aluno", value: 0 },
          ...alunos.map((a) => ({ label: a.nome, value: a.id })),
        ]}
      />

      <Text style={styles.label}>Disciplina:</Text>
      <PickerWeb
        selectedValue={disciplinaId}
        onValueChange={setDisciplinaId}
        items={[
          { label: "Selecione a disciplina", value: 0 },
          ...disciplinas.map((d) => ({ label: d.nome, value: d.id })),
        ]}
      />

      <TextInput
        placeholder="Nota 1"
        style={styles.input}
        keyboardType="numeric"
        value={nota1}
        onChangeText={setNota1}
      />

      <TextInput
        placeholder="Nota 2"
        style={styles.input}
        keyboardType="numeric"
        value={nota2}
        onChangeText={setNota2}
      />

      <Button title="Salvar" onPress={salvarNota} color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});
