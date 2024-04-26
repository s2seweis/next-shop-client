import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SiWolfram } from 'react-icons/si';
import styles from '../../styles/scss/layout/public/Navbar.module.scss';
import { useSidebarContext } from '../../utils/context/SidebarContext';
import Link from 'next/link';
import DropdownMenu from '../DropdownMenu/DropDownMenu';

const options = [
  { value: '', label: 'Home' },
  { value: 'contact/ContactForm', label: 'Contact' },
];
// # - Destructure it and take out direct the properties
const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const [, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 100) {
        if (currentScrollPos > prevScrollPos) {
          setIsMenuOpen(false);
          setIsNavbarVisible(false);
        } else {
          setIsNavbarVisible(true);
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleToggleClick = () => {
    toggleSidebar();
    setIsMenuOpen((prev) => !prev);
    setIsNavbarVisible(true);
  };

  return (
    <nav className={`${styles.navbar} ${isNavbarVisible ? '' : styles.hidden}`}>
      <div className={styles.navItem}>
        <div className={styles.sidebarToggle} onClick={handleToggleClick}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
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

      <header className={styles.menu1}>
        <nav className={styles.navbar}>
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

          <div className={styles.navLinks}>
            {options.map((option) => (
              <div key={option.value}>
                <Link
                  className={styles.linkContainer}
                  href={`/${option.value}`}
                >
                  <span className={styles.navLink}>{option.label}</span>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}></div>
          <DropdownMenu />
        </nav>
      </header>
      <div
        className="dropDownContainer"
        style={{
          display: 'flex',
          alignItems: 'center',
          right: '25%',
          position: 'absolute',
        }}
      >
        <DropdownMenu />
      </div>
    </nav>
  );
};

export default Navbar;
