import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [perfil, setPerfil] = useState("");
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function carregarPerfil() {
      const p = await AsyncStorage.getItem("perfil");
      const userId = await AsyncStorage.getItem("userId");
      setPerfil(p);

      // Você pode carregar o nome no futuro da API /me
      setNome(`Usuário ${userId}`);
    }
    carregarPerfil();
  }, []);

  async function logout() {
    await AsyncStorage.clear();
    Alert.alert("Logout", "Você saiu do sistema.");
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Perfil: {perfil}</Text>

      {perfil === "admin" && (
        <>
          <Button
            title="Cadastrar Aluno"
            onPress={() => navigation.navigate("CadastroAluno")}
          />
          <View style={{ margin: 6 }} />

          <Button
            title="Cadastrar Professor"
            onPress={() => navigation.navigate("CadastroProfessor")}
          />
          <View style={{ margin: 6 }} />

          <Button
            title="Cadastrar Disciplina"
            onPress={() => navigation.navigate("CadastroDisciplina")}
          />
          <View style={{ margin: 6 }} />

          <Button
            title="Lançar Nota"
            onPress={() => navigation.navigate("LancarNota")}
          />
          <View style={{ margin: 6 }} />

          <Button
            title="Boletim"
            onPress={() => navigation.navigate("Boletim")}
          />
        </>
      )}

      {perfil === "professor" && (
        <>
          <Button
            title="Lançar Nota"
            onPress={() => navigation.navigate("LancarNota")}
          />
        </>
      )}

      {perfil === "aluno" && (
        <>
          <Button
            title="Boletim"
            onPress={() => navigation.navigate("Boletim")}
          />
        </>
      )}
      <Button
        title="Meu Perfil"
        onPress={() => navigation.navigate("Perfil")}
      />
      <View style={{ margin: 10 }} />

      <View style={{ marginTop: 20 }} />

      <Button title="Sair" color="red" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
});
