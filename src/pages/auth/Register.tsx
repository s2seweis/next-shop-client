import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link from Next.js
import styles from '../../styles/scss/pages/auth/Register.module.scss'; // Import SCSS file
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://your-api-server/register', {
        name,
        email,
        username,
        password,
      });

      // Assuming your server returns a token upon successful registration
      const token = response.data.token;

      // Store the token in local storage or cookies as needed
      localStorage.setItem('token', token);

      // Trigger the onRegisterSuccess callback to handle the successful registration on the parent component
      onRegisterSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, e.g., display an error message to the user
    }
  };

  return (
    <div style={{ display: 'flex', margin: 'auto', height: '100vh' }}>
      <div className={styles.registerContainer}>
        <h3 className={styles.registerTitle}>Register</h3>
        <form className={styles.registerForm} onSubmit={handleRegister}>
          <div className={styles.registerInputWrapper}>
            <label>
              Name:
              <input
                className={styles.registerInput}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.registerInputWrapper}>
            <label>
              Email:
              <input
                className={styles.registerInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.registerInputWrapper}>
            <label>
              Username:
              <input
                className={styles.registerInput}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.registerInputWrapper}>
            <label>
              Password:
              <input
                className={styles.registerInput}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.registerButtonContainer}>
            <button className={styles.registerButton} type="submit">
              Register
            </button>
          </div>
        </form>
        <div className={styles.goToLogin}>
          <Link href="/auth/SignIn">Go to SignIn</Link>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Register);
