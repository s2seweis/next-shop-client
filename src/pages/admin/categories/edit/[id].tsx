import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchCategoryById, updateCategory } from '../../../../redux/slices/categorySlice'; // Updated import for categories
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import {
  Typography,
  Spin,
  Divider,
  Card,
  Form,
  Input,
  Button,
} from 'antd';
import { Formik } from 'formik';
import Link from 'next/link';
import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';

const { Title, Paragraph } = Typography;

interface Category {
  categoryId: number;
  categoryName: string;
  categoryImage: string;
  numberOfProducts: number;
}

const EditCategoryPage = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories.categories);
  const status = useAppSelector((state) => state.categories.status);

  const router = useRouter();
  const { id } = router.query;

  // Function to search for a category by its ID
  const findCategoryById = (categoryId: string): Category | undefined => {
    return categories.find((category) => category.categoryId === Number(categoryId));
  };

  useEffect(() => {
    const categoryId = id as string;
    const categoryExists = findCategoryById(categoryId);

    if (status === 'idle' && !categoryExists) {
      dispatch(fetchCategoryById(categoryId));
    }
  }, [dispatch, id, categories, status]);

  // Fetch category details based on the ID and display them for editing
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
             

              // onSubmit={(values) => {
              //   dispatch(updateCategory({ categoryId: category.categoryId, updatedData: values }));
              // }}
              onSubmit={(values) => {
                dispatch(updateCategory({ categoryId: Number(category.categoryId), updatedData: values }));
              }}
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
                    <Input value={values.category_name} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Category Image" name="category_image">
                    <Input value={values.category_image} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Number of Products" name="number_of_products">
                    <Input value={values.number_of_products} onChange={handleChange} type="number" />
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
