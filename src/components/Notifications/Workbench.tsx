// import React, { useEffect, useState } from 'react';
// import { List, Skeleton, Avatar, Modal, Input, Button, Badge } from 'antd';
// import Link from 'next/link';
// import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
// import {
//   fetchCategories,
//   deleteCategory,
// } from '../../../redux/slices/categorySlice';
// import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

// interface Category {
//   categoryId: number;
//   categoryName: string;
//   categoryImage: string;
//   numberOfProducts: number;
//   key: string;
// }

// const CategoryList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const categories = useAppSelector((state) => state.categories.categories);
//   const status = useAppSelector((state) => state.categories.status);
//   const [list, setList] = useState<Category[]>([]);
//   const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
//   const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

//   const [searchText, setSearchText] = useState<string>('');
//   const [initLoading] = useState<boolean>(true);
//   const [, setLoading] = useState<boolean>(false);
//   const [start, setStart] = useState<number>(0);
//   const [end, setEnd] = useState<number>(5);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchCategories());
//     } else if (status === 'succeeded') {
//       setList(categories);
//     }
//   }, [dispatch, status, categories]);

//   const handleDelete = (categoryId: number, _key: string) => {
//     setModalVisible(true);
//     setCategoryIdToDelete(categoryId);
//     setKeyToDelete(_key);
//     handleConfirmDelete();
//   };

//   const handleConfirmDelete = () => {
//     if (categoryIdToDelete !== null && keyToDelete !== null) {
//       setConfirmLoading(true);
//       dispatch(deleteCategory({ categoryId: categoryIdToDelete, key: keyToDelete })).then(() => {
//         setConfirmLoading(false);
//         setModalVisible(false);
//       });
//     }
//   };

//   const handleCancelDelete = () => {
//     setModalVisible(false);
//     setCategoryIdToDelete(null);
//   };

//   const filteredList = list.filter((category) => {
//     return category.categoryName && 
//            category.categoryName.toLowerCase().includes(searchText.toLowerCase());
//   });

//   const onLoadMore = () => {
//     setLoading(true);
//     setStart(0);
//     setEnd(end + 5);
//     setLoading(false);
//   };

//   const handleRefresh = () => {
//     dispatch(fetchCategories());
//   };

//   const loadMore = initLoading ? (
//     <div
//       style={{
//         textAlign: 'center',
//         marginTop: 12,
//         height: 32,
//         lineHeight: '32px',
//       }}
//     >
//       <Button onClick={onLoadMore}>Load More</Button>
//     </div>
//   ) : null;

//   return (
//     <div>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '20px',
//         }}
//       >
//         <Link href="/">
//           <Button
//             style={{
//               border: '1px solid',
//               padding: '4px 8px',
//               marginRight: '10px',
//             }}
//             type="text"
//             danger
//           >
//             <ArrowLeftOutlined />
//           </Button>
//         </Link>
//         <Input
//           placeholder="Category Name ..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           style={{ maxWidth: '300px', marginRight: '10px' }}
//         />
//         <Badge overflowCount={999}>
//           <span style={{ marginRight: '10px', fontSize: '16px' }}></span>
//           {filteredList.length > 0 && (
//             <sup
//               data-show="true"
//               className="ant-scroll-number ant-badge-count"
//               style={{ marginRight: '40px', marginTop: '27px' }}
//             >
//               <bdi>
//                 <span className="ant-scroll-number-only">
//                   <span className="ant-scroll-number-only-unit current">
//                     {filteredList.length}
//                   </span>
//                 </span>
//               </bdi>
//             </sup>
//           )}
//         </Badge>
//         <Link href="/admin/categories/AddCategory" passHref>
//           <Button type="primary">Add Category</Button>
//         </Link>
//         <Button
//           style={{ minWidth: '40px', marginRight: '10px', marginLeft: '10px' }}
//           type="default"
//           icon={<ReloadOutlined />}
//           onClick={handleRefresh}
//         />
//       </div>
//       <div
//         className="grid-container"
//       >
//         <div className="grid-header" key="image-picture">
//           Image
//         </div>
//         <div className="grid-header" key="category-name">
//           Category
//         </div>
//         <div className="grid-header" key="number-of-products">
//           Products
//         </div>
//         <div className="grid-header" key="more">
//           More
//         </div>
//       </div>
//       <List
//         className="demo-loadmore-list"
//         itemLayout="horizontal"
//         dataSource={filteredList.slice(start, end)}
//         loadMore={loadMore}
//         renderItem={(item, _index) => (
//           <List.Item
//             key={item.categoryId}
//             actions={[
//               <div className="more" key={`actions-${item.categoryId}`}>
//                 <Link key={`edit-${item.categoryId}`} href={`/admin/categories/edit/${item.categoryId}`} passHref>
//                   Edit
//                 </Link>
//                 <a key={`delete-${item.categoryId}`} onClick={() => handleDelete(item.categoryId, item.key)}>
//                   Delete
//                 </a>
//               </div>,
//             ]}
//           >
//             <Skeleton avatar title={false} loading={status === 'loading'} active>
//               <List.Item.Meta
//                 style={{ alignItems: 'center' }}
//                 avatar={<Avatar src={item.categoryImage} />}
//                 title={
//                   <h4 style={{ fontSize: '0.8rem', overflow: 'auto', marginRight: '10px' }}>
//                     {item.categoryName}
//                   </h4>
//                 }
//                 description={`Quantity: ${item.numberOfProducts}`}
//               />
//             </Skeleton>
//           </List.Item>
//         )}
//       />
//       <Modal
//         title="Confirm Delete"
//         visible={modalVisible}
//         onOk={handleConfirmDelete}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancelDelete}
//       >
//         <p>Are you sure you want to delete this category?</p>
//       </Modal>
//       <style jsx>{`
//         .grid-container {
//           display: grid;
//           grid-template-columns: repeat(6, 1fr);
//           gap: 10px;
//           margin: 0 15px;
//         }

//         @media (min-width: 768px) {
//           .grid-container {
//             grid-template-columns: repeat(12, 1fr);
//           }
//         }

//         @media (min-width: 1024px) {
//           .grid-container {
//             grid-template-columns: repeat(24, 1fr);
//           }
//         }

//         .grid-header {
//           font-weight: bold;
//         }

//         .more {
//           display: grid;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CategoryList;
