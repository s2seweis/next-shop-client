import React, { useEffect, useState } from 'react';
import { Table, Modal, Input, Button, Badge, Space, notification } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { fetchUsers, deleteUser } from '../../../redux/slices/userSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

interface User {
  userId: number;
  fullName: string;
  userImage: string;
  email: string;
  username: string;
  role: string;
  blocked: boolean;
}

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const [list, setList] = useState<User[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  console.log("line:1000", userIdToDelete);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setList(users);
    }
  }, [status, users]);

  const handleDelete = (userId: number) => {
    setModalVisible(true);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete !== null) {
      setConfirmLoading(true);
      dispatch(deleteUser({ userId: userIdToDelete }))
        .then(() => {
          setConfirmLoading(false);
          setModalVisible(false);
          dispatch(fetchUsers()); // Fetch users again after deletion
          notification.success({
            message: 'User Deleted',
            description: 'The user has been deleted successfully.',
          });
        })
        .catch(() => {
          setConfirmLoading(false);
          notification.error({
            message: 'Deletion Failed',
            description: 'There was an error deleting the user.',
          });
        });
    }
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setUserIdToDelete(null);
  };

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  const filteredList = list.filter((user) => {
    return user.fullName && user.fullName.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Blocked',
      dataIndex: 'blocked',
      key: 'blocked',
      render: (blocked: boolean) =>
        blocked ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="error" text="Blocked" />
        ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Link href={`/admin/users/edit/${record.userId}`} passHref>
            Edit
          </Link>
          <a onClick={() => handleDelete(record.userId)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Link href="/">
          <Button
            style={{
              border: '1px solid',
              padding: '4px 8px',
              marginRight: '10px',
            }}
            type="text"
            danger
          >
            <ArrowLeftOutlined />
          </Button>
        </Link>
        <Input
          placeholder="Search by Name ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: '300px', marginRight: '10px' }}
        />
        <Badge overflowCount={999}>
          <span style={{ marginRight: '10px', fontSize: '16px' }}></span>
          {filteredList.length > 0 && (
            <sup
              data-show="true"
              className="ant-scroll-number ant-badge-count"
              style={{ marginRight: '40px', marginTop: '27px' }}
            >
              <bdi>
                <span className="ant-scroll-number-only">
                  <span className="ant-scroll-number-only-unit current">
                    {filteredList.length}
                  </span>
                </span>
              </bdi>
            </sup>
          )}
        </Badge>
        <Button
          style={{ minWidth: '40px', marginRight: '10px', marginLeft: '10px' }}
          type="default"
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredList}
        pagination={{ pageSize: 7 }}
        rowKey="userId"
      />
      <Modal
        title="Confirm Delete"
        visible={modalVisible}
        onOk={handleConfirmDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserList;
