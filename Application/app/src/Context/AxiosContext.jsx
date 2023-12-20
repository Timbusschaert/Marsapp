// AxiosContext.js
import React, { createContext, useContext, useEffect,useState } from 'react';
import axios from 'axios';
import { useConfig } from './ConfigContext';
const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const axiosInstance = axios.create();
  const { config } = useConfig();
  const [path,setPath]= useState("http://"+config.ip+":"+config.port);

  useEffect(()=> {
    setPath("http://"+config.ip+":"+config.port);
  },[config] );
  

  const lifesign = async () => {
    try {
      
      console.log(path)
      const response = await axiosInstance.get(path+'/lifesign', {
        timeout: 5000, // Set the timeout to 2000 milliseconds (2 seconds)
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la requête lifesign :', error);
      throw error;
    }

  };

  const getCurrentValue = async () => {
    try {
     
      const response = await axiosInstance.get(path+'/getCurrentValue');
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête getCurrentValue :', error);
      throw error;
    }
  };

  const getValueofMonth = async () => {
    try {
      const path = "http://"+config.ip+":"+config.port
      const response = await axiosInstance.get(path+'/getValueOfMonth');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête getCurrentValue :', error);
      throw error;
    }
  };

  const jsonConfig = async (configData) => {
    try {
      const path = "http://"+config.ip+":"+config.port
      const response = await axiosInstance.post(path+'/jsonConfig', configData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête jsonConfig :', error);
      throw error;
    }
  };

  const getConfigFile = async () => {
    try {
      const path = "http://"+config.ip+":"+config.port
      const response = await axiosInstance.get(path+'/configFile');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête getConfigFile :', error);
      throw error;
    }
  };

  return (
    <AxiosContext.Provider value={{ axiosInstance, lifesign, getCurrentValue, jsonConfig, getConfigFile,getValueofMonth }}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
