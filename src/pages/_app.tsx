// _app.tsx

import React, { useState, useEffect } from 'react';
import ProvidersWrapper from '../utils/context/AuthProviderMerged';
import Loader from '../components/Loader/Loader';
import '../styles/scss/global/global.scss';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/src/redux/store';
import { Provider } from 'react-redux';
import { generateToken, messaging } from '../utils/firebase/firebaseInit';
import { onMessage } from 'firebase/messaging';
import toast, {Toaster} from 'react-hot-toast';

interface AppProps {
  Component: React.ComponentType<any>;
}

const App: React.FC<AppProps> = ({ Component }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body);
      
    })
  }, []);

  // ###
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);
  // ###

  return (
    <Provider store={store}>
      <ProvidersWrapper>
        <ProSidebarProvider>
          {loading ? (
            <Loader />
          ) : (
            <Router>
              <Component />
              <Toaster position='top-right'/>
            </Router>
          )}
        </ProSidebarProvider>
      </ProvidersWrapper>
    </Provider>
  );
};

export default App;
