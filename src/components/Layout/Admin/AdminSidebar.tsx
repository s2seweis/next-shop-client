// import React, { useState } from 'react';
// import { Icon } from '@/src/components/Layout/Admin/Icon';
// import styles from '@/src/styles/scss/layout/admin/Side.module.scss';
// import {
//   Sidebar,
//   Menu,
//   MenuItem,
//   useProSidebar,
//   SubMenu,
// } from 'react-pro-sidebar';
// import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
// // import { CaretLeftOutlined,CaretRightOutlined, PieChartOutlined } from '@ant-design/icons';
// import Link from 'next/link';
// // import { DASHBOARD, GITHUB } from '@/src/components/Layout/Admin/routes';

// const AdminSidebar = () => {
//   const { collapseSidebar } = useProSidebar();
//   const [favorite, setFavorite] = useState(false);
//   const toggleFavorite = () => setFavorite((prev) => !prev);

//   return (
//     <nav className={styles.contentAdminWrapperSidebar}>
//       <div style={{ display: 'flex', height: '90vh' }}>
//         <Sidebar
//           width={'167px'}
//           collapsedWidth={'60px'}
//           defaultCollapsed={true}
//           backgroundColor='white'
//         >
//           <Menu style={{marginTop:"50px"}}>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminDashboard"><Icon name="bar-chart"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminDashboard">Dashboard</Link>
//             </MenuItem>
//             {/* ### */}

//             <SubMenu
//               label="Products"
//               icon={<Icon name="products" />}
//               className={styles.menuItem}
//             >
//               <MenuItem>
//                 <Link href="/admin/AdminProducts">Products</Link>
//               </MenuItem>
//               <MenuItem>
//                 <Link href="/admin/AdminCategories">Categories</Link>
//               </MenuItem>
              
//             </SubMenu>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminUsers"><Icon name="users"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminUsers">Users</Link>
//             </MenuItem>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminDashboard"><Icon name="orders"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminUsers">Orders</Link>
//             </MenuItem>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminDashboard"><Icon name="service"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminDashboard">Offers</Link>
//             </MenuItem>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminDashboard"><Icon name="dashboard"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminDashboard">Delivery Areas</Link>
//             </MenuItem>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminDashboard"><Icon name="settings"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminDashboard">Settings</Link>
//             </MenuItem>
//             <MenuItem icon={<Link style={{display:"flex", justifyContent:"center", alignItems:"center"}} href="/admin/AdminDashboard"><Icon name="messages"  /></Link>} className={styles.menuItem}>
//               <Link href="/admin/AdminDashboard">News</Link>
//             </MenuItem>
//             <MenuItem icon={<Icon name="book-2" />} className={styles.menuItem}>
//               <Link href="/admin/docs">Docs</Link>
//             </MenuItem>
//             <MenuItem className={styles.menuItemButton}>
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <button
//                   style={{ padding: '2px' }}
//                   onClick={() => {
//                     toggleFavorite();
//                     collapseSidebar();
//                   }}
//                 >
//                   {favorite ? (
//                     <FiArrowLeftCircle
//                       style={{
//                         color: '#F76631',
//                         width: '24px',
//                         height: '24px',
//                       }}
//                     />
//                   ) : (
//                     <FiArrowRightCircle
//                       style={{
//                         color: '#F76631',
//                         width: '24px',
//                         height: '24px',
//                       }}
//                     />
//                   )}
//                 </button>
//               </div>
//             </MenuItem>
//           </Menu>
//         </Sidebar>
//       </div>
//     </nav>
//   );
// };

// export default AdminSidebar;
