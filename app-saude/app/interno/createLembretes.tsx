import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { API_BASE_URL } from '../componentes/apiConfig';

const CreateReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleCreateReminder = async () => {
    if (title === '' || message === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token'); // Obter o token do AsyncStorage
      const response = await fetch(`${API_BASE_URL}/user/reminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
        },
        body: JSON.stringify({ title, message }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar lembrete. Tente novamente.');
      }

      const data = await response.json();
      Alert.alert('Sucesso', 'Lembrete criado com sucesso!');
      router.push('./lembretes'); // Redireciona para a lista de lembretes
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível criar o lembrete.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Lembrete</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Medir Glicose"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Mensagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Todos os dias às 08h, 12h, 15h"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateReminder}>
        <Text style={styles.buttonText}>Criar Lembrete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#08c75d',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateReminderScreen;
