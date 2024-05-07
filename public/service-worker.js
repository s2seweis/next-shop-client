// const installEvent = () => {
//   self.addEventListener('install', () => {
//     console.log('service worker installed');
//   });
// };
// installEvent();

// const activateEvent = () => {
//   self.addEventListener('activate', () => {
//     console.log('service worker activated');
//   });
// };
// activateEvent();

// // Firebase and Firebase Messaging scripts
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE",
//     authDomain: "next-js-client.firebaseapp.com",
//     projectId: "next-js-client",
//     storageBucket: "next-js-client.appspot.com",
//     messagingSenderId: "916052246117",
//     appId: "1:916052246117:web:f5e41caf3aea8ffe8b108c",
//     measurementId: "G-SWFC6R7ME5"
// };

// Initialize Firebase app
// firebase.initializeApp(firebaseConfig);

// // Retrieve Firebase Messaging instance
// const messaging = firebase.messaging();

// Service Worker install event
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

// Service Worker activate event
self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});

// Firebase Messaging background message handler
// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/logo192.png"
//     };

//     return self.registration.showNotification(
//         notificationTitle,
//         notificationOptions
//     );
// });