// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { fetchCategoryById, updateCategory } from '../../../../redux/slices/categorySlice';
// import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
// import {
//   Typography,
//   Spin,
//   Divider,
//   Card,
//   Form,
//   Input,
//   Button,
//   Upload,
//   UploadProps,
// } from 'antd';
// import { Formik } from 'formik';
// import Link from 'next/link';
// import AdminLayout from '@/src/components/Layout/Admin/AdminLayout';
// import { UploadOutlined } from '@ant-design/icons';

// const { Title, Paragraph } = Typography;

// interface Category {
//   categoryId: number;
//   categoryName: string;
//   categoryImage: string;
//   numberOfProducts: number;
//   key: string;
// }

// const EditCategoryPage = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { id } = router.query;

//   const categories = useAppSelector((state) => state.categories.categories);
//   const status = useAppSelector((state) => state.categories.status);

//   const [newImage, setNewImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');

//   useEffect(() => {
//     const categoryId = id as string;
//     if (status === 'idle' && !findCategoryById(categoryId)) {
//       dispatch(fetchCategoryById(categoryId));
//     }
//   }, [dispatch, id, status, categories]);

//   const findCategoryById = (categoryId: string): Category | undefined => {
//     return categories.find((category) => category.categoryId === Number(categoryId));
//   };

//   const handleUploadChange: UploadProps['onChange'] = ({ file }) => {
//     if (file.originFileObj) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target) {
//           setImagePreview(e.target.result as string);
//         }
//       };
//       reader.readAsDataURL(file.originFileObj);
//       setNewImage(file.originFileObj);
//     }
//   };

//   const handleInputChange = (handleChange) => (e) => {
//     console.log(`${e.target.name} changed to ${e.target.value}`);
//     handleChange(e);
//   };

//   const handleSubmit = (values, category) => {
//     console.log("line:1", values);
//     console.log("line:2", category);
    
//     // ###    
//     // const formData = new FormData();
//     // formData.append('category_name', values.category_name);
//     // formData.append('number_of_products', values.number_of_products.toString());
//     // if (newImage) {
//     //   formData.append('category_image', newImage);
//     // } else {
//     //   formData.append('category_image_url', values.category_image);
//     // }
//     // formData.append('key', category.key);
//     // console.log("line:1", formData);
//     // ###    

//     const data = {
//       ...values,
//       category_image: newImage,
//     };
//     console.log('line:1', data);
    

//     dispatch(updateCategory({ categoryId: Number(category.categoryId), updatedData: formData }));
//   };

//   const category = findCategoryById(id as string);

//   return (
//     <AdminLayout>
//       <Link href="/admin/AdminCategories">
//         <Button type="primary" danger>
//           Back
//         </Button>
//       </Link>
//       <Spin spinning={status === 'loading'}>
//         <Title level={2}>Edit Category</Title>
//         <Divider />
//         {category ? (
//           <Card title={category.categoryName} style={{ width: '100%' }}>
//             <Formik
//               initialValues={{
//                 category_name: category.categoryName,
//                 category_image: category.categoryImage,
//                 number_of_products: category.numberOfProducts,
//               }}
//               onSubmit={(values) => handleSubmit(values, category)}
//             >
//               {({ values, handleChange, handleSubmit }) => (
//                 <Form
//                   layout="vertical"
//                   onFinish={handleSubmit}
//                   initialValues={{
//                     category_name: category.categoryName,
//                     category_image: category.categoryImage,
//                     number_of_products: category.numberOfProducts,
//                   }}
//                 >
//                   <Form.Item label="Category Name" name="category_name">
//                     <Input value={values.category_name} onChange={handleInputChange(handleChange)} />
//                   </Form.Item>
//                   <Form.Item label="Category Image URL" name="category_image">
//                     <Input value={values.category_image} onChange={handleInputChange(handleChange)} />
//                   </Form.Item>
//                   <Form.Item label="Or Upload New Image" name="upload_image">
//                     <Upload
//                       accept="image/*"
//                       showUploadList={false}
//                       onChange={handleUploadChange}
//                     >
//                       <Button icon={<UploadOutlined />}>Upload New Image</Button>
//                     </Upload>
//                     {imagePreview && (
//                       <img
//                         src={imagePreview}
//                         alt="Category Preview"
//                         style={{ maxWidth: '100%', marginTop: '1rem', maxHeight: '200px', display: 'block' }}
//                       />
//                     )}
//                   </Form.Item>
//                   <Form.Item label="Number of Products" name="number_of_products">
//                     <Input value={values.number_of_products} onChange={handleInputChange(handleChange)} type="number" />
//                   </Form.Item>
//                   <Form.Item>
//                     <Button type="primary" htmlType="submit">
//                       Update
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               )}
//             </Formik>
//           </Card>
//         ) : (
//           <Paragraph>No category found with ID {id}</Paragraph>
//         )}
//       </Spin>
//     </AdminLayout>
//   );
// };

// export default EditCategoryPage;
