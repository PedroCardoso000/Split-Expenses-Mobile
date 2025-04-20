import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../services/api';

export default function GrupoDetalhes({ route, navigation }: any) {
    const { grupoId } = route.params;
    const [grupo, setGrupo] = useState<any>({});
    const [participantes, setParticipantes] = useState([]);
    const [despesas, setDespesas] = useState([]);

    useEffect(() => {
        const fetchGrupo = async () => {
            try {
                const grupoRes = await api.get(/grupos/${grupoId});
                const partRes = await api.get(/participantes/grupo/${grupoId});
                const despesaRes = await api.get(/despesas/grupo/${grupoId});

                setGrupo(grupoRes.data);
                setParticipantes(partRes.data);
                setDespesas(despesaRes.data);
            } catch (error) {
                console.error('Erro ao carregar grupo:', error);
            }
        };

        fetchGrupo();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{grupo.nome}</Text>

            <Text style={styles.subtitle}>Participantes</Text>
            <FlatList
                data={participantes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text style={styles.item}>{item.user.nome}</Text>}
            />

            <Text style={styles.subtitle}>Despesas</Text>
            <FlatList
                data={despesas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.descricao} - R$ {item.valorTotal}
                    </Text>
                )}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CriarDespesa', { grupoId })}
            >
                <Text style={styles.buttonText}>+ Nova Despesa</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 24 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
    item: { fontSize: 16, paddingVertical: 4 },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});