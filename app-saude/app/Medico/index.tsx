import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_BASE_URL } from '../componentes/apiConfig';

const ConsultasScreen = () => {
  const [userName, setUserName] = useState(''); 
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;
  

  const fetchDados = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user); // Converte a string para objeto
          setUserName(parsedUser.name); // Define o nome do usuário no estado
        }
        
      if (!token) {
        console.log('Token não encontrado!');
        return;
      }
      //  const response = await fetch(`${API_BASE_URL}/user/reminder`
      const response = await fetch(`${API_BASE_URL}/user/medical-consultation`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Contntent-Type': 'application/json',
        },
      });
            
      const responseData = await response.json();
      console.log('Dados recebidos:', responseData);

      if (responseData.status === 200 && responseData.data) {
        setDados(responseData.data);
      } else {
        console.error('Erro na resposta da API:', responseData.message);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem - Vindo !</Text>
      <Text style={styles.welcomeName}>DR. {userName}</Text>

      <View style={styles.hr} />

      <Text style={styles.welcomeTitle}>
        Aqui está seu resumo de saúde Diário!!
      </Text>

      <View style={styles.container}>
  {loading ? (
    <Text>Carregando...</Text>
  ) : dados.length > 0 ? (
    dados.map((consulta) => (
      <View key={consulta.id_usuario} style={styles.consultaItem}>
        <Text style={styles.welcomeName}>{consulta.nome_paciente}:</Text>
        <Text style={styles.welcomeName}>
          Data: {new Date(consulta.data_consulta).toLocaleDateString('pt-BR')} às {new Date(consulta.data_consulta).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Ver perfil do paciente</Text>
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <Text>Sem consultas marcadas para hoje.</Text>
  )}
</View>


      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonTexts}>Resultado dos Exames</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonTexts}>Pacientes</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonTexts: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowButton: {
    position: "absolute", // Fixa no meio da tela
    bottom: "50%", // Centraliza verticalmente
    backgroundColor: "#08c75d",
    width: 35,
    height: 35,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  link: {
    width: "100%",
    height: "100%",
    marginRight: -10,
    marginBottom: -10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#77cbf2",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20
  },
  welcomeName: {
    
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",

    color: "#08c75d",
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  chart: {
    marginTop: 16,
    marginRight: 36,
    borderRadius: 8,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  legendBox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 16,
    color: "#000",
  },
});

export default ConsultasScreen;
