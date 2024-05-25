import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchUserById, updateUser } from '../../../../redux/slices/userSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import {
  Typography,
  Spin,
  Divider,
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
} from 'antd';
import { Formik } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface User {
  userId: number;
  fullName: string;
  email: string;
  username: string;
  role: string;
  blocked: boolean;
}

const EditUserPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);

  useEffect(() => {
    const userId = id as string;
    if (status === 'idle') {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, id, status, users]);

  const findUserById = (userId: string): User | undefined => {
    return users.find((user) => user.userId === Number(userId));
  };

  const handleInputChange = (handleChange) => (e) => {
    handleChange(e);
  };

  const handleSubmit = (values, user) => {
    const data = {
      ...values
    };
    console.log("line:100", data);
    

    dispatch(updateUser({ userId: Number(user.userId), updatedData: data }));
  };

  const user = findUserById(id as string);
  console.log("line:100", user);
  

  return (
    <AdminLayout>
      <Link href="/admin/AdminUsers">
        <Button type="primary" danger>
          Back
        </Button>
      </Link>
      <Spin spinning={status === 'loading'}>
        <Title level={2}>Edit User</Title>
        <Divider />
        {user ? (
          <Card title={user.fullName} style={{ width: '100%' }}>
            <Formik
              initialValues={{
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                blocked: user.blocked,
                username: user.username
              }}
              onSubmit={(values) => handleSubmit(values, user)}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  initialValues={{
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    blocked: user.blocked,
                    username: user.username
                  }}
                >
                  <Form.Item label="Full Name" name="fullName">
                    <Input
                      value={values.fullName}
                      onChange={handleInputChange(handleChange)}
                    />
                  </Form.Item>
                  <Form.Item label="Username" name="username">
                    <Input
                      value={values.username}
                      onChange={handleInputChange(handleChange)}
                    />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input
                      value={values.email}
                      onChange={handleInputChange(handleChange)}
                    />
                  </Form.Item>
                  <Form.Item label="Role" name="role">
                    <Select
                      value={values.role}
                      onChange={(value) => setFieldValue('role', value)}
                    >
                      <Option value="user">User</Option>
                      <Option value="admin">Admin</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Blocked" name="blocked">
                    <Switch
                      checked={values.blocked}
                      onChange={(checked) => setFieldValue('blocked', checked)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
          </Card>
        ) : (
          <Paragraph>No user found with ID {id}</Paragraph>
        )}
      </Spin>
    </AdminLayout>
  );
};

export default EditUserPage;
