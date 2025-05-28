import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'GrupoDetalhes'>;

export default function GrupoDetalhes({ navigation, route }: Props) {
  const { grupoDetalhe } = route.params;

  const participantes = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Pedro' },
  ];

  const despesas = [
    { id: 1, descricao: 'Pizza', valorTotal: 90.0 },
    { id: 2, descricao: 'Uber', valorTotal: 45.5 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Grupo #{grupoDetalhe}</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>👥 Participantes</Text>
        {participantes.map((p) => (
          <View key={p.id} style={styles.card}>
            <Text style={styles.cardText}>{p.nome}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>💸 Despesas</Text>
        {despesas.map((d) => (
          <View key={d.id} style={styles.card}>
            <Text style={styles.cardTextBold}>{d.descricao}</Text>
            <Text style={styles.cardText}>R$ {d.valorTotal.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CriarDespesa')}
      >
        <Text style={styles.buttonText}>+ Nova Despesa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
  },
  cardTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
