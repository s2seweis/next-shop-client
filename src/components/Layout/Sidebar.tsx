import React, { useState, useEffect, useRef } from 'react';
import { FaRegWindowClose, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useSidebarContext } from '../../utils/context/SidebarContext';
import Link from 'next/link';
import styles from '../../styles/scss/layout/public/Sidebar.module.scss';
import { menuItems } from './menuItems';
import SignInButton from '../Buttons/SignInButton/SignInButton';
import { useAppSelector} from '@/src/redux/hooks';

const Sidebar: React.FC = () => {
  const userProfile = useAppSelector((state) => state.profile.userProfile);
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const [, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem('activeMenu');
    const storedActiveSubMenu = localStorage.getItem('activeSubMenu');

    if (isSidebarOpen) {
      setActiveMenu(storedActiveMenu || getActiveMenu(window.location.pathname));
      setActiveSubMenu(storedActiveSubMenu || null);
    }
  }, [isSidebarOpen]);

  const handleMenuClick = (menu: string) => {
    setActiveSubMenu((prevSubMenu) => (prevSubMenu === menu ? null : menu));
    localStorage.setItem('activeSubMenu', menu);

    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
    localStorage.setItem('activeMenu', menu);
  };

  const isSubMenuActive = (menu: string) => activeSubMenu === menu;

  const isLinkActive = (href: string) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === href;
    }
    return false;
  };

  const getActiveMenu = (path: string) => {
    return path === '/' ? 'Home' : menuItems.find((item) => item.path === path)?.title || null;
  };

  const renderSubMenu = (submenus: { title: string; path: string }[]) => (
    <div className={styles.submenu}>
      {submenus.map((submenu) => (
        <Link key={submenu.path} href={submenu.path}>
          <span className={`${styles.submenuLink} ${isLinkActive(submenu.path) ? styles.active : ''}`}>
            {submenu.title}
          </span>
        </Link>
      ))}
    </div>
  );

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      toggleSidebar();
    }
  };

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}></div>
      <div className={styles.sidebarToggle} onClick={toggleSidebar}>
        <FaRegWindowClose />
      </div>
      <nav className={styles.nav}>
        <div className="logo" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80px', marginTop: '40px' }}>
            <SignInButton />
          </div>
        </div>

        <div className={styles.navLinks}>
          {menuItems.map((menuItem) => {
            // Only render the "Account" menu item if userProfile is available
            if (menuItem.title === 'Account' && !userProfile) {
              return null;
            }

             if (menuItem.title === 'Admin' && (!userProfile || userProfile.role !== 'admin')) {
              return null;
            }

            return (
              <span
                key={menuItem.path || menuItem.title}
                className={`${styles.navLink} ${isSubMenuActive(menuItem.title) ? styles.active : ''}`}
                onClick={() => handleMenuClick(menuItem.title)}
              >
                <div className="test1">{menuItem.title}</div>
                <div className="test2" style={{}}>
                  {menuItem.submenus && isSubMenuActive(menuItem.title) ? (
                    <FaAngleDown style={{ right: '34px', position: 'absolute', marginTop: '-20px' }} />
                  ) : (
                    <FaAngleRight style={{ right: '34px', position: 'absolute', marginTop: '-20px' }} />
                  )}
                </div>
                {menuItem.submenus && isSubMenuActive(menuItem.title) && renderSubMenu(menuItem.submenus)}
              </span>
            );
          })}
        </div>
        <div className="controllerContainer" style={{ marginTop: '60%' }}></div>
      </nav>
    </div>
  );
};

export default Sidebar;
