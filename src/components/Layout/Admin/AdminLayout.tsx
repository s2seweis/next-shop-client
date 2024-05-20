import React, { ReactNode } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import Sidebar from '../Public/Sidebar';
import { SidebarProvider } from '../../../utils/context/SidebarContext';
import styles from '../../../styles/scss/layout/admin/AdminLayout.module.scss';
import Footer from '../Admin/FooterAdmin';
// import { Playground } from './AdminSidebar/Playground';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminNavbar />
      <div style={{ 
        display: 'flex', 
        // height: '90vh',
        height:"auto"
        }}>
        <AdminSidebar />
        {/* <Playground/> */}
        <Sidebar/>
        
        <main
          className={styles.content}
          style={{
            margin: '15px 5px',
            width: 'calc(100% - 69px)', // Adjusting width to accommodate scrollbar
            overflowX: 'auto', // Make the content scrollable horizontally
            overflowY: 'hidden', // Disable vertical scrolling
            whiteSpace: 'nowrap' // Prevent content from wrapping to a new line
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </SidebarProvider>
  );
};

export default AdminLayout;
