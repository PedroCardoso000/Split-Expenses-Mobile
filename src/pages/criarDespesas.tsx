import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../api/axios";

export default function CriarDespesa({ navigation, route }: any) {
  const { user } = useAuth();
  const grupoId = route.params?.grupoId;

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const handleCriarDespesa = async () => {
    if (!descricao.trim() || !valor.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post(
        "/api/v1/expense",
        {
          description: descricao,
          total: parseFloat(valor),
          groupId: parseInt(grupoId),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Despesa criada com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível criar a despesa.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro de conexão",
        "Não foi possível comunicar com o servidor."
      );
    }
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

      <TouchableOpacity style={styles.button} onPress={handleCriarDespesa}>
        <Text style={styles.buttonText}>Salvar Despesa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#4CAF50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
