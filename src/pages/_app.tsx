import React, { useState, useEffect } from 'react';
import ProvidersWrapper from '../utils/context/AuthProviderMerged';
import Loader from '../components/Loader/Loader';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/src/redux/store';
import { Provider } from 'react-redux';
import { generateToken, messaging } from '../utils/firebase/firebaseInit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showNotification } from '../components/Notifications/toastNotifications';
import axios from 'axios'; // Import Axios
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import { onMessage } from 'firebase/messaging';
import '../styles/scss/global/global.scss';
// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

interface AppProps {
  Component: React.ComponentType<any>;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const fullURL = `${baseURL}/notification`;
// *works


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

    // ### not needed => to receive broadcast
    let broadcastChannel: BroadcastChannel;
    if (messaging) {
      // Set up a BroadcastChannel to receive background messages
      broadcastChannel = new BroadcastChannel('background-message');
      let messageIdCache = ''; // Cache for messageId

      const handleMessage = async (event: { data: any }) => {
        const payload = event.data;
        console.log('Received payload from BroadcastChannel:', payload);

        if (payload.notification) {
          const messageId = payload.messageId || messageIdCache || uuidv4(); // Use cached messageId or generate a new one
          messageIdCache = messageId; // Update messageId cache

          showNotification(
            payload.notification.title || '',
            payload.notification.body || '',
          );

          try {
            // Make a fetch call to send the notification data to the server
            const requestData = {
              title: payload.notification.title,
              body: payload.notification.body,
              messageId: messageId,
            };

            await axios.post(`${fullURL}`, requestData);
            location.reload(); // This reloads the current URL
          } catch (error) {
            console.error('Failed to send notification data:', error);
          }
        }
      };

      broadcastChannel.onmessage = handleMessage;
      // ### not needed <=

      // Listen for Firebase messaging events
      onMessage(messaging, async (payload) => {
        console.log('Received Firebase message:', payload);

        const messageId = payload.messageId || messageIdCache || uuidv4(); // Use cached messageId or generate a new one
        messageIdCache = messageId; // Update messageId cache

        if (payload.notification && payload.messageId) {
          showNotification(
            payload.notification.title || '',
            payload.notification.body || '',
          );

          try {
            // Make an Axios call to send the notification data to the server
            const requestData = {
              title: payload.notification.title,
              body: payload.notification.body,
              messageId: payload.messageId || messageId,
            };

            await axios.post(`${fullURL}`, requestData);
            location.reload(); // This reloads the current URL
          } catch (error) {
            console.error('Failed to send notification data:', error);
          }
        }
      });
    }

    // Always return a cleanup function, even if it does nothing
    return () => {
      if (broadcastChannel) {
        broadcastChannel.close();
      }
      // location.reload(); // This reloads the current URL
    };
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          // console.log('Service worker registered:', registration);
        });
    }
  }, []);

  return (
    <Provider store={store}>
      <ProvidersWrapper>
        <ProSidebarProvider>
          {loading ? (
            <Loader />
          ) : (
            <Router>
              <Component />
              <ToastContainer position="top-right" />
            </Router>
          )}
        </ProSidebarProvider>
      </ProvidersWrapper>
    </Provider>
  );
};

export default App;
