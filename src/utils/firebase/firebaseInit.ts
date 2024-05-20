// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken } from 'firebase/messaging';
// import dotenv from 'dotenv';
// dotenv.config();

const firebaseConfig = {
  apiKey: 'AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE',
  authDomain: 'next-js-client.firebaseapp.com',
  projectId: 'next-js-client',
  storageBucket: 'next-js-client.appspot.com',
  messagingSenderId: '916052246117',
  appId: '1:916052246117:web:f5e41caf3aea8ffe8b108c',
  measurementId: 'G-SWFC6R7ME5',
};

// const firebaseConfig{
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

let messaging: Messaging | null = null;

if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging }; // Export the messaging instance

export const generateToken = async () => {
  if (typeof window !== 'undefined' && messaging) {
    try {
      const permission = await Notification.requestPermission();
      // console.log('Notification permission:', permission);

      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: 'BLbNFs5G-dMSMk1dMHh0Sb8c5x95il0jZjoSgndS4piIaoufvxcONwrqLaSVkPCCmAXAlxdVl7K6KwxxvcSszLM',
        });
        console.log('Firebase Messaging token:', token);
      }
    } catch (error) {
      console.error('Error generating token:', error);
    }
  } else {
    console.warn('generateToken is only executed in the browser environment.');
  }
};
