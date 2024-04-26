// Import the original Session type from 'next-auth'
import { Session as NextAuthSession } from 'next-auth';

// Define the shape of the user object within the session
interface User {
  userId?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  // Add other properties as needed
}

// Extend the original Session type to include the user property
export interface CustomSession extends NextAuthSession {
  user?: User;
}
