import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from 'next/router';
import styles from '@/src/styles/scss/pages/auth/SignIn.module.scss'; // Import SCSS file
import Button from '../../components/Buttons/Button/Button';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';

const SignIn = () => {
  const router = useRouter();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = userNameRef.current?.value || '';
    const password = passRef.current?.value || '';

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Set redirect to false to handle errors manually
    });

    // Check if signIn function returns an error
    if (result) {
      // Check if signIn function returns an error
      if (result.error) {
        setErrorMessage('Authentication failed. Please check your credentials.');
      } else {
        // Clear error message if sign-in successful
        setErrorMessage('');
        router.push('/');
      }
    } else {
      // Handle the case where result is undefined
      console.error('Sign-in result is undefined.');
    }


  };

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/' });
  };

  return (
    <div
      style={{ display: 'flex', height: '100vh', alignItems: 'center' }}
      className={styles.loginPageContainer}
    >
      <div style={{ margin: 'auto' }} className={styles.loginFormContainer}>
        <h3 className={styles.loginFormTitle}>Login</h3>
        <form className={styles.SignInForm} onSubmit={onSubmit}>
          <div className={styles.formField}>
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              id="email"
              ref={userNameRef}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passRef}
              className={styles.inputField}
            />
          </div>
          {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
          <div className={styles.signInButtonContainer}>
            <Button
              type="submit"
              className={`${styles.signInCredentials} ${styles.signInButton}`}
            >
              SIGN IN with E-Mail
            </Button>

            <Button
              onClick={handleGitHubSignIn}
              className={`${styles.signInButtonGithub} ${styles.signInButton}`}
            >
              SIGN IN with GitHub
            </Button>
          </div>
          <div className={styles.signInButtonContainer}>
            <Button
              // onClick={onSubmit}
              className={`${styles.signInButtonGoogle} ${styles.signInButton}`}
            >
              SIGN IN with Google
            </Button>
            <Button
              // onClick={handleGitHubSignIn}
              className={`${styles.signInButtonFacebook} ${styles.signInButton}`}
            >
              SIGN IN with Facebook
            </Button>
          </div>
        </form>
        <div className={styles.goToSignIn}>
          <Link href="/auth/Register">Go to Register</Link>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(SignIn);