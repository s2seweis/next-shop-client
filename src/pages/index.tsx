import React, { useEffect } from 'react';
import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/home/Home.module.scss';
import Link from 'next/link';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import { useSession } from 'next-auth/react';
import { fetchUserProfile } from '../../src/redux/slices/profileSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import { RootState } from '../../src/redux/store';

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

const Home: React.FC = () => {
  const { data: session } = useSession(); // Retrieve session information  
  
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.profile.status);
  
  useEffect(() => {
    if (status === 'idle' && (session?.user as UserWithUserId)?.userId) {
      // Check if 'userId' property exists in 'session.user' before accessing it
      dispatch(fetchUserProfile((session?.user as UserWithUserId).userId));
    }
  }, [dispatch, status, session?.user as UserWithUserId]); // Dispatch only when status or userId changes

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContainerAlign}>
        <Nav />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <h3>Hello Home</h3>
            <h5 style={{ textAlign: 'center', marginTop: '-15px' }}>
              Overview Links:
            </h5>
            <div className={styles.linkContainer}>
              <h4>
                Auth
                <Link href="auth/Register">Register (visible for all)</Link>
                <Link href="auth/SignIn">
                  Sign In (visible for all) - Other Route
                </Link>
                <Link href="/reset/RequestReset">Request New Password</Link>
                <Link href="/reset/page/param1/param2">Confirm New Password</Link>
                <Link href="/reset/ResetMessage">Reset Message</Link>
              </h4>
              <h4>
                Shop
                <Link href="/">Home (visible for all)</Link>
                <Link href="/user/Account">User Account</Link>
                <Link href="contact/ContactForm">
                  Contact (visible for all)
                </Link>
                <Link href="/admin/AdminDashboard">
                  Admin (visible for admin)
                </Link>
                <Link href="/admin/AdminProducts">Product List | Admin</Link>
                <Link href="/admin/AdminCategories">Category List | Admin</Link>
                <Link href="/checkout/Page">
                  Checkout (only visible for admin and user)
                </Link>
                <Link href="download/DownloadApp">App Download Button (visible for all)</Link>
                <Link href="/">Notifications | Front & Background Messages</Link>
              </h4>
              <h4>
                Workbench
                <Link href="/test/Redux">Counter - For Ingredients</Link>
              </h4>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Home);
