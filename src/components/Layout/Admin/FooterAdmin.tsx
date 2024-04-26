import React from 'react';
import { FaFacebook } from 'react-icons/fa'; // Import font awesome icons
import styles from '../../../styles/scss/layout/admin/FooterAdmin.module.scss'; // Import CSS Modules styles

const FooterAdmin: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com/" className={styles.socialIcon}>
            <FaFacebook />
          </a>
          <h5>Admin Dashboard ...</h5>
        </div>
        <p className={styles.copyRight}>
          &copy; {new Date().getFullYear()} IT - Solutions 
        </p>
      </div>
    </footer>
  );
};

export default FooterAdmin;
