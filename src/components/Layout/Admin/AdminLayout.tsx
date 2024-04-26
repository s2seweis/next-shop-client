import React, { ReactNode } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import Sidebar from '../Sidebar';
import { SidebarProvider } from '../../../utils/context/SidebarContext';
import styles from '../../../styles/scss/layout/admin/AdminLayout.module.scss';
import Footer from '../Admin/FooterAdmin';

interface AdminLayoutProps {
  children: ReactNode;
  // login: boolean; // Assuming login is a boolean
  // isAuth: boolean; // Assuming isAuth is a boolean
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminNavbar />
      <div style={{ display: 'flex', height: '90vh' }}>
        <AdminSidebar />
        <Sidebar/>
        <main
          className={styles.content}
          style={{ minHeight: '100vh', margin: 'auto' }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </SidebarProvider>
  );
};

export default AdminLayout;
