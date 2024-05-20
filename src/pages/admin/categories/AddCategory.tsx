import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../redux/slices/categorySlice';
import { Typography, Spin, Divider, Card, Form, Input, Button, Upload, UploadProps } from 'antd';
import { Formik } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';
import { AppDispatch } from '@/src/redux/store'; // import your AppDispatch type
import { notification } from 'antd';

const { Title } = Typography;

interface FormValues {
  category_name: string;
  number_of_products: number;
}

const AddCategoryPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // properly type the dispatch
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageData, setImageData] = useState<File | null>(null);

  const handleImageChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done' && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(info.file.originFileObj);
      setImageData(info.file.originFileObj);
    }
  };

  const handleSubmit = (values: FormValues) => {

    // ###

    const data = {
      ...values,
      category_image: imageData,
    };
    console.log('line:1', data);

    // ###

    // const formData = new FormData();
    // formData.append('category_name', values.category_name);
    // formData.append('number_of_products', values.number_of_products.toString());
    // if (imageData) {
    //   formData.append('category_image', imageData);
    // }

    // console.log('line:2', formData);


    // dispatch(addCategory(data));
    // // dispatch(addCategory(formData));

    dispatch(addCategory(data)).then((resultAction) => {
      if (addCategory.fulfilled.match(resultAction)) {
        notification.success({
          message: 'Category Added',
          description: 'The category was successfully added.',
        });
      }
    });
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
                  <Input
                    value={values.category_name}
                    onChange={handleChange('category_name')}
                  />
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
                    onChange={handleChange('number_of_products')}
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
