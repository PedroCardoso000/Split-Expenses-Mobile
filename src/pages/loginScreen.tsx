import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function loginScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Despesas Compartilhadas</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    subtitle: { fontSize: 16, marginBottom: 32, textAlign: 'center', color: '#555' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
    button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    link: { color: '#4CAF50', marginTop: 16, textAlign: 'center' },
});


export default loginScreen;
