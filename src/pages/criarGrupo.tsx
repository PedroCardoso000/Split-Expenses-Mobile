import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function CriarGrupo({ navigation }: any) {
  const [nomeGrupo, setNomeGrupo] = useState("");

  // const criarGrupo = async () => {
  //   if (!nomeGrupo.trim()) {
  //     Alert.alert("Erro", "Informe o nome do grupo.");
  //     return;
  //   }

  //   try {
  //     await axios.post("/grupos", {
  //       nome: nomeGrupo,
  //       criadoPorId: 1, // coloque aqui o ID do usuário logado
  //     });
  //     Alert.alert("Sucesso", "Grupo criado com sucesso!");
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error("Erro ao criar grupo:", error);
  //     Alert.alert("Erro", "Não foi possível criar o grupo.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do grupo"
        value={nomeGrupo}
        onChangeText={setNomeGrupo}
      />
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Criar Grupo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
