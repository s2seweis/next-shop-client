// SignInButton.jsx

import { signIn, signOut, useSession } from 'next-auth/react';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import React from 'react';
import styles from '../../../styles/scss/components/buttons/SignInButton.module.scss'; // import the SCSS file
import { useAppSelector } from '@/src/redux/hooks';

const SignInButton = () => {
  const { data: session } = useSession();

  const getTruncatedName = (name: string) => {
    if (!name || name.length <= 0) {
      return 'Guest';
    } else if (name.length <= 10) {
      return name;
    } else {
      return name.substring(0, 10) + '.';
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/SignIn' });
  };

  const userProfile = useAppSelector((state) => state.profile.userProfile);

  return (
    <div
      className="ml-auto flex gap-2"
      style={{ justifyContent: 'center', display: 'flex' }}
    >
      {session?.user ? (
        <>
          <div className={styles.containerSignIn}>
            <p className="text-sky-600">
              hello&nbsp;{getTruncatedName(userProfile?.username || 'Guest')}
            </p>
            <button className="text-red-500" onClick={handleSignOut}>
              <GoSignOut className="inline-block align-text-bottom mr-1" />
            </button>
          </div>
        </>
      ) : (
        <button className={styles.buttonSignOut} onClick={() => signIn()}>
          <GoSignIn className="inline-block align-text-bottom mr-1" />
        </button>
      )}
    </div>
  );
};

export default SignInButton;
