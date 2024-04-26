import React, { useState, useEffect } from 'react';
import ProvidersWrapper from '../utils/context/AuthProviderMerged';
import Loader from '../components/Loader/Loader'; // Import the Loader component
import '../styles/scss/global/global.scss';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '@/src/redux/store'; // Import store
import { Provider } from 'react-redux';

interface AppProps {
  Component: React.ComponentType<any>; // Component prop can be any React component
}

const App: React.FC<AppProps> = ({ Component }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate some asynchronous operation
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a delay of 2 seconds
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
      <ProvidersWrapper>
        <ProSidebarProvider>
          {loading ? (
            <Loader /> // Show the loader while loading
          ) : (
            <Router>
              <Component />
            </Router>
          )}
        </ProSidebarProvider>
      </ProvidersWrapper>
    </Provider>
  );
};

export default App;
