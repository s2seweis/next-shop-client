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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showNotification } from '../components/Notifications/toatNotifications';
import axios from 'axios'; // Import Axios

interface AppProps {
  Component: React.ComponentType<any>;
}

const App: React.FC<AppProps> = ({ Component }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessageArrived, setNewMessageArrived] = useState<boolean>(false); // State to trigger re-render
  const [key, setKey] = useState<number>(0); // Key prop to trigger re-render

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    generateToken();
    if (messaging) {
      onMessage(messaging, async (payload) => { // Make the callback function async
        console.log(payload);
        if (payload.notification && payload.messageId) { // Check if both notification and messageId are available
          showNotification(payload.notification.title || '', payload.notification.body || '');
          try {
            // Make an Axios call to send the notification data to the server
            await axios.post('http://localhost:3005/notification', {
              title: payload.notification.title || '',
              body: payload.notification.body || '',
              messageId: payload.messageId || ''
            });
          } catch (error) {
            console.error('Failed to send notification:', error);
          }
          // Trigger re-render when a new message arrives
          setNewMessageArrived(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  useEffect(() => {
    // Here, you can perform any action that needs to be taken when newMessageArrived changes
    // For example, you can increment the key value to trigger re-render
    setKey(prevKey => prevKey + 1);
  }, [newMessageArrived]);

  return (
    <Provider store={store}>
      <ProvidersWrapper>
        <ProSidebarProvider key={key}>
          {loading ? (
            <Loader />
          ) : (
            <Router>
              <Component />
              <ToastContainer position='top-right' />
            </Router>
          )}
        </ProSidebarProvider>
      </ProvidersWrapper>
    </Provider>
  );
};

export default App;
