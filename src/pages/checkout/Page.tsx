import Nav from '@/src/components/Nav/Nav';
import Layout from '../../components/Layout/Public/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/src/redux/hooks';

const Checkout = () => {
  const userProfile = useAppSelector((state) => state.profile.userProfile);
  // const { data: session } = useSession();
  const key = userProfile?.role;
  const router = useRouter();

  useEffect(() => {
    if (key !== 'admin' && key !== 'user') { // Changed logical operator
      router.push('/');
    }
  }, [key, router]);

  return (
    <div>
      {(key === 'admin' || key === 'user') ? ( // Changed logical operator
        <Layout>
          <div style={{display:"flex", justifyContent:"center", height:"100vh", alignItems:"center"}}>
            <Nav />
            <h4>Checkout</h4>
          </div>
        </Layout>
      ) : (
        <div style={{display:"flex", justifyContent:"center", height:"100vh", alignItems:"center"}} className="lockedContainer">
          <h1 className="text-5xl">You Shall Not Pass - Checkout!</h1>
        </div>
      )}
    </div>
  );
};

export default Checkout;
