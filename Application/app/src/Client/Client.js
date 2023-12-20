// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [sensorData1, setSensorData1] = useState("En attente de données...");
  const [sensorData2, setSensorData2] = useState("En attente de données...");
  const [sensorData3, setSensorData3] = useState("En attente de données...");
  const [sensorData4, setSensorData4] = useState("En attente de données...");
  const sensorTitle1 = "Température"
  const sensorTitle2 = "Humidité"  
  const sensorTitle3 = "Luminosité"
  const sensorMeasure1 = "C°"
  const sensorMeasure2 = "%"  
  const sensorMeasure3 = "lx"

 let socket
  const tryConnection = () => {
    socket = TcpSocket.createConnection(
      { host: '192.168.129.11', port: 12345 },
      () => {
        console.log('Connecté au serveur!');
      }
    );

    socket.on('data', data => {

      const receivedData = data.toString('utf-8');
      if (receivedData.includes('CheckConnection')) {
        // C'est un heartbeat, ne faites rien de spécial ici
      } else {
        // C'est probablement une chaîne JSON, essayez de la parser
        try {
          const parsedData = JSON.parse(receivedData);
          // Mettre à jour les états en fonction des valeurs reçues
          console.log(parsedData)
          console.log(parsedData.temperature)

          setSensorData1(parsedData.temperature);
          setSensorData2(parsedData.humidity);
          setSensorData3(parsedData.light);
          
        } catch (error) {
          console.error('Erreur de parsing JSON :', receivedData);
        }
      }
    });

    socket.on('error', error => {
      console.error('Erreur de socket:', error);
      // Retenter la connexion après une seconde
      setTimeout(tryConnection, 1000);
    });

    socket.on('close', hadError => {
      console.log('Socket fermé:', hadError);
      // Retenter la connexion après une seconde
      setTimeout(tryConnection, 1000);
    });
  };

  useEffect(() => {
    // Lancer la tentative de connexion au serveur au montage du composant
    tryConnection();
  }, []);

  useEffect(() => {
    // Utilisez un intervalle pour envoyer les heartbeats toutes les 5 secondes
    const heartbeatInterval = setInterval(() => {
      if (socket && socket.readyState === 'open') {
        socket.write('Heartbeat');
      }
    }, 5000);

    // Retournez une fonction de nettoyage pour arrêter l'intervalle lorsque le composant est démonté
    return () => clearInterval(heartbeatInterval);
  }, []);

  const Square = ({ color, title, value ,measure }) => (
    <View style={[styles.square, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{typeof value === 'number' ? value.toFixed(3)+"" : value} { measure } </Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Square color="#FF5733" title={sensorTitle1} value={sensorData1} measure = {sensorMeasure1}/>
        <Square color="#33FF57" title={sensorTitle2} value={sensorData2} measure = {sensorMeasure2} />
        <Square color="#5733FF" title={sensorTitle3} value={sensorData3} measure = {sensorMeasure3}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  square: {
    width: width / 1,
    height: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 10,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});


export default App;
