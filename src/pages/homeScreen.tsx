import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [groups, setGroups] = useState([
    { id: 1, nome: "Viagem Cancún" },
    { id: 2, nome: "Churrasco da Firma" },
    { id: 3, nome: "Turma da Faculdade" },
  ]);

  const removerGrupo = (id: number) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.title}>Meus Grupos</Text>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.groupWrapper}>
            <TouchableOpacity
              style={styles.groupCard}
              onPress={() =>
                navigation.navigate("GrupoDetalhes", { grupoDetalhe: item.id })
              }
              activeOpacity={0.85}
            >
              <Text style={styles.groupName}>{item.nome}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerGrupo(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CriarGrupo")}
      >
        <Text style={styles.floatingButtonText}>+ Novo Grupo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  groupWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  groupCard: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 12,
    color: "#d9534f",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
