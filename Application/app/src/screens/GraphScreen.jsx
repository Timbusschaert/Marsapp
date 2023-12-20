import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import ChartScreen from './ChartScreen';
import { useAxios } from '../Context/AxiosContext';
import { useFocusEffect } from '@react-navigation/native';

const GraphScreen = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [luxData, setLuxData] = useState([]);
  const [days, setDays] = useState([]);

  const { getValueofMonth } = useAxios();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Temperature');

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getValueofMonth();
      setDays(data.days)
      setHumidityData(data.humidities);
      console.log(data.humidities)
      setLuxData(data.lux_values);
      setTemperatureData(data.temperatures);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const renderTab = (tabName) => (
    <TouchableHighlight
      key={tabName}
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      underlayColor="black"
      onPress={() => setActiveTab(tabName)}
      backgroundColor="white"
    >
      <Text style={styles.tabText}>{tabName}</Text>
    </TouchableHighlight>
  );

  return (
    
      <ImageBackground
      source={require('../canva/graphScreen.gif')} // Remplacez avec votre image d'arrière-plan
      style={styles.container}
      resizeMode="cover" // ou 'contain' selon ce qui convient le mieux à votre mise en page
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View style={styles.tabsContainer}>
            {renderTab('Temperature')}
            {renderTab('Humidité')}
            {renderTab('Lumière')}
          </View>
          {activeTab === 'Temperature' && <ChartScreen title="Temperature" max={60} day={days} data={temperatureData} />}
          {activeTab === 'Humidité' && <ChartScreen title="Humidité" max = {100} day={days} data={humidityData} />}
          {activeTab === 'Lumière' && <ChartScreen title="Luminosité" max={60} day={days} data={luxData} />}
        </View>
      )}
          </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor:"black",
    height:"100%"
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width:"90%"
  },
  tabText: {
    color: 'black', // Définir la couleur du texte en noir
    fontSize: 12, // Ajustez la taille du texte selon vos besoins
    // Ajoutez d'autres styles de texte si nécessaire
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FDF6AB', // Un jaune doré, ajustez selon la couleur exacte désirée
    // Ajustez pour plus ou moins d'espace horizontal
    borderRadius: 25, // Boutons avec les coins arrondis
    borderColor:"#007076",
    borderWidth: 2,
    height:"100%",
    width:"35%",
    fontSize : 30,
    fontStyle : {color : "black"}
  },
  activeTab: {
    backgroundColor: '#007076',
  },
});

export default GraphScreen;
