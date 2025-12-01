import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useCep } from '../hooks/useCep';

export default function HistoricoCep() {
  const { historico } = useCep();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Histórico de Consultas</Text>

      {historico.length === 0 ? (
        <Text style={styles.empty}>Nenhum CEP consultado ainda.</Text>
      ) : (
        <ScrollView style={styles.scroll}>
          {historico.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.cep}>CEP: {item.cep}</Text>
              <Text>Logradouro: {item.logradouro}</Text>
              <Text>Bairro: {item.bairro}</Text>
              <Text>Cidade: {item.localidade}</Text>
              <Text>UF: {item.uf}</Text>
            </View>
          ))}
        </ScrollView>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  scroll: {
    marginTop: 10,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cep: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
