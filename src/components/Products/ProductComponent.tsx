import React, { useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import styles from '../../styles/scss/components/products/Products.module.scss';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import { notification } from 'antd'; // Import notification component from Ant Design

const ProductComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  console.log("line:1", products);
  
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]); // Dispatch only when status changes

  const handleDeleteProduct = async (productid: string) => {
    console.log("line:998", productid);
    
    try {
      await dispatch(deleteProduct(productid));
      notification.success({
        message: 'Delete Product Successful',
        description: 'Your Product has been deleted successfully.',
        duration: 3,
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.productContainer}>
      <h1>All Products</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.productid} className={styles.productCard}>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.productname}</p>
              <p className={styles.productCategory}>
                Category: {product.category}
              </p>
              <p className={styles.productPrice}>Price: ${product.price}</p>
            </div>
            <div className={styles.productActions}>
              <button
                onClick={() => handleDeleteProduct(product.productid)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
