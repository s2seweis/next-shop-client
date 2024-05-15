import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../redux/slices/categorySlice';
import { Typography, Spin, Divider, Card, Form, Input, Button, Upload } from 'antd';
import { Formik } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';

const { Title } = Typography;

const AddCategoryPage = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState('');
  const [imageData, setImageData] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === 'done' && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
      setImageData(info.file.originFileObj);
    }
  };

  const handleSubmit = (values) => {
    console.log('Submitting form:', values); // Check if handleSubmit is being called
    console.log('Image data:', imageData); // Check if imageData is set correctly

    const data = {
      ...values,
      category_image: imageData,
    };
    console.log('Form data:', data);

    dispatch(addCategory(data));
  };

  return (
    <AdminLayout>
      <Link href="/admin/AdminCategories">
        <Button type="primary" danger>
          Back
        </Button>
      </Link>
      <Spin spinning={false}>
        <Title level={2}>Add New Category</Title>
        <Divider />
        <Card title="New Category" style={{ width: '100%' }}>
          <Formik
            initialValues={{
              category_name: '',
              number_of_products: 0,
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={values}
              >
                <Form.Item label="Category Name" name="category_name">
                  <Input value={values.category_name} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Category Image" name="category_image">
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    onChange={handleImageChange}
                  >
                    <Button>Upload</Button>
                  </Upload>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Category Preview"
                      style={{ maxWidth: '100%', marginTop: '1rem', maxHeight: '200px', display: 'block' }}
                    />
                  )}
                </Form.Item>
                <Form.Item label="Number of Products" name="number_of_products">
                  <Input
                    value={values.number_of_products}
                    onChange={handleChange}
                    type="number"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Category
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Card>
      </Spin>
    </AdminLayout>
  );
};

export default AddCategoryPage;
