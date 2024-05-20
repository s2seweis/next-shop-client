import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/slices/productSlice';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { Typography, Divider, Card, Form, Input, Button, Select } from 'antd';
import { Formik } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';
import { AppDispatch } from '@/src/redux/store';
import { notification } from 'antd';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

const { Title } = Typography;
const { Option } = Select; // Destructure Option from Select

interface Product {
  price: string;
  category: string;
  productname: string;
  productid: number;
  // Add other properties as needed
}

const AddProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const categories = useAppSelector((state) => state.categories.categories);
  console.log('line:1', categories);

  const categoriesField = categories.map((category) => category.categoryName);
  console.log('line:2', categoriesField);

  const status = useAppSelector((state) => state.categories.status);
  console.log('line:3', status);

  const handleSubmit = async (values: Product) => {
    console.log("line:4", values);
    
    try {
      await dispatch(addProduct(values));
      notification.success({
        message: 'Product Added',
        description: 'The product was successfully added.',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to add the product. Please try again later.',
      });
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]); // Dependency array ensures useEffect runs only once

  return (
    <AdminLayout>
      <Link href="/admin/AdminProducts">
        <Button type="primary" danger>
          Back
        </Button>
      </Link>
      <Title level={2}>Add New Product</Title>
      <Divider />
      <Card title="New Product" style={{ width: '100%' }}>
        <Formik
          initialValues={{
            productname: '',
            price: '',
            category: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={values}
            >
              <Form.Item label="Product Name" name="productname">
                <Input
                  value={values.productname}
                  onChange={handleChange('productname')}
                />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input
                  value={values.price}
                  onChange={handleChange('price')}
                  type="number"
                />
              </Form.Item>
              <Form.Item label="Category" name="category">
                {/* <Select
                  value={values.category}
                  onChange={(value) => handleChange('category')(value)}
                >
                  <Option value="Category A">Category A</Option>
                  <Option value="Category B">Category B</Option>
                  <Option value="Category C">Category C</Option>
                  <Option value="Category D">Category D</Option>
                </Select> */}
                <Form.Item >
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
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Product
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </AdminLayout>
  );
};

export default AddProductPage;
