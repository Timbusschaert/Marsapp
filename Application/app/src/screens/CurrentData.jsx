// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useAxios } from '../Context/AxiosContext';
import { useConfig } from '../Context/ConfigContext';
import { ImageBackground } from 'react-native';
const { width } = Dimensions.get('window');

const CurrentData = () => {
  const { getCurrentValue } = useAxios();
  const { config } = useConfig();
  const [sensorData1, setSensorData1] = useState("En attente de données...");
  const [sensorData2, setSensorData2] = useState("En attente de données...");
  const [sensorData3, setSensorData3] = useState("En attente de données...");
  const [sensorData4, setSensorData4] = useState("En attente de données...");

  const sensorTitle1 = "Température"
  const sensorTitle2 = "Humidité"  
  const sensorTitle3 = "Luminosité"
  const sensorTitle4 = "Humidité des sols"

  const sensorMeasure1 = "C°"
  const sensorMeasure2 = "%"  
  const sensorMeasure3 = "lx"
  const sensorMeasure4 = "%"
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    const id = setInterval(() => {
        getCurrentValue().then(response => {
          const data = response;
          console.log(data)
          // Mettre à jour les états en fonction des valeurs reçues
      
          setSensorData1(data.temperature);
          setSensorData2(data.humidity);
          setSensorData3(data.light);
        })
        .catch(error => {
          setSensorData1("En attente de données...");
          setSensorData2("En attente de données...");
          setSensorData3("En attente de données...");
          setSensorData4("En attente de données...");
        })},2000);
    
    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, []); // Mettez à jour le composant lorsque la configuration ou l'instance Axios change


  const Square = ({ color, title, value ,measure }) => (
    <View style={[styles.square]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{typeof value === 'number' ? value.toFixed(2)+"" + measure : value }  </Text> 
    </View>
  );

  return (
    <ImageBackground
      source={require('../canva/CurrentValue.gif')} // Remplacez avec votre image d'arrière-plan
      style={styles.container}
      resizeMode="cover" // ou 'contain' selon ce qui convient le mieux à votre mise en page
    >
      <View style={styles.column}>
        <Square color="#FF5733" title={sensorTitle1} value={sensorData1} measure = {sensorMeasure1}/>
        <Square color="#33FF57" title={sensorTitle2} value={sensorData2} measure = {sensorMeasure2} />
        <Square color="#5733FF" title={sensorTitle3} value={sensorData3} measure = {sensorMeasure3}/>
        <Square color="#5733FF" title={sensorTitle4} value={sensorData4} measure = {sensorMeasure4}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  column: {
    marginTop:260,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 80,
    
  },
  square: {
    width: 270,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom :40,
    backgroundColor: '#FDF6AB', // Un jaune doré, ajustez selon la couleur exacte désirée
    paddingVertical: 10, // Ajustez pour plus ou moins d'espace vertical
    paddingHorizontal: 20, // Ajustez pour plus ou moins d'espace horizontal
    borderRadius: 25, // Boutons avec les coins arrondis
    borderWidth: 3,
  },
  title: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',

  },
});


export default CurrentData;
