importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize Firebase app in the service worker.
firebase.initializeApp({
  apiKey: 'AIzaSyAzPddnPIkhCeeO-UaAPkR48cW4ZXAS9qE',
  authDomain: 'next-js-client.firebaseapp.com',
  projectId: 'next-js-client',
  storageBucket: 'next-js-client.appspot.com',
  messagingSenderId: '916052246117',
  appId: '1:916052246117:web:f5e41caf3aea8ffe8b108c',
  measurementId: 'G-SWFC6R7ME5',
});

const messaging = firebase.messaging();

let lastMessageTime = 0; // Track the timestamp of the last sent message

// Listen for background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  // Determine the current timestamp
  const currentTime = Date.now();

  // If less than 1 second has passed since the last message, ignore the message
  if (currentTime - lastMessageTime < 1000) {
    console.log('[firebase-messaging-sw.js] Message ignored due to rapid succession');
    return;
  }

  // Store the message payload in Cache Storage
  caches.open('background-messages').then((cache) => {
    cache.put('latest-message', new Response(JSON.stringify(payload)));
  });

  // Send a message to the client using BroadcastChannel
  const broadcastChannel = new BroadcastChannel('background-message');
  broadcastChannel.postMessage(payload);
  console.log('[firebase-messaging-sw.js] Sent message to client', payload);

  // Update the last message timestamp
  lastMessageTime = currentTime;
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked');
  event.notification.close();

  // Handle notification click logic here
  // Redirect to a specific URL or perform other actions
});
