// ConfigContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import RNFS from 'react-native-fs';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});

  useEffect( () => {
    const loadConfigData =  () => {
       loadConfig();
    };
    loadConfigData()
  }, []);

  const loadConfig = async ( ) => {
    const cheminFichierInitial = RNFS.DocumentDirectoryPath + '/config.json';
    try {
      const fichierExiste = await RNFS.exists(cheminFichierInitial);
      if (fichierExiste) {
        const contenuFichierInitial = await RNFS.readFile(cheminFichierInitial);
        console.log(contenuFichierInitial)
        setConfig(JSON.parse(contenuFichierInitial))
      } else {
        // Si le fichier n'existe pas encore dans le répertoire de documents, chargement depuis assets
        RNFS.writeFile(cheminFichierInitial, JSON.stringify({}))
        .then(() => console.log('Fichier de configuration créé avec succès.'))
        .catch((err) => console.error('Erreur lors de la création du fichier de configuration :', err));
      }
    } catch (erreur) {
      console.error('Erreur lors du chargement du fichier de configuration :', erreur);
      await RNFS.writeFile(cheminFichierInitial, JSON.stringify({}),"utf-8")
        .then(() => console.log('Fichier de configuration créé avec succès.'))
        .catch((err) => console.error('Erreur lors de la création du fichier de configuration :', err));
    }
    
  }

  const saveConfig = async (configData) => {
    const cheminFichier = RNFS.DocumentDirectoryPath + '/config.json';
    const jsonConfig = JSON.stringify(configData);
    setConfig(configData);
    await RNFS.writeFile(cheminFichier, jsonConfig, 'utf8')
      .then(() => console.log('Le fichier de configuration a été enregistré avec succès.'))
      .catch((err) => console.error('Erreur lors de l\'enregistrement du fichier de configuration :', err));
  }

  return (
    <ConfigContext.Provider value={{ config, saveConfig}}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};

