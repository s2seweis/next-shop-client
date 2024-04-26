// import type { NextAuthOptions } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import axios from 'axios';

// export const options: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),

//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email:', type: 'text', placeholder: 'your-cool-email' },
//         password: { label: 'Password:', type: 'password', placeholder: 'your-awesome-password' },
//       },
//       async authorize(credentials) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           // Handle missing credentials
//           return null;
//         }

//         const { email, password } = credentials;

//         try {
//           // Make Axios request to login route
//           const response = await axios.post('http://localhost:3005/login', {
//             email,
//             password,
//           });

//           // Check if the response is successful
//           if (response.data) {
//             // const { user_id } = response.data;
//             return {
//               ...response.data,
//               jwt: response.data.token,
//               email: email,
//               userId: response.data.userid,
//               role: response.data.role,
//               // name:response.data.name
//             };
//           } else {
//             return null; // Return null if user not found
//           }
//         } catch (error) {
//           console.error('Error logging in:', error);
//           return null; // Return null if an error occurs
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user, account, profile }) {
//       if (account) {
//         token.jwt = user.jwt;
//         token.email = user.email;
//         token.userId = user.userId;
//         token.role = user.role;

//         // Modify the token object to include additional data from dummyData
//         if (profile && profile.dummyData) {
//           token.userId = profile.dummyData.userId;
//           // Add other data from dummyData if needed
//         }
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.jwt = token.jwt; // Add username to session object
//         session.user.email = token.email; // Add email to session object
//         session.user.userId = token.userId;
//         session.user.role = token.role;

//         // Add additional data from dummyData to the session object if available
//         if (token.userId) {
//           session.user.userId = token.userId;
//         }
//       }

//       return session;
//     },

//     async signIn({ profile }) {
//       try {
//         // Make a POST request to your API route
//         const response = await axios.post('http://localhost:3005/register-oauth', {
//           email: profile.email,
//           full_name: profile.name
//         });

//         // Store the userId in profile.dummyData
//         profile.dummyData = { userId: response.data.user.userId };
        
//         // Return the modified profile object
//         return true;
//       } catch (error) {
//         console.error('Error processing sign-in:', error);
//         return true; // Fallback to default OAuth flow
//       }
//     },
//   },

//   pages: {
//     signIn: '/auth/SignIn',
//   },
// };
