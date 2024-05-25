import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  fetchCategoryById,
  updateCategory,
} from '../../../../redux/slices/categorySlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import {
  Typography,
  Spin,
  Divider,
  Card,
  Form,
  Input,
  Button,
  Upload,
  UploadProps,
  Space,
} from 'antd';
import { Formik, FormikHandlers } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Category {
  categoryId: number;
  categoryName: string;
  categoryImage: string;
  numberOfProducts: number;
  key: string;
}

const EditCategoryPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const categories = useAppSelector((state) => state.categories.categories);
  const status = useAppSelector((state) => state.categories.status);

  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [urlPreview, setUrlPreview] = useState<string>('');
  const [isUrlUsed, setIsUrlUsed] = useState<boolean>(false);
  const [isUploadUsed, setIsUploadUsed] = useState<boolean>(false);

  useEffect(() => {
    const categoryId = id as string;
    if (status === 'idle') {
      dispatch(fetchCategoryById(categoryId));
    }
  }, [dispatch, id, status, categories]);

  const findCategoryById = (categoryId: string): Category | undefined => {
    return categories.find(
      (category) => category.categoryId === Number(categoryId),
    );
  };

  const handleUploadChange: UploadProps['onChange'] = ({ file }) => {
    if (file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file.originFileObj);
      setNewImage(file.originFileObj);
      setIsUploadUsed(true);
      setIsUrlUsed(false);
      setUrlPreview('');
    }
  };

  const handleInputChange = (handleChange: FormikHandlers['handleChange']) => (e: { target: { name: any; value: any; }; }) => {
    const { name } = e.target;
    if (name === 'category_image') {
      setImagePreview('');
      setUrlPreview('');
      setIsUrlUsed(false);
      setIsUploadUsed(false);
    }
    handleChange(e);
  };

  const handleShowPreview = () => {
    setUrlPreview(
      (document.getElementById('category_image') as HTMLInputElement).value,
    );
    setIsUrlUsed(true);
    setIsUploadUsed(false);
    setImagePreview('');
  };

  const removePreviewUrl = () => {
    setUrlPreview('');
    setIsUrlUsed(false);
  };

  const removePreviewImage = () => {
    setImagePreview('');
    setIsUploadUsed(false);
    setNewImage(null)
  };

  const handleSubmit = (values: { category_name?: string; category_image: any; number_of_products?: number; }, category: Category) => {
    const data = {
      ...values,
      category_image: newImage ? newImage : values.category_image,
      key: category.key,
    };

    dispatch(updateCategory({ categoryId: Number(category.categoryId), updatedData: data }));
  };

  const category = findCategoryById(id as string);

  return (
    <AdminLayout>
      <Link href="/admin/AdminCategories">
        <Button type="primary" danger>
          Back
        </Button>
      </Link>
      <Spin spinning={status === 'loading'}>
        <Title level={2}>Edit Category</Title>
        <Divider />
        {category ? (
          <Card title={category.categoryName} style={{ width: '100%' }}>
            <Formik
              initialValues={{
                category_name: category.categoryName,
                category_image: category.categoryImage,
                number_of_products: category.numberOfProducts,
              }}
              onSubmit={(values) => handleSubmit(values, category)}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  initialValues={{
                    category_name: category.categoryName,
                    category_image: category.categoryImage,
                    number_of_products: category.numberOfProducts,
                  }}
                >
                  <Form.Item label="Category Name" name="category_name">
                    <Input
                      value={values.category_name}
                      onChange={handleInputChange(handleChange)}
                    />
                  </Form.Item>
                  <Form.Item label="Category Image URL" name="category_image">
                    <Input
                      id="category_image"
                      value={values.category_image}
                      onChange={handleInputChange(handleChange)}
                      style={{
                        width: 'calc(100% - 120px)',
                        marginRight: '8px',
                      }}
                      disabled={isUploadUsed}
                    />
                    <Button onClick={handleShowPreview} disabled={isUploadUsed}>
                      Add
                    </Button>
                  </Form.Item>
                  {urlPreview && (
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ display: 'flex' }}
                    >
                      <img
                        src={urlPreview}
                        alt="Category Preview"
                        style={{
                          maxWidth: '100%',
                          marginTop: '1rem',
                          maxHeight: '200px',
                          display: 'block',
                        }}
                      />
                      <Button
                        onClick={removePreviewUrl}
                        style={{ marginLeft: '50px' }}
                      >
                        Remove 1
                      </Button>
                    </Space>
                  )}
                  <Form.Item label="Or Upload New Image" name="upload_image">
                    <Upload
                      accept="image/*"
                      showUploadList={false}
                      onChange={handleUploadChange}
                      disabled={isUrlUsed}
                    >
                      <Button icon={<UploadOutlined />} disabled={isUrlUsed}>
                        Upload New Image
                      </Button>
                    </Upload>
                    {imagePreview && (
                      <Space
                      direction="vertical"
                      size="middle"
                      style={{ display: 'flex' }}
                      >
                      <img
                        src={imagePreview}
                        alt="Category Preview"
                        style={{
                          maxWidth: '100%',
                          marginTop: '1rem',
                          maxHeight: '200px',
                          display: 'block',
                        }}
                        />
                    <Button
                      onClick={removePreviewImage}
                      style={{ marginLeft: '50px' }}
                    >
                      Remove 2
                    </Button>
                      </Space>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Number of Products"
                    name="number_of_products"
                  >
                    <Input
                      value={values.number_of_products}
                      onChange={handleInputChange(handleChange)}
                      type="number"
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
          <Paragraph>No category found with ID {id}</Paragraph>
        )}
      </Spin>
    </AdminLayout>
  );
};

export default EditCategoryPage;
