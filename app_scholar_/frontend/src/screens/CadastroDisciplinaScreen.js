import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { api } from "../api/api";
import PickerWeb from "../utils/PickerWeb";

export default function CadastroDisciplinaScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [professorId, setProfessorId] = useState(0);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    async function carregarProfessores() {
      try {
        const response = await api.get("/professores");
        setProfessores(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível carregar os professores.");
      }
    }
    carregarProfessores();
  }, []);

  async function salvarDisciplina() {
    if (!nome || !cargaHoraria || professorId === 0) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      await api.post("/disciplinas", {
        nome,
        cargaHoraria: Number(cargaHoraria),
        professorId: Number(professorId),
      });

      Alert.alert("Sucesso!", "Disciplina cadastrada!");

      setNome("");
      setCargaHoraria("");
      setProfessorId(0);

      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao cadastrar disciplina.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Disciplina</Text>

      <TextInput
        placeholder="Nome da disciplina"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Carga Horária"
        style={styles.input}
        keyboardType="numeric"
        value={cargaHoraria}
        onChangeText={setCargaHoraria}
      />

      <Text style={styles.label}>Professor responsável:</Text>
      <PickerWeb
        selectedValue={professorId}
        onValueChange={setProfessorId}
        items={[
          { label: "Selecione um professor", value: 0 },
          ...professores.map((p) => ({ label: p.nome, value: p.id })),
        ]}
      />

      <Button title="Salvar" onPress={salvarDisciplina} color="#1e90ff" />
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
