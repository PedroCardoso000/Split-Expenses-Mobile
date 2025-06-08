import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { api } from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function CriarGrupo() {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuth();

  const [nomeGrupo, setNomeGrupo] = useState("");
  const [participantes, setParticipantes] = useState([""]);

  const adicionarCampo = () => {
    setParticipantes([...participantes, ""]);
  };

  const atualizarParticipante = (index: number, texto: string) => {
    const novosParticipantes = [...participantes];
    novosParticipantes[index] = texto;
    setParticipantes(novosParticipantes);
  };

  const removerCampo = (index: number) => {
    const novosParticipantes = participantes.filter((_, i) => i !== index);
    setParticipantes(novosParticipantes);
  };

  const criarGrupo = async () => {
    if (!nomeGrupo.trim() || participantes.some((p) => !p.trim())) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const body = {
      name: nomeGrupo,
      participants: participantes.map((nome) => ({ name: nome })),
    };

    try {
      const response = await api.post("/group", body, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.status === 201) {
        Alert.alert("Grupo criado com sucesso!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro ao criar grupo");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao se comunicar com o servidor");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Novo Grupo</Text>

      <Text style={styles.label}>Nome do Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Viagem para a Praia"
        value={nomeGrupo}
        onChangeText={setNomeGrupo}
      />

      <Text style={styles.label}>Participantes</Text>
      {participantes.map((nome, index) => (
        <View key={index} style={styles.participanteContainer}>
          <TextInput
            style={styles.participanteInput}
            placeholder={`Participante ${index + 1}`}
            value={nome}
            onChangeText={(text) => atualizarParticipante(index, text)}
          />
          {participantes.length > 1 && (
            <TouchableOpacity onPress={() => removerCampo(index)}>
              <Text style={styles.removerTexto}>Remover</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={adicionarCampo}>
        <Text style={styles.adicionarTexto}>+ Adicionar Participante</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={criarGrupo}>
        <Text style={styles.buttonText}>Criar Grupo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    backgroundColor: "#f9f9f9",
  },
  participanteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  participanteInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  removerTexto: {
    marginLeft: 12,
    color: "#d9534f",
    fontWeight: "600",
  },
  adicionarTexto: {
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
