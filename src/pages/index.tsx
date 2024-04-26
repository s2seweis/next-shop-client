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
                Authentication with SignIn Form
                <Link href="/">Home (visible for all)</Link>
                <Link href="contact/ContactForm">
                  Contact (visible for all)
                </Link>
                <Link href="/admin/AdminDashboard">
                  Admin (visible for admin)
                </Link>
                <Link href="/checkout/Page">
                  Checkout (only visible for admin and user)
                </Link>
                <Link href="auth/Register">Register (visible for all)</Link>
                <Link href="auth/SignIn">
                  Sign In (visible for all) - Other Route
                </Link>
                <Link href="download/DownloadApp">App Download Button (visible for all)</Link>
              </h4>
              <h4>
                Products Redux Test: Post, Get, Delete & Update
                <Link href="/product/Products">
                  Get/Delete Products - Redux/ API Call
                </Link>
                <Link href="/product/AddProduct">
                  Add Products - Redux/ API Call
                </Link>
                <Link href="/product/UpdateProducts">
                  Update Products - Redux/ API Call
                </Link>
              </h4>
              <h4>
                Test Component
                <Link href="/user/Account">User Account</Link>
                <Link href="/test/Redux">Counter</Link>
              </h4>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Home);
