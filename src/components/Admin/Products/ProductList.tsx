import React, { useEffect, useState } from 'react';
import {
  List,
  Skeleton,
  Avatar,
  Modal,
  Input,
  Button,
  Badge,
  Menu,
} from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  fetchProducts,
  deleteProduct,
} from '../../../redux/slices/productSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

interface Product {
  productid: number;
  productname: string;
  category: string;
}

const profilePlaceholder =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const status = useAppSelector((state) => state.products.status);
  const [list, setList] = useState<Product[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null,
  );
  const [searchText, setSearchText] = useState<string>('');
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(3);

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
    product.productname.toLowerCase().includes(searchText.toLowerCase()),
  );

  const onLoadMore = () => {
    setLoading(true);
    setStart(0);
    setEnd(end + 5);
    setLoading(false);
  };

  const loadMore = initLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load More</Button>
    </div>
  ) : null;

  return (
    <div >
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
          <span style={{ marginRight: '10px', fontSize: '16px' }}>
            {/* Products */}
          </span>
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
      <div style={{display:"flex", justifyContent:"space-between", margin:"0px 15px"}} mode="horizontal">
        <div style={{}} key="image-picture">Image</div>
        <div style={{}} key="product-name">Product</div>
        <div style={{}}  key="category">Category</div>
        <div style={{}} key="category">More</div>
      </div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={filteredList.slice(start, end)}
        loadMore={loadMore}
        renderItem={(item) => (
          <List.Item 
            actions={[
              <div className='more' style={{display:"grid"}}>
              <Link
                key="list-loadmore-edit"
                href={`/admin/products/edit/${item.productid}`}
                passHref
              >
                Edit
              </Link> 
              {/* |&nbsp;  */}
              <a
                key="list-loadmore-more"
                onClick={() => handleDelete(item.productid)}
              >
                Delete
              </a>
              </div>
            ]}
          >
            <Skeleton
              avatar
              title={false}
              loading={status === 'loading'}
              active
            >
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={<Avatar src={profilePlaceholder} />}
                title={
                  <a style={{ fontSize: '0.8rem' }} href="#">
                    {item.productname}
                  </a>
                }
              />
              <div>{item.category}</div>
            </Skeleton>
          </List.Item>
        )}
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
