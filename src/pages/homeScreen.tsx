import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import { api } from "../api/axios"; // ajuste o path se necessário

export default function HomeScreen({ navigation }: any) {
  const [groups, setGroups] = useState([]);

  // useEffect(() => {
  //   // Exemplo de chamada à API (substituir ID pelo do usuário logado)
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await api.get("/grupos/usuario/1");
  //       setGroups(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar grupos", error);
  //     }
  //   };

  //   fetchGroups();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Grupos</Text>

      <FlatList
        data={groups}
        keyExtractor={(item : any) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() =>
              navigation.navigate("GrupoDetalhes", { grupoId: item.id })
            }
          >
            <Text style={styles.groupName}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CriarGrupo")}
      >
        <Text style={styles.buttonText}>+ Novo Grupo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  groupItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    marginBottom: 12,
  },
  groupName: { fontSize: 18 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
