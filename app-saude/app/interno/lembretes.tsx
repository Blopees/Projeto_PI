import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from '../componentes/apiConfig';
const LembretesScreen = () => {
  const [lembretes, setLembretes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const fetchLembretes = async () => {
    try {
      // Obtém o token do AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name);
      }
      if (!token) {
        console.log('Token não encontrado!');
        return;
      }

      // Faz a chamada ao endpoint
      const response = await fetch(`${API_BASE_URL}/user/reminder`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Verifica a resposta
      if (!response.ok) {
        console.error('Erro ao buscar lembretes:', response.status);
        return;
      }

      // Converte a resposta para JSON
      const responseData = await response.json();
      if (responseData.status === 200 && responseData.data) {
        setLembretes(responseData.data); // Atualiza o estado com os dados dos lembretes
      } else {
        console.error('Erro na resposta da API:', responseData.message);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLembretes();
  }, []);

  const renderLembrete = ({ item }) => (
    <View style={styles.lembrete}>
    <View style={styles.lembreteHeader}>
      <Ionicons name="notifications-outline" size={24} color="#000" style={styles.icon} />
      <Text style={styles.title}>{item.title || 'Sem título'}</Text>
    </View>
    <Text style={styles.message}>{item.message || 'Sem mensagem'}</Text>
    <Text style={styles.bt}>Editar</Text>
  </View>
  );

  // Renderiza o conteúdo
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Olá</Text>
      <Text style={styles.welcomeName}>{userName}</Text>
      <View style={styles.hr} />
      <Text style={styles.welcomeTitle}>Resumo de Saúde Mensal</Text>
      {lembretes.length > 0 ? (
        <FlatList
          data={lembretes}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}

          renderItem={renderLembrete}
        />
      ) : (
        <Text>Nenhum lembrete encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeName: {
    fontSize: 20,
    fontWeight: 'bold',
   
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08c75d',
    textAlign: 'center',
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  bt:{
    color:'#08c75d',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lembrete: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lembreteHeader: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha o ícone e o título na mesma linha
    marginBottom: 4,
  },
  icon: {
    marginRight: 8, // Espaçamento entre o ícone e o título
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
 
});

export default LembretesScreen;