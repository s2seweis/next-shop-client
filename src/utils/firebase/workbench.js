import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE",
    authDomain: "next-js-client.firebaseapp.com",
    projectId: "next-js-client",
    storageBucket: "next-js-client.appspot.com",
    messagingSenderId: "916052246117",
    appId: "1:916052246117:web:f5e41caf3aea8ffe8b108c",
    measurementId: "G-SWFC6R7ME5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
