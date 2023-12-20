// LifesignContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useAxios } from './AxiosContext';
import { useConfig } from './ConfigContext';

const LifesignContext = createContext();

export const LifesignProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { lifesign } = useAxios();

  const { config } = useConfig();
   
  useEffect(() => {
    const interval = setInterval(() => {
     
    }, 5000); // Envoi de lifesign toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage
  }, []);

  return (
    <LifesignContext.Provider value={{ lifesign, error }}>
      {children}
    </LifesignContext.Provider>
  );
};

export const useLifesign = () => {
  return useContext(LifesignContext);
};
