import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando AsyncStorage
import { Link } from 'expo-router';
import { API_BASE_URL } from './componentes/apiConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (email === '' || senha === '' || telefone === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: senha,
          phone_number: telefone,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao autenticar. Verifique suas credenciais.');
      }

      const data = await response.json();

     
      Alert.alert('Sucesso', `Bem-vindo, ${data.data.name}!`);
     
      // Armazenando os dados do usuário e o token no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      await AsyncStorage.setItem('token', data.token);
      
        
      if (data.data.profile_id == 2) {
        router.push('/Medico');
      } else {
        router.push('/interno/incio');
      }
      
   
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível realizar o login.');
    }
  };
                                                                                                                                                                      
  return (  
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu Login</Text>

      <Text style={styles.label}>TELEFONE</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
      />

      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>SENHA</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Não tem uma conta? <Text style={styles.link}><Link  href={"/Registro/registro"}>Crie uma conta</Link></Text>
      </Text>

     
    </View>
  );
};

const styles = StyleSheet.create({
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: '#08c75d',

  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#08c75d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#08c75d',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default LoginScreen;
