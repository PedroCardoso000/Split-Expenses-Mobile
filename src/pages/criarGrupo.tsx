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

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function CriarGrupo() {
  const navigation = useNavigation<NavigationProps>();
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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
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
