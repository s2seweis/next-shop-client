// import { useAuth } from '../../utils/context/AuthProviderMerged';
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import Nav from '../../components/Nav/Nav';
import styles from '@/src/styles/scss/pages/Account/Dashboard.module.scss';
// import AuthButton from '../../components/Buttons/AuthButton/AuthButton.js';
import Layout from '@/src/components/Layout/Layout';

const Dashboard: React.FC = () => {
  // const { isLoggedIn } = useAuth(); // Use the useAuth hook to access the AuthContext
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push('/');
  //   }
  // }, [isLoggedIn, router]);

  // if (!isLoggedIn) {
  //   return null;
  // }

  return (
    <div>
      <Layout>
        <Nav />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <h3 style={{ textAlign: 'center' }}>Hello Dashboard1 (Auth Provider)</h3>
            {/* <AuthButton /> */}
          </main>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
