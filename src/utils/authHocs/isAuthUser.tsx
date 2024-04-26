// // src/components/IsAuth/isAuth.tsx

// // import { useAuth } from '../../context/AuthProviderMerged';
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '../../components/Layout/Layout';
// import { useSession } from 'next-auth/react';

// const IsAuthUser = (WrappedComponent) => (props) => {
//   const { data: session } = useSession();
//   const key = session?.user?.role;
//   const router = useRouter();

//   useEffect(() => {
//     if (!key) {
//       router.push('/');
//     }
//   }, [key, router]);

//   return (
//     <div>
//       {/* {session !== null ? ( */}
//       {key === 'user || admin' ? (
//         <Layout>
//           <WrappedComponent {...props} />
//         </Layout>
//       ) : (
//         <div className="lockedContainer">
//           <h1 className="text-5xl">You Shall Not Pass1!</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IsAuthUser; // Export IsAuth as a named export
