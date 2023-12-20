import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assurez-vous que c'est FontAwesome5

const HomeScreen = ({ navigation }) => {
  const handleButtonPress = (buttonIndex) => {
    switch (buttonIndex) {
      case 1:
        // Action pour afficher ce que vous venez de faire
        console.log("");
        navigation.navigate('CurrentData');
        break;
      case 2:
        // Action pour afficher des graphes
        console.log("Afficher des graphes");
        // Naviguer vers la page des graphes
        navigation.navigate('GraphScreen');
        break;
      case 3:
        // Action pour accéder à la configuration des seuils
        console.log("Accéder à la configuration des seuils");
        // Naviguer vers la page de configuration
        navigation.navigate('ConfigScreen');
        break;
      default:
        break;
    }
  };

  return (
    <ImageBackground
      source={require('../canva/HomeScreen.gif')} // Remplacez avec votre image d'arrière-plan
      style={styles.container}
      resizeMode="cover" // ou 'contain' selon ce qui convient le mieux à votre mise en page
    >
    <View style={styles.column} >
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress(1)}
      > 
        
        <Text style={styles.buttonText}>Consulter les paramètres en direct</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress(2)}
      >
        <Text style={styles.buttonText}>Suivi et graphiques</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress(3)}
      >  
        <Text style={styles.buttonText}>Configuration des préférences d'alarmes</Text>
      </TouchableOpacity>
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
    marginTop: 550,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 30,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'yellow',
    marginBottom: 30, // Ajustez l'espacement au besoin
  },
  button: {
    backgroundColor: '#FDF6AB', // Un jaune doré, ajustez selon la couleur exacte désirée
    paddingVertical: 10, // Ajustez pour plus ou moins d'espace vertical
    paddingHorizontal: 20, // Ajustez pour plus ou moins d'espace horizontal
    borderRadius: 25, // Boutons avec les coins arrondis
    borderColor:"#007076",
    borderWidth: 5,
    marginTop: 15, // Espace entre les boutons
    marginLeft: 50,
    width: "85%", // Ajustez selon la largeur souhaitée
    height: 50, // Ajustez selon la largeur souhaitée
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: 'row', // Pour les icônes et le texte sur la même ligne
    alignItems: 'center', // Centre le contenu verticalement
  },
  buttonText: {
    color: '#000', // Texte en noir
    fontWeight: 'bold', // Gras pour le texte
    textAlign: 'center', // Centrer le texte si nécessaire
    fontSize: 12, // Taille de police standard pour les boutons
    marginLeft: 10, // Espace entre l'icône et le texte
  },
});


export default HomeScreen;
