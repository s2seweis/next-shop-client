import Nav from '@/src/components/Nav/Nav';
import AdminLayout from '../../components/Layout/Admin/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '@/src/redux/hooks';
import ProductList from '@/src/components/Admin/Products/ProductList';
import Loader from '@/src/components/Loader/Loader';

const AdminDashboard = () => {

  const userProfile = useAppSelector((state) => state.profile.userProfile);
  const key = userProfile?.role;
  const router = useRouter();

  useEffect(() => {
    if (key !== 'admin') {
      router.push('/');
    }
  }, [key, router]);

  return (
    <div>
      {key === 'admin' ? (
        <AdminLayout>
          <div className='adminSidebarContainer' style={{
            width:"100%"
            }}>
            <Nav></Nav>
            <ProductList/>
          </div>
        </AdminLayout>
      ) : (
        <div className="lockedContainer">
          {/* <h1 className="text-5xl">You Shall Not Pass1!</h1> */}
          <Loader/>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;