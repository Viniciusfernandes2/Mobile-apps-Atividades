import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    async function carregarDados() {
      const n = await AsyncStorage.getItem("userNome");
      const e = await AsyncStorage.getItem("userEmail");
      const p = await AsyncStorage.getItem("perfil");

      setNome(n || "");
      setEmail(e || "");
      setPerfil(p || "");
    }
    carregarDados();
  }, []);

  async function logout() {
    await AsyncStorage.clear();
    Alert.alert("Logout", "Você saiu do sistema.");
    navigation.replace("Login");
  }

  // Avatar = primeira letra do nome
  const avatarLetra = nome ? nome.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{avatarLetra}</Text>
      </View>

      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.perfil}>Perfil: {perfil}</Text>

      <View style={{ marginTop: 25 }}>
        <Button
          title="Alterar Senha"
          onPress={() => navigation.navigate("AlterarSenha")}
          color="#1e90ff"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Sair" color="red" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#4a90e2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginTop: 6,
  },
  perfil: {
    fontSize: 16,
    marginTop: 3,
    fontStyle: "italic",
  },
});
