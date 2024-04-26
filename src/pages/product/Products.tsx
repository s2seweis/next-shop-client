import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/product/Product.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import ProductComponent from '@/src/components/Products/ProductComponent';

const Products = () => {
  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className={styles.adminContainerAlign}
        >
          <div>
            <h3>Products Overview:</h3>
            <ProductComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IsAuthPublic(Products);
