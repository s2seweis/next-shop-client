import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProductById } from '../../../../redux/slices/productSlice';
import { fetchCategories } from '../../../../redux/slices/categorySlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import {
  Typography,
  Spin,
  Divider,
  Card,
  Form,
  Input,
  Button,
  Select,
} from 'antd';
import { Formik } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';

const { Title, Paragraph } = Typography;
const { Option } = Select; // Destructure Option from Select

interface Product {
  price: string;
  category: string;
  productname: string;
  productid: number; // Corrected type to number
  // Add other properties as needed
}

const EditItemPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);

  const categories = useAppSelector((state) => state.categories.categories);
  console.log('line:1', categories);

  const categoriesField = categories.map((category) => category.categoryName);
  console.log('line:2', categoriesField);

  // const status = useAppSelector((state) => state.categories.status);
  // console.log('line:3', status);

  const router = useRouter();
  const { id } = router.query;

  // Function to search for a product by its ID
  const findProductById = (productId: string): Product | undefined => {
    return products.find((product) => product.productid === Number(productId)); // Convert productId to number
  };

  useEffect(() => {
    const productId = id as string;
    const productExists = findProductById(productId);

    if (status === 'idle' && !productExists) {
      dispatch(fetchProductById(productId));
      dispatch(fetchCategories());
    }
  }, [dispatch, id, products, status]);

  // useEffect(() => {
  //   // Fetch categories when the component mounts
  //   dispatch(fetchCategories());
  // }, [dispatch]); // Dependency array ensures useEffect runs only once

  // Fetch item details based on the ID and display them for editing
  const product = findProductById(id as string);

  return (
    // <div style={{ padding: '20px' }}>
    <AdminLayout>
      <Link href="/admin/AdminProducts">
        <Button type="primary" danger>
          Back
        </Button>
      </Link>
      <Spin spinning={status === 'loading'}>
        <Title level={2}>Edit Item {id}</Title>
        <Divider />
        {product ? (
          <Card title={product.productname} style={{ width: '100%' }}>
            <Formik
              initialValues={{
                productname: product.productname,
                price: product.price,
                category: product.category,
              }}
              onSubmit={(values) => {
                console.log('Form values:', values);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  initialValues={{
                    productname: product.productname,
                    price: product.price,
                    category: product.category,
                  }}
                >
                  <Form.Item label="Productname" name="productname">
                    <Input value={values.productname} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Price" name="price">
                    <Input value={values.price} onChange={handleChange} />
                  </Form.Item>

                  <Form.Item>
                    <Form.Item label="Category" name="category">
                      <Select
                        value={values.category}
                        onChange={(value) => handleChange('category')(value)}
                      >
                        {categoriesField.map((categoryName) => (
                          <Option key={categoryName} value={categoryName}>
                            {categoryName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
          </Card>
        ) : (
          <Paragraph>No product found with ID {id}</Paragraph>
        )}
      </Spin>
    </AdminLayout>
    // </div>
  );
};

export default EditItemPage;
