import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/admin/Product.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import ProductList from '@/src/components/Admin/Products/ProductList';

const Products = () => {
  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width:"100%"
          }}
          className={styles.adminContainerAlign}
        >
          <div style={{width:"100%", textAlign:"center", margin:"0px 15px", height:"100vh", marginTop:"110px"}}>
            {/* <h3>Products Overview:</h3> */}
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Products);
