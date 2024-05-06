// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE",
    authDomain: "next-js-client.firebaseapp.com",
    projectId: "next-js-client",
    storageBucket: "next-js-client.appspot.com",
    messagingSenderId: "916052246117",
    appId: "1:916052246117:web:f5e41caf3aea8ffe8b108c",
    measurementId: "G-SWFC6R7ME5"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };

    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});