import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

const MesesButtons = () => {
  return (
    <View style={styles.containers}>

     <Text style={styles.welcomeText}>Olá!</Text>
      <Text style={styles.welcomeName}>José Almeida</Text>

      <View style={styles.hr} />

      <Text style={styles.welcomeTitle}>
       Veja seu relatorio de saive mensal e anual
      </Text>
      <Text style={styles.subTitle}>
        Esses são os seus lembretes definidos
      </Text>

        <View style={styles.container}>
        {meses.map((mes, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{mes}</Text>
        </TouchableOpacity>
      ))}
        </View>

  
    </View>
  );
};

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      },

      hr: {
        width: "100%",
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 16,
      },
    container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Faz os botões quebrarem para a próxima linha se não houver espaço
    justifyContent: 'space-around', // Espaça os botões igualmente
    margin: 10,
  },
  button: {
    width: (Dimensions.get('window').width - 40) / 4, // 4 botões por linha
    height: 50,
    backgroundColor: '#08c75d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeName: {
    
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle:{
    fontSize: 14,
    fontWeight: 300,

    textAlign: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",

    color: "#08c75d",
    textAlign: "center",
  },
});

export default MesesButtons;
