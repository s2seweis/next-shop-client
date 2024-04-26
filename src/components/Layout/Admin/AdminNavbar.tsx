import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/scss/layout/admin/AdminNavbar.module.scss';
import { SiWolfram } from 'react-icons/si';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSidebarContext } from '../../../utils/context/SidebarContext';

const AdminNavbar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const [, setIsMenuOpen] = useState<boolean>(false);
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [, setIsNavbarVisible] = useState<boolean>(true);
  // const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);

  const handleToggleClick = () => {
    toggleSidebar();
    setIsMenuOpen((prev) => !prev);
    setIsNavbarVisible(true);
  };

  return (
    <nav className={styles.adminNavbar}>
      <div className={styles.adminNavbarContainer}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px" }} className={styles.adminNavbarTitle}>
          <div className={styles.sidebarToggle} onClick={handleToggleClick}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </div>
          <h3>Admin Area</h3>
        </div>
        <div className={styles.logo}>
          <Link href="/">
            <div style={{ cursor: 'pointer' }}>
              <div
                style={{
                  width: '80px',
                  fontSize: '4rem',
                  display: 'flex',
                  color: 'white',
                }}
              >
                <SiWolfram />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
