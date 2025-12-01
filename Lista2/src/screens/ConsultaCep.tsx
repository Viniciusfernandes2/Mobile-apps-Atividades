import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useCep } from '../hooks/useCep';

export default function ConsultaCep() {
  const { cep, setCep, resultado, consultarCep } = useCep();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={8}
      />

      <TouchableOpacity style={styles.button} onPress={consultarCep}>
        <Text style={styles.buttonText}>Obter</Text>
      </TouchableOpacity>

      {/* Área de resultado */}
      {resultado && (
        <View style={styles.resultContainer}>
          {resultado.erro ? (
            <Text style={styles.error}>CEP inválido!</Text>
          ) : (
            <>
              <Text style={styles.resultText}>CEP: {resultado.cep}</Text>
              <Text style={styles.resultText}>Logradouro: {resultado.logradouro}</Text>
              <Text style={styles.resultText}>Bairro: {resultado.bairro}</Text>
              <Text style={styles.resultText}>Cidade: {resultado.localidade}</Text>
              <Text style={styles.resultText}>UF: {resultado.uf}</Text>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 25,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
    textAlign: 'center',
  },
});
