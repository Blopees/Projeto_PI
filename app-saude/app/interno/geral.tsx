import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../componentes/apiConfig';

const HomeScreen = () => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const screenWidth = Dimensions.get('window').width;

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

      const response = await fetch(`${API_BASE_URL}/user/patient-information`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
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

  const processarDados = () => {
    const valoresPressao = [];
    const valoresBatimentos = [];
    const labels = [];

    dados.forEach((item) => {
      const date = new Date(item.date_emission.replace(' ', 'T'));
      const dia = date.toISOString().split('T')[0]; // Formata como 'YYYY-MM-DD'

      // Verifica se o dia já existe no array
      if (!labels.includes(dia)) {
        labels.push(dia);
        valoresPressao.push(0); // Inicializa os valores para esse dia
        valoresBatimentos.push(0); // Inicializa os valores para esse dia
      }

      const diaIndex = labels.indexOf(dia); // Encontra o índice do dia no array de labels

      // Verifica o nome do item e adiciona o valor de acordo
      if (item.name === 'Pressão Arterial') {
        valoresPressao[diaIndex] += item.value;
      } else if (item.name === 'Batimentos Cardíacos') {
        valoresBatimentos[diaIndex] += item.value;
      }
    });

    console.log("Labels:", labels);
    console.log("Valores de Pressão:", valoresPressao);
    console.log("Valores de Batimentos:", valoresBatimentos);

    return { valoresPressao, valoresBatimentos, labels };
  };

  const { valoresPressao, valoresBatimentos, labels } = processarDados();

  const data = {
   
    datasets: [
      {
        data: valoresPressao, // Dados de pressão arterial
        color: (opacity = 1) => `rgba(8, 199, 93, ${opacity})`, // Verde
        strokeWidth: 2,
      },
      {
        data: valoresBatimentos, // Dados de batimentos cardíacos
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Azul
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
    style: {
      borderRadius: 8,
    },
  };

  useEffect(() => {
    fetchDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Olá</Text>
      <Text style={styles.welcomeName}>{userName}</Text>
      <View style={styles.hr} />
      <Text style={styles.welcomeTitle}>Resumo de Saúde Mensal</Text>
      <LineChart
        data={data}
        width={screenWidth - 22}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
      />
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: '#08c75d' }]} />
          <Text style={styles.legendText}>Pressão Arterial</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: '#0000ff' }]} />
          <Text style={styles.legendText}>Batimentos Cardíacos</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}><Link  href={"/interno/createLembretes"}>Novo Lembrete</Link></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}><Link  href={"/interno/lembretes"}>Todos os Lembretes</Link></Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Relatorio Geral</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}><Link  href={"/interno/consulta"}>Marcar Consulta</Link></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.arrowButton}>
        <Link href="/interno/incio" style={styles.link}>
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  arrowButton: {
    position: 'absolute',
    top: '25%',
    left: '5%',
    backgroundColor: '#08c75d',
    width: 35,
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08c75d',
    textAlign: 'center',
  },
  link: {
    width: '100%',
    height: '100%',
    marginRight: -10,
    marginBottom: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#08c75d',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
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
  chart: {
    marginTop: 16,
    marginRight: 36,
    borderRadius: 8,
    padding: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#000',
  },
});

export default HomeScreen;
