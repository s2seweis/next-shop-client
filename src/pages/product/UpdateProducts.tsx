import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/product/Product.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import UpdateProductComponent from '@/src/components/Products/UpdateProductComponent';

const UpdateProducts = () => {
  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <main
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className={styles.adminContainerAlign}
        >
          <div>
            <UpdateProductComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IsAuthPublic(UpdateProducts);
