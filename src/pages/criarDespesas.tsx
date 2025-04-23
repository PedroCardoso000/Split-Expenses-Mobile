import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function CriarDespesa({ navigation }: any) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [responsavelId, setResponsavelId] = useState('');

  const usuarios = [
    { id: '1', nome: 'João' },
    { id: '2', nome: 'Maria' },
    { id: '3', nome: 'Pedro' },
  ];

  const handleCriarDespesa = () => {
    if (!descricao.trim() || !valor.trim() || !responsavelId) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    // Aqui iria a requisição para salvar a despesa

    Alert.alert('Sucesso', 'Despesa criada com sucesso!');
    navigation.goBack(); // Retorna para a tela anterior (GrupoDetalhes)
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Despesa</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Jantar no restaurante"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor Total</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150.00"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Responsável</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={responsavelId}
          onValueChange={(itemValue) => setResponsavelId(itemValue)}
        >
          <Picker.Item label="Selecione um usuário" value="" />
          {usuarios.map((usuario) => (
            <Picker.Item key={usuario.id} label={usuario.nome} value={usuario.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCriarDespesa}>
        <Text style={styles.buttonText}>Salvar Despesa</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
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
