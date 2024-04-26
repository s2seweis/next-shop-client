import React, { useState } from 'react';
import { Icon } from '@/src/components/Layout/Admin/Icon';
import styles from '@/src/styles/scss/layout/admin/Side.module.scss';
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from 'react-pro-sidebar';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GITHUB } from '@/src/components/Layout/Admin/routes';

const AdminSidebar = () => {
  const { collapseSidebar } = useProSidebar();
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();
  const toggleFavorite = () => setFavorite((prev) => !prev);

  return (
    <nav className={styles.contentAdminWrapperSidebar}>
      <div style={{ display: 'flex', height: '90vh' }}>
        <Sidebar
          width={'167px'}
          collapsedWidth={'60px'}
          defaultCollapsed={true}
        >
          <Menu>
            <MenuItem
              active={router.pathname === '/admin/dashboard'}
              icon={<Icon name="dashboard" />}
              className={styles.menuItem}
              style={{ marginTop: '50px' }}
            >
              <Link href={GITHUB}>Github</Link>
            </MenuItem>
            {/* ### */}
            <MenuItem
              active={router.pathname === '/admin/ingredients'}
              icon={<Icon name="messages" />}
              className={styles.menuItem}
            >
              <Link href="/admin/ingredients">Ingredients</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/settings'}
              icon={<Icon name="settings" />}
              className={styles.menuItem}
            >
              <Link href="/admin/settings">Settings</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/posts'}
              icon={<Icon name="posts" />}
              className={styles.menuItem}
            >
              <Link href="/admin/posts">Posts</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/users'}
              icon={<Icon name="users" />}
              className={styles.menuItem}
            >
              <Link href="/admin/users">Users</Link>
            </MenuItem>
            <SubMenu
              label="Stages"
              icon={<Icon name="products" />}
              active={router.pathname === '/admin/products'}
              className={styles.menuItem}
            >
              <MenuItem active={router.pathname === '/admin/products'}>
                <Link href="/admin/products">Products</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem
              active={router.pathname === '/admin/orders'}
              icon={<Icon name="orders" />}
              className={styles.menuItem}
            >
              <Link href="/admin/orders">Orders</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/docs'}
              icon={<Icon name="book-2" />}
              className={styles.menuItem}
            >
              <Link href="/admin/docs">Docs</Link>
            </MenuItem>
            <MenuItem className={styles.menuItemButton}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  style={{ padding: '2px' }}
                  onClick={() => {
                    toggleFavorite();
                    collapseSidebar();
                  }}
                >
                  {favorite ? (
                    <FiArrowLeftCircle
                      style={{
                        color: '#F76631',
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  ) : (
                    <FiArrowRightCircle
                      style={{
                        color: '#F76631',
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  )}
                </button>
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </nav>
  );
};

export default AdminSidebar;
