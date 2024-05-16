import React, { useEffect, useState } from 'react';
import { Table, Modal, Input, Button, Badge, Avatar, Space } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchProducts, deleteProduct } from '../../../redux/slices/productSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

interface Product {
  productid: number;
  productname: string;
  category: string;
}

const profilePlaceholder = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);
  const [list, setList] = useState<Product[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    } else if (status === 'succeeded') {
      setList(products);
    }
  }, [dispatch, status, products]);

  const handleDelete = (productId: number) => {
    setModalVisible(true);
    setProductIdToDelete(productId);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete !== null) {
      setConfirmLoading(true);
      dispatch(deleteProduct(productIdToDelete)).then(() => {
        setConfirmLoading(false);
        setModalVisible(false);
      });
    }
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setProductIdToDelete(null);
  };

  const filteredList = list.filter((product) =>
    product.productname.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Image',
      dataIndex: 'productid',
      key: 'productid',
      render: () => <Avatar src={profilePlaceholder} style={{ height: '50px', width: '50px' }} />,
    },
    {
      title: 'Product',
      dataIndex: 'productname',
      key: 'productname',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Link href={`/admin/products/edit/${record.productid}`} passHref>
            Edit
          </Link>
          <a onClick={() => handleDelete(record.productid)}>Delete</a>
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
          placeholder="Product Name ..."
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
        <Link href="/admin/products/add" passHref>
          <Button type="primary">Add Product</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={filteredList}
        pagination={{ pageSize: 5 }}
        rowKey="productid"
      />
      <Modal
        title="Confirm Delete"
        visible={modalVisible}
        onOk={handleConfirmDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default ProductList;
