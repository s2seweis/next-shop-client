import Nav from '@/src/components/Nav/Nav';
import AdminLayout from '../../components/Layout/Admin/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/src/redux/hooks';
import Loader from '@/src/components/Loader/Loader';
import CategoryList from '@/src/components/Admin/Categories/CategoryList';

const AdminCategories = () => {

  const userProfile = useAppSelector((state) => state.profile.userProfile);
  // const { data: session } = useSession();
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
          <div>
            <Nav></Nav>
            {/* <h4>Categories</h4> */}
            <CategoryList/>
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

export default AdminCategories;