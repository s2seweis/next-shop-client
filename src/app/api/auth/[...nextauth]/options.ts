import type { NextAuthOptions, User, Profile } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import FacebookProvider from "next-auth/providers/facebook";
// ###
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const fullURL = `${baseURL}/login`;
// *works

const oauthURL = process.env.NEXT_PUBLIC_OAUTH;
const fullOauthURL = `${oauthURL}/register-oauth`;
// *works

interface ProfileWithDummyData extends Profile {
  dummyData?: { userId: string };
}

export const options: NextAuthOptions = {

  
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email:', type: 'text', placeholder: 'your-cool-email' },
        password: { label: 'Password:', type: 'password', placeholder: 'your-awesome-password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          // Handle missing credentials
          return null;
        }

        const { email, password } = credentials;

        try {
          // Make Axios request to login route
            const response = await axios.post(`${fullURL}`, {
            email,
            password,
          });
          
          // Check if the response is successful
          if (response.data) {
            return {
              ...response.data,
              email: email,
              userId: response.data.userid,
            };
          } else {
            return null; // Return null if user not found
          }
        } catch (error) {
          console.error('Error logging in:', error);
          return null; // Return null if an error occurs
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
     
      if (account) {
        if ('userid' in user) {
          token.userId = user.userid;
        }

        // Check if 'dummyData' exists in profile and assert its type
        if (profile && 'dummyData' in profile) {
          const dummyData = profile.dummyData as { userId: string }; // Adjust the type according to your actual data structure
          token.userId = dummyData.userId;
          // Add other data from dummyData if needed
        }
      }
      return token;
    },

    async session({ session, token }) {

      if (token && session.user) {
        // Define the type of session.user
        interface UserWithUserId extends User {
          userId: string;
        }

        // Use type assertion to specify 'userId' property in session.user
        const userWithUserId = session.user as UserWithUserId;

        // Type assertion to specify that token.userId is a string
        const userId = token.userId as string;

        // Assign userId to userWithUserId.userId
        userWithUserId.userId = userId;

        // Add additional data from dummyData to the session object if available
        if (token.userId && 'dummyData' in token) {
          const dummyData = token.dummyData as { userId: string }; // Adjust the type according to your actual data structure
          userWithUserId.userId = dummyData.userId;
          // Add other data from dummyData if needed
        }
      }

      return session;
    },

    // async signIn({ profile, email }) {
    async signIn({ profile }) {
    
      try {
        // Check if profile exists before accessing its properties
        const profileEmail = profile?.email;
        const profileName = profile?.name;
    
        // Make a POST request to your API route
          const response = await axios.post(`${fullOauthURL}`, {
          email: profileEmail,
          full_name: profileName
        });
    
        // Check if profile exists before modifying it
        if (profile) {
          // Type assertion to specify the profile type with 'dummyData'
          const profileWithDummyData = profile as ProfileWithDummyData;
          
          // Store the userId in profile.dummyData
          profileWithDummyData.dummyData = { userId: response.data.user.userId };
        }
    
        // Return the modified profile object
        return true;
      } catch (error) {
        console.error('Error processing sign-in:', error);
        return true; // Fallback to default OAuth flow
      }
    },
  },

  pages: {
    signIn: '/auth/SignIn',
  },
};
