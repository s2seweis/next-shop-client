import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Button, Typography, Space } from 'antd';
import { GithubOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import styles from '@/src/styles/scss/pages/auth/SignIn.module.scss'; // Import SCSS file
import type { InputRef } from 'antd';

const { Title, Text } = Typography;

const SignIn: React.FC = () => {
  const router = useRouter();
  const userNameRef = useRef<InputRef>(null);
  const passRef = useRef<InputRef>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result) {
      if (result.error) {
        setErrorMessage('Authentication failed. Please check your credentials.');
      } else {
        setErrorMessage('');
        router.push('/');
      }
    } else {
      console.error('Sign-in result is undefined.');
    }
  };

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/' });
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const handleFacebookSignIn = async () => {
    await signIn('facebook', { callbackUrl: '/' });
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormContainer}>
        <Title level={3} className={styles.loginFormTitle}>Login</Title>
        <Form
          name="signIn"
          className={styles.SignInForm}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            label="E-Mail"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input ref={userNameRef} className={styles.inputField} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password ref={passRef} className={styles.inputField} />
          </Form.Item>
          {errorMessage && <Text type="danger">{errorMessage}</Text>}
          <Form.Item>
            <Button type="primary" htmlType="submit" block className={styles.signInButton}>
              SIGN IN with E-Mail
            </Button>
          </Form.Item>
          <Space direction="vertical" size="middle" className={styles.oauthButtonContainer}>
            <Button
              icon={<GithubOutlined />}
              onClick={handleGitHubSignIn}
              block
              className={styles.signInButtonGithub}
            >
              SIGN IN with GitHub
            </Button>
            <Button
              icon={<GoogleOutlined />}
              onClick={handleGoogleSignIn}
              block
              className={styles.signInButtonGoogle}
            >
              SIGN IN with Google
            </Button>
            <Button
              icon={<FacebookOutlined />}
              onClick={handleFacebookSignIn}
              block
              className={styles.signInButtonFacebook}
            >
              SIGN IN with Facebook
            </Button>
          </Space>
        </Form>
        <div className={styles.goToSignIn}>
          <Link href="/auth/Register">Go to Register</Link>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(SignIn);
