import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from '../api/axios';
import { HttpStatusCode } from 'axios';
import { useAuth } from '../contexts/AuthContext';



type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export default function CadastroScreen() {
const navigation = useNavigation<NavigationProps>();
const { setUser } = useAuth();
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [telefone, setTelefone] = useState('');
const [senha, setSenha] = useState('');
const [confirmarSenha, setConfirmarSenha] = useState('');
const [error, setError] = useState('');

function verificarSenhasIguais() {

  if (senha !== confirmarSenha) {
    setError('As senhas não coincidem.');
    return false;
  }
  setError('');
  return true;
}

async function cadastrarUsuario(name: string, email: string, password: string) {
  if (!verificarSenhasIguais()) return;

  try {
    const {status, data} = await api.post('/usuarios', {
      name,
      email,
      password,
  });

    if (status === HttpStatusCode.Ok) {
      navigation.navigate('Home');
      setUser({ password, email, token: data?.token }); 
      return data;
    } 
  } catch (e) {
    setError('Erro de conexão.');
  }
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.nativeEvent.text)} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChange={(e) => setEmail(e.nativeEvent.text)} />
      <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" value={telefone} onChange={(e) => setTelefone(e.nativeEvent.text)} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry  value={senha} onChange={(e) => setSenha(e.nativeEvent.text)}/>
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.nativeEvent.text)} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={() => cadastrarUsuario(nome, email, senha)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#4CAF50', marginTop: 16, textAlign: 'center' },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
});
