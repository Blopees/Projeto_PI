import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Chart from 'chart.js/auto';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_BASE_URL } from '../componentes/apiConfig';

const GraficoScreen = () => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userName, setUserName] = useState(''); 

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
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const valoresPorDia = diasDaSemana.map(() => ({
      Jejum: 0,
      'Pós-Refeição': 0,
    }));

    dados.forEach((item) => {
      const date = new Date(item.date_emission.replace(' ', 'T'));
      const diaSemana = date.getDay(); // Índice do dia da semana
      if (valoresPorDia[diaSemana] && valoresPorDia[diaSemana][item.name] !== undefined) {
        valoresPorDia[diaSemana][item.name] += item.value;
      }
    });

    return {
      labels: diasDaSemana,
      datasets: [
        {
          label: 'Jejum',
          data: valoresPorDia.map((dia) => dia.Jejum),
          backgroundColor: '#4ccbff',
          borderColor: '#4ccbff',
          borderWidth: 1,
        },
        {
          label: 'Pós-Refeição',
          data: valoresPorDia.map((dia) => dia['Pós-Refeição']),
          backgroundColor: '#07c65f',
          borderColor: '#07c65f',
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    fetchDados();
  }, []);

  useEffect(() => {
    if (!loading && dados.length > 0) {
      const chartData = processarDados();

      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroi o gráfico existente antes de recriar
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Jejum e Pós-Refeição por Dia da Semana',
            },
          },
          scales: {
            x: {
              stacked: false,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [dados, loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ width: '75%', margin: '0 auto' }}>
      <h2>Bem - vindo</h2>
      <h2>{userName}</h2>
      <hr />
      <Text style={styles.welcomeTitle}>Aqui está seu resumo de saúde Diário!!</Text>
      <canvas ref={chartRef}></canvas>

      <TouchableOpacity style={styles.arrowButton}>
        <Link href="/interno/geral" style={styles.link}>
          <Ionicons name="arrow-forward-outline" size={25} color="#fff" />
        </Link>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}><Link  href={"/interno/createLembretes"}>Novo Lembrete</Link></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}><Link  href={"/interno/lembretes"}>Todos os Lembretes</Link></Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}><Link  href={"/interno/consulta"}>Marcar Consulta</Link></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Relatorio Geral</Text>
      </TouchableOpacity>

    </div>

  );
};

const styles = StyleSheet.create({
  arrowButton: {
    position: 'absolute', 
    top: '25%',
    right:'5%', 
    backgroundColor: '#08c75d',
    width: 35,
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:5
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
   marginBottom:-10,
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

})

export default GraficoScreen;
