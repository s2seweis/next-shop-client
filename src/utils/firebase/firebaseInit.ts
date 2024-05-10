// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE',
  authDomain: 'next-js-client.firebaseapp.com',
  projectId: 'next-js-client',
  storageBucket: 'next-js-client.appspot.com',
  messagingSenderId: '916052246117',
  appId: '1:916052246117:web:f5e41caf3aea8ffe8b108c',
  measurementId: 'G-SWFC6R7ME5',
};

let messaging: Messaging | null = null;

if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging }; // Export the messaging instance

export const generateToken = async () => {
  if (typeof window !== 'undefined') {
    const permission = await Notification.requestPermission();
    // console.log('Notification permission:', permission);

    if (permission === 'granted' && messaging) {
      const token = await getToken(messaging, {
        vapidKey: 'BLbNFs5G-dMSMk1dMHh0Sb8c5x95il0jZjoSgndS4piIaoufvxcONwrqLaSVkPCCmAXAlxdVl7K6KwxxvcSszLM',
      });
      console.log('Firebase Messaging token:', token);
    }
  } else {
    console.warn('generateToken is only executed in the browser environment.');
  }
};
