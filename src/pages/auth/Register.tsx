import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Form, Input, Button, Typography, notification } from 'antd';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import styles from '../../styles/scss/pages/auth/Register.module.scss'; // Import SCSS file
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const fullURL = `${baseURL}/register`;

const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleRegister = async (values: { name: string; email: string; username: string; password: string }) => {
    try {
      const response = await axios.post(fullURL, values);

      // Assuming your server returns a token upon successful registration
      const token = response.data.token;

      // Store the token in local storage or cookies as needed
      localStorage.setItem('token', token);

      // Show success notification
      notification.success({
        message: 'Registration Successful',
        description: 'You have successfully registered. Redirecting to login...',
      });

      // Optionally, you can redirect to the login page or any other page
      // router.push('/auth/SignIn');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerFormContainer}>
        <Title level={3} className={styles.registerTitle}>Register</Title>
        <Form
          form={form}
          name="register"
          className={styles.registerForm}
          onFinish={handleRegister}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input className={styles.registerInput} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input className={styles.registerInput} />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input className={styles.registerInput} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className={styles.registerInput} />
          </Form.Item>
          {errorMessage && <Typography.Text type="danger">{errorMessage}</Typography.Text>}
          <Form.Item>
            <Button type="primary" htmlType="submit" block className={styles.registerButton}>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.goToLogin}>
          <Link href="/auth/SignIn">Go to SignIn</Link>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Register);
