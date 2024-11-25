import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();


  const handleRegister = async () => {
    // Validação de campos
    if (email === '' || senha === '' || nome === '' || telefone === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    // Corpo da requisição
    const payload = {
      name: nome,
      email: email,
      password: senha,
      phone_number: telefone,
    };
  
    try {
      // Enviando os dados para a API
      const response = await fetch('http://192.168.0.220:8000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // Verificando a resposta da API
      if (response.ok) {

       
        const data = await response.json();
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');

        router.push('/interno/incio');
        // Aqui você pode redirecionar para a tela de login ou outra ação
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message || 'Ocorreu um erro ao cadastrar.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o usuario, tente novamente !!');
      console.error(error);
    }
  };
  

 

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie uma nova Conta</Text>
      <Text style={styles.label}>NOME</Text>
      <TextInput
        style={styles.input}  
        value={nome}
        onChangeText={setNome}
        
      />
        <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}

        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
        <Text style={styles.label}>SENHA</Text>
      <TextInput
        style={styles.input}
    
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
        <Text style={styles.label}>TELEFONE</Text>
       <TextInput
        style={styles.input}
       keyboardType="numeric"
        value={telefone}
        onChangeText={setTelefone}
        
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Já tem uma conta? <Text style={styles.link}><Link href={'/'}>Faça login</Link></Text>
      </Text>

 
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
    marginBottom: 5,
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
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: '#08c75d',
  },
});

export default RegisterScreen;
