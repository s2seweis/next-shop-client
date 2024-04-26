import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SidebarProvider } from '../../utils/context/SidebarContext';
import styles from '../../styles/scss/layout/public/Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />
      <main className={styles.content} style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </SidebarProvider>
  );
};

export default Layout;
