// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// // Initialize Firebase app in the service worker.
// firebase.initializeApp({
//   apiKey: 'AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE',
//   authDomain: 'next-js-client.firebaseapp.com',
//   projectId: 'next-js-client',
//   storageBucket: 'next-js-client.appspot.com',
//   messagingSenderId: '916052246117',
//   appId: '1:916052246117:web:f5e41caf3aea8ffe8b108c',
//   measurementId: 'G-SWFC6R7ME5',
// });

// const messaging = firebase.messaging();

// let lastMessageTime = 0; // Track the timestamp of the last sent message

// // Listen for background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message', payload);

//   // Determine the current timestamp
//   const currentTime = Date.now();

//   // If less than 1 second has passed since the last message, ignore the message
//   if (currentTime - lastMessageTime < 1000) {
//     console.log('[firebase-messaging-sw.js] Message ignored due to rapid succession');
//     return;
//   }

//   // Store the message payload in Cache Storage
//   caches.open('background-messages').then((cache) => {
//     cache.put('latest-message', new Response(JSON.stringify(payload)));
//   });

//   // Send a message to the client using BroadcastChannel
//   const broadcastChannel = new BroadcastChannel('background-message');
//   broadcastChannel.postMessage(payload);
//   console.log('[firebase-messaging-sw.js] Sent message to client', payload);

//   // Update the last message timestamp
//   lastMessageTime = currentTime;
// });

// // Handle notification clicks
// self.addEventListener('notificationclick', (event) => {
//   console.log('[firebase-messaging-sw.js] Notification clicked');
//   event.notification.close();

//   // Handle notification click logic here
//   // Redirect to a specific URL or perform other actions
// });

// import React, { useState, useEffect } from 'react';
// import ProvidersWrapper from '../utils/context/AuthProviderMerged';
// import Loader from '../components/Loader/Loader';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { store } from '@/src/redux/store';
// import { Provider } from 'react-redux';
// import { generateToken, messaging } from '../utils/firebase/firebaseInit';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { showNotification } from '../components/Notifications/toastNotifications';
// import axios from 'axios'; // Import Axios
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
// import { onMessage } from 'firebase/messaging';

// interface AppProps {
//   Component: React.ComponentType<any>;
// }

// const App: React.FC<AppProps> = ({ Component }) => {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     generateToken();
  
//     // ### not needed => to receive broadcast
//     let broadcastChannel: BroadcastChannel;
//     if (messaging) {
//       // Set up a BroadcastChannel to receive background messages
//       broadcastChannel = new BroadcastChannel('background-message');
//       let messageIdCache = ''; // Cache for messageId
  
//       const handleMessage = async (event: { data: any }) => {
//         const payload = event.data;
//         console.log('Received payload from BroadcastChannel:', payload);
  
//         if (payload.notification) {
//           const messageId = payload.messageId || messageIdCache || uuidv4(); // Use cached messageId or generate a new one
//           messageIdCache = messageId; // Update messageId cache
  
//           showNotification(
//             payload.notification.title || '',
//             payload.notification.body || ''
//           );
  
//           try {
//             // Make a fetch call to send the notification data to the server
//             const requestData = {
//               title: payload.notification.title,
//               body: payload.notification.body,
//               messageId: messageId,
//             };
  
//             await axios.post('http://localhost:3005/notification', requestData);
//           } catch (error) {
//             console.error('Failed to send notification data:', error);
//           }
//         }
//       };
  
//       broadcastChannel.onmessage = handleMessage;
//       // ### not needed <=
  
//       // Listen for Firebase messaging events
//       onMessage(messaging, async (payload) => {
//         console.log('Received Firebase message:', payload);
  
//         const messageId = payload.messageId || messageIdCache || uuidv4(); // Use cached messageId or generate a new one
//         messageIdCache = messageId; // Update messageId cache
  
//         if (payload.notification && payload.messageId) {
//           showNotification(
//             payload.notification.title || '',
//             payload.notification.body || ''
//           );
  
//           try {
//             // Make an Axios call to send the notification data to the server
//             const requestData = {
//               title: payload.notification.title,
//               body: payload.notification.body,
//               messageId: payload.messageId || messageId,
//             };
  
//             await axios.post('http://localhost:3005/notification', requestData);
//           } catch (error) {
//             console.error('Failed to send notification data:', error);
//           }
//         }
//       });
//     }
  
//     // Always return a cleanup function, even if it does nothing
//     return () => {
//       if (broadcastChannel) {
//         broadcastChannel.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker
//         .register('/service-worker.js')
//         .then((registration) => {
//           console.log('Service worker registered:', registration);
//         });
//     }
//   }, []);

//   return (
//     <Provider store={store}>
//       <ProvidersWrapper>
//         <ProSidebarProvider>
//           {loading ? (
//             <Loader />
//           ) : (
//             <Router>
//               <Component />
//               <ToastContainer position="top-right" />
//             </Router>
//           )}
//         </ProSidebarProvider>
//       </ProvidersWrapper>
//     </Provider>
//   );
// };

// export default App;

