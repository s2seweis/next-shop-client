import React, { useEffect, useState } from 'react';
import { Table, Modal, Input, Button, Badge, Avatar, Space } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { fetchCategories, deleteCategory } from '../../../redux/slices/categorySlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryImage: string;
  numberOfProducts: number;
  key?: string;
}

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const status = useAppSelector((state) => state.categories.status);
  const [list, setList] = useState<Category[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setList(categories);
    }
  }, [status, categories]);

  const handleDelete = (categoryId: number, key?: string) => {
    setModalVisible(true);
    setCategoryIdToDelete(categoryId);
    setKeyToDelete(key || null);
  };

  const handleConfirmDelete = () => {
    if (categoryIdToDelete !== null) {
      setConfirmLoading(true);
      dispatch(deleteCategory({ categoryId: categoryIdToDelete, key: keyToDelete }))
        .then(() => {
          setConfirmLoading(false);
          setModalVisible(false);
          dispatch(fetchCategories()); // Fetch categories again after deletion
        });
    }
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setCategoryIdToDelete(null);
    setKeyToDelete(null);
  };

  const handleRefresh = () => {
    dispatch(fetchCategories());
  };

  // const filteredList = list.filter((category) => 
  //   category.categoryName.toLowerCase().includes(searchText.toLowerCase())
  // );

  const filteredList = list.filter((category) => {
    return category.categoryName && category.categoryName.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'categoryImage',
      key: 'categoryImage',
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Products',
      dataIndex: 'numberOfProducts',
      key: 'numberOfProducts',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Link href={`/admin/categories/edit/${record.categoryId}`} passHref>
            Edit
          </Link>
          <a onClick={() => handleDelete(record.categoryId, record.key)}>Delete</a>
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
          placeholder="Category Name ..."
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
        <Link href="/admin/categories/AddCategory" passHref>
          <Button type="primary">Add Category</Button>
        </Link>
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
      />
      <Modal
        title="Confirm Delete"
        visible={modalVisible}
        onOk={handleConfirmDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
};

export default CategoryList;
