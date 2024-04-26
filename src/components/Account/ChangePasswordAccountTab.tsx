import Nav from '../Nav/Nav';
import ChangePasswordComponent from '@/src/components/Account/Profile/ChangePasswordComponent';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/src/styles/scss/pages/Account/Profile.module.scss';

// Define the shape of the user object within the session
interface User {
  userId?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  // Add other properties as needed
}

// Extend the User interface to include the userId property
interface UserWithUserId extends User {
  userId: string;
}

const ChangePasswordAccountTab: React.FC = () => {
  const { data: session } = useSession(); // Retrieve session information

  // Ensure that userId is of type UserWithUserId
  const userId = (session?.user as UserWithUserId)?.userId;
  
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div>
      <Nav />
      {session ? (
        <div className={styles.mainContainer}>
          {/* Use optional chaining here */}
          <ChangePasswordComponent userId={userId ?? ''}  />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div>
            <h1 className="text-5xl">You should log in first to see a profile!</h1>
            <Link href="/">
              <div style={{ textAlign: "center" }} className="goBack">
                Go back to Home Page
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordAccountTab;
