// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import AdminLayout from '../../components/Layout/Admin/AdminLayout';
// import { useSession } from 'next-auth/react';

// const IsAuthAdmin = (WrappedComponent) => (props) => {
//   const { data: session } = useSession();
//   console.log('line:100', session);

//   const key = session?.user?.role;
//   const router = useRouter();

//   useEffect(() => {
//     if (!key) {
//       router.push('/');
//     }
//   }, [key, router]);

//   return (
//     <div>
//       {key === 'admin' ? (
//         <AdminLayout>
//           <WrappedComponent {...props} />
//         </AdminLayout>
//       ) : (
//         <div className="lockedContainer">
//           <h1 className="text-5xl">You Shall Not Pass1!</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IsAuthAdmin; // Export IsAuth as a named export
