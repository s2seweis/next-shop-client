// import { SessionProvider } from 'next-auth/react';
// import React, { createContext, useContext, useState, FC } from 'react';

// // ### Part: 1

// interface AuthContextType {
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // ### for the AuthButton

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // ### Part:2

// const AuthProvider: FC = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   const contextValue: AuthContextType = {
//     isLoggedIn,
//     login,
//     logout,
//   };

//   return (
//     <SessionProvider>
//       <AuthContext.Provider value={contextValue}>
//         {children}
//       </AuthContext.Provider>
//     </SessionProvider>
//   );
// };

// export default AuthProvider;

// // ###

"use client"
import { SessionProvider } from "next-auth/react";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
        {children} {/* Our entire app -> has access to NextAuth */}
    </SessionProvider>
  )
}
