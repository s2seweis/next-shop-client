import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE",
  authDomain: "next-js-client.firebaseapp.com",
  projectId: "next-js-client",
  storageBucket: "next-js-client.appspot.com",
  messagingSenderId: "916052246117",
  appId: "1:916052246117:web:f5e41caf3aea8ffe8b108c",
  measurementId: "G-SWFC6R7ME5"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let messaging: firebase.messaging.Messaging | null = null;

if (typeof window !== 'undefined') {
  messaging = firebase.messaging();
}

const publicKey = '';
console.log("line:500", publicKey);

// const publicKey = process.env.REACT_APP_PUBLIC_KEY || '';
// console.log("line:500", publicKey);

export const getToken = async (setTokenFound: (tokenFound: boolean) => void): Promise<string> => {
  let currentToken = '';

  try {
    if (messaging) {
      currentToken = await messaging.getToken({
        vapidKey: publicKey,
      });
      setTokenFound(!!currentToken); // Set tokenFound based on whether currentToken is truthy
      // console.log("line:999", currentToken);
      
    } else {
      console.log('Firebase messaging not initialized -1.');
    }
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};

export const onMessageListener = (): Promise<any> => {
  return new Promise((resolve) => {
    if (messaging) {
      messaging.onMessage((payload: any) => {
        resolve(payload);
      });
    } else {
      console.log('Firebase messaging not initialized -2.');
      resolve(null);
    }
  });
};

export { messaging };