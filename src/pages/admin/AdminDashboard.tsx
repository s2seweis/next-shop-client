import Nav from '@/src/components/Nav/Nav';
import AdminLayout from '../../components/Layout/Admin/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/src/redux/hooks';

const AdminDashboard = () => {

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
            <h4>Dashboard</h4>
          </div>
        </AdminLayout>
      ) : (
        <div className="lockedContainer">
          <h1 className="text-5xl">You Shall Not Pass1!</h1>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;