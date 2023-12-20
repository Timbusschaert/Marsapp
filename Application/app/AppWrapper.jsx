// AppWrapper.js
import React from 'react';
import { LifesignProvider } from './src/Context/LifeSignContext';
import App from './App';
import { ConfigProvider } from './src/Context/ConfigContext';
import { AxiosProvider } from './src/Context/AxiosContext';

const AppWrapper = () => {
  return (
    <ConfigProvider>
      <AxiosProvider>
          <App />
      </AxiosProvider>
    </ConfigProvider>
  );
};

export default AppWrapper;
