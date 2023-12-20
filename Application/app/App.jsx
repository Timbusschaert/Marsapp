import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-simple-toast';
import HomeScreen from './src/screens/HomeScreen';
import CurrentData from './src/screens/CurrentData';
import { useAxios } from './src/Context/AxiosContext';
import ConfigScreen from './src/screens/ConfigScreen';
import GraphScreen from './src/screens/GraphScreen';
// Importez d'autres composants si nécessaire

const Stack = createStackNavigator();

const App = () => {
  const { lifesign } = useAxios()
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [countFailed, setCountFailed] = useState(0);

  // Afficher une notification Toast si la valeur de lifesign n'est pas valide
  useEffect(() => {
    const interval = setInterval(() => {
      lifesign()
        .then(response => {
          // Lifesign is successful
          if (isToastVisible) {
            // If the Toast is currently visible, hide it
            Toast.show("Connexion au serveur établie",Toast.LONG, Toast.TOP, {
              backgroundColor: 'red',
            });
            setIsToastVisible(false);
            setCountFailed(0)
          }
        })
        .catch(err => {
          console.log(err);
          // Show Toast when there is an error
          if(countFailed > 3 ){
            Toast.show("Impossible d'accéder au serveur", Toast.LONG, Toast.TOP, {
              backgroundColor: 'red',
            });
            setIsToastVisible(true);
          }else{
            setCountFailed(countFailed+1);
          }
         
          // Set the state to indicate that the Toast is visible
         
        });
    }, 5000); // Envoi de lifesign toutes les 5 secondes

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [isToastVisible]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}   options={{
            headerTitle: '', // Masquer le titre
            headerTitle: '' , headerShown: false }}
          />
        <Stack.Screen name="CurrentData" component={CurrentData} options={{ headerTitle: '', headerStyle : {backgroundColor :"#6bc5b5"} }}/>
        <Stack.Screen name="ConfigScreen" component={ConfigScreen} options={{ headerTitle: '',headerStyle : {backgroundColor :"#6bc5b5"} }}/>
        <Stack.Screen name="GraphScreen" component={GraphScreen} options={{ headerTitle: '' , headerStyle : {backgroundColor :"#6bc5b5"}}}/>
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default App;
