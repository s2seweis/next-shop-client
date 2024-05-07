// _app.tsx

import React, { useState, useEffect } from 'react';
import ProvidersWrapper from '../utils/context/AuthProviderMerged';
import Loader from '../components/Loader/Loader';
import '../styles/scss/global/global.scss';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/src/redux/store';
import { Provider } from 'react-redux';
import { onMessageListener } from '../utils/firebase/firebaseInit';
import Notifications from '../components/Notifications/Notifications.js';
import ReactNotificationComponent from '../components/Notifications/ReactNotification.js';
// import { getMessaging, onMessage } from 'firebase/messaging';

interface AppProps {
  Component: React.ComponentType<any>;
}

const App: React.FC<AppProps> = ({ Component }) => {
  const [show, setShow] = useState(false);
  console.log('line:100', show);

  const [notification, setNotification] = useState({ title: '', body: '' });
  console.log('line:101', notification);

  onMessageListener()
    .then((payload) => {
      console.log("line:555", payload);
      
      setShow(true);
      // the error is here
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      // console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
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
              <Notifications/>
              {show ? (
                <ReactNotificationComponent
                  title={notification.title}
                  body={notification.body}
                />
              ) : (
                <></>
              )}
            </Router>
          )}
        </ProSidebarProvider>
      </ProvidersWrapper>
    </Provider>
  );
};

export default App;