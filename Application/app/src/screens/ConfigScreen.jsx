// ConfigScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ScrollView, ImageBackground } from 'react-native';
import { useConfig } from '../Context/ConfigContext';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ConfigScreen = () => {
  const { config,saveConfig } = useConfig();
  const [temperatureThresholdMax, setTemperatureThresholdMax] = useState({});
  const [humidityThresholdMax, setHumidityThresholdMax] = useState('');
  const [lightThresholdMax, setLightThresholdMax] = useState('');
  const [temperatureThresholdMin, setTemperatureThresholdMin] = useState('');
  const [humidityThresholdMin, setHumidityThresholdMin] = useState('');
  const [lightThresholdMin, setLightThresholdMin] = useState('');
  const [sendSmsTemperature, setSendSmsTemperature] = useState(false);
  const [sendSmsHumidity, setSendSmsHumidity] = useState(false);
  const [sendSmsLight, setSendSmsLight] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [port, setPort] = useState('');


  useEffect(() => {
      console.log(config)
      if (config.temperatureThresholdMax !== undefined) {
        setTemperatureThresholdMax(config.temperatureThresholdMax);
        console.log("hi")
      }
      if (config.humidityThresholdMax !== undefined) {
        setHumidityThresholdMax(config.humidityThresholdMax);
      }
      if (config.lightThresholdMax !== undefined) {
        setLightThresholdMax(config.lightThresholdMax);
      }
      if (config.temperatureThresholdMin !== undefined) {
        setTemperatureThresholdMin(config.temperatureThresholdMin);
      }
      if (config.humidityThresholdMin !== undefined) {
        setHumidityThresholdMin(config.humidityThresholdMin);
      }
      if (config.lightThresholdMin !== undefined) {
        setLightThresholdMin(config.lightThresholdMin);
      }
      if (config.sendSmsTemperature !== undefined) {
        setSendSmsTemperature(config.sendSmsTemperature);
      }
      if (config.sendSmsHumidity !== undefined) {
        setSendSmsHumidity(config.sendSmsHumidity);
      }
      if (config.sendSmsLight !== undefined) {
        setSendSmsLight(config.sendSmsLight);
        console.log("hi")
      }
      if (config.phoneNumber !== undefined) {
        setPhoneNumber(config.phoneNumber);
      }
      if (config.ip !== undefined) {
        setAddress(config.ip);
      }
      if (config.port !== undefined) {
        setPort(config.port);
      }
      

  }, [config]);
  

  const handleSaveConfig = () => {
    // Logique pour sauvegarder les seuils et les options d'envoi de SMS
    const updatedConfig = {
      temperatureThresholdMax,
      humidityThresholdMax,
      lightThresholdMax,
      temperatureThresholdMin,
      humidityThresholdMin,
      lightThresholdMin,
      sendSmsTemperature,
      sendSmsHumidity,
      sendSmsLight,
      phoneNumber,
      ip: address,
      port:port,
    };
    saveConfig(updatedConfig);
  };

  return (
    <ImageBackground
    source={require('../canva/configScreen.gif')} // Remplacez avec votre image d'arrière-plan
    style={styles.containerAll}
    resizeMode="cover" // ou 'contain' selon ce qui convient le mieux à votre mise en page
  >
    <ScrollView style={styles.container}>
     
      <View style={styles.column}>
      <Text style={styles.label}>Seuil de Température Maximum(C°) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={temperatureThresholdMax}
        onChangeText={(text) => setTemperatureThresholdMax(text)}
      />
      <Text style={styles.label}>Seuil de Température Minimum(C°) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={temperatureThresholdMin}
        onChangeText={(text) => setTemperatureThresholdMin(text)}
      />
      
      <Text style={styles.label}>Seuil d'Humidité Maximum (%) :</Text>
      <TextInput
        style={styles.input}
         keyboardType="numeric"
        value={humidityThresholdMax}
        onChangeText={(text) => setHumidityThresholdMax(text)}
      />

      <Text style={styles.label}>Seuil d'Humidité Minimum (%) :</Text>
      <TextInput
        style={styles.input}
         keyboardType="numeric"
        value={humidityThresholdMin}
        onChangeText={(text) => setHumidityThresholdMin(text)}
      />
      
      <Text style={styles.label}>Seuil de Luminosité (lx) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={lightThresholdMax}
        onChangeText={(text) => setLightThresholdMax(text)}
      />

    <Text style={styles.label}>Seuil de Luminosité (lx) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={lightThresholdMin}
        onChangeText={(text) => setLightThresholdMin(text)}
      />  
    
    

     <Text style={styles.label}>Adresse du Serveur :</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <Text style={styles.label}>Port du Serveur :</Text>
      <TextInput
        style={styles.input}
        TextColor="black"
        value={port}
        onChangeText={(text) => setPort(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveConfig}
      >
      <Text style={styles.buttonText}>Sauvegarder la configuration</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
      </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : screenWidth,
  },
  containerAll: {
    flex : 1,
    justifyContent:"center"

  },
  column: {
    marginTop: 100,
    flexDirection: 'column',
    alignItems: 'center',    
    marginBottom: 200,

  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black', // Texte en noir
  },

  labelTim: {
    fontSize: 25,
    marginBottom: 5,
    color: 'black', // Texte en noir
  },
  input: {
    height: 40,
    width : "80%",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color:"black",
  },
  smsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default ConfigScreen;
