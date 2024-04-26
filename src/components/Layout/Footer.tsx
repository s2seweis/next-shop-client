import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import font awesome icons
import styles from '../../styles/scss/layout/public/Footer.module.scss'; // Import CSS Modules styles

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com/" className={styles.socialIcon}>
            <FaFacebook />
          </a>
          <a href="https://twitter.com/" className={styles.socialIcon}>
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/" className={styles.socialIcon}>
            <FaInstagram />
          </a>
        </div>
        <p className={styles.copyRight}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
