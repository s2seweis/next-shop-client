// import React, { useState, useEffect } from 'react';
// import ProvidersWrapper from '../utils/context/AuthProviderMerged';
// import Loader from '../components/Loader/Loader';
// import '../styles/scss/global/global.scss';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { store } from '@/src/redux/store';
// import { Provider } from 'react-redux';
// import { generateToken, messaging } from '../utils/firebase/firebaseInit';
// import { onMessage } from 'firebase/messaging';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { showNotification } from '../components/Notifications/toatNotifications';
// import axios from 'axios'; // Import Axios

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
//     if (messaging) {
//       onMessage(messaging, async (payload) => {
//         // Make the callback function async
//         console.log(payload);
//         if (payload.notification && payload.messageId) {
//           // Check if both notification and messageId are available
//           showNotification(
//             payload.notification.title || '',
//             payload.notification.body || '',
//           );
//           try {
//             // Make an Axios call to send the notification data to the server
//             // ##Clear the table: "TRUNCATE TABLE table_name;"
//             await axios.post('http://localhost:3005/notification', {
//               title: payload.notification.title || '',
//               body: payload.notification.body || '',
//               messageId: payload.messageId || '',
//             });
//           } catch (error) {
//             console.error('Failed to send notification:', error);
//           }
//           // Trigger re-render when a new message arrives
//           // location.reload(); // This reloads the current URL
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker
//         .register('/service-worker.js')
//         .then((registration) => console.log('scope is: ', registration.scope));
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
