import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from '../componentes/apiConfig';

const LembretesScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);

  const fetchDados = async () => {
    try {
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

      const response = await fetch(`${API_BASE_URL}/medical-scheduling/15`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
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

  const enviarConsulta = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token não encontrado!');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/user/medical-consultation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medical_scheduling_id: id }),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log('Consulta enviada com sucesso:', responseData);
      } else {
        console.error('Erro ao enviar consulta:', responseData.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Olá!</Text>
      <Text style={styles.welcomeName}>{userName}</Text>

      <View style={styles.hr} />

      <Text style={styles.welcomeTitle}>Agende sua Consulta</Text>
      <Text style={styles.subTitle}>
        Esses são os dias e horários disponíveis com seu Médico.
      </Text>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        dados.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Ionicons name="calendar-clear-outline" size={34} color="#08c75d" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.info}>
                {new Date(item.appointment_date).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} - {new Date(item.appointment_date).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
               
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => enviarConsulta(item.id)}
              >
                <Text style={styles.buttonText}>Agendar Consulta</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#08c75d",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "300",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  info: {
    fontSize: 14,
    color: '#777',
  },
  button: {
    backgroundColor: '#08c75d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LembretesScreen;
