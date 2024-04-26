// src/components/Loader/Loader.tsx
import React from 'react';
import styles from '../../styles/scss/components/loader/Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
