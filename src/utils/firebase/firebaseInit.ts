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
  apiKey: "dummy_api_key",
  authDomain: "dummy-project.firebaseapp.com",
  projectId: "dummy-project",
  storageBucket: "dummy-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456",
  measurementId: "G-ABCDEF1234"
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
    } else {
      console.log('Firebase messaging not initialized.');
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
      console.log('Firebase messaging not initialized.');
      resolve(null);
    }
  });
};

export { messaging };
