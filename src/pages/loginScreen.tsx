import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { api } from '../api/axios';
import { HttpStatusCode } from 'axios';
import { useAuth } from '../contexts/AuthContext';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { setUser } = useAuth();
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  async function loginscreen(email: string, password: string) {
  
    try {
      const {status, data} = await api.post('/auth', {
        email,
        password,
    });
  
      if (status === HttpStatusCode.Ok) {
        
        navigation.navigate('Home');
        setUser({  email, password, token: data?.token }); 
        return data;
      } 
    } catch (e) {
      setError('Erro de conexão.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesas Compartilhadas</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email}	
      onChange={(e) => setEmail(e.nativeEvent.text)} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} 
      onChange={(e) => setPassword(e.nativeEvent.text)} />

      <TouchableOpacity style={styles.button} onPress={() => loginscreen(email, password)}>
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

export default LoginScreen;
