// import { useDocumentTitle, useScrollTop } from 'hooks';
import { LoadingOutlined } from '@ant-design/icons';
import React, { lazy, Suspense, HTMLAttributes } from 'react';
import UserTab from '@/src/components/Account/UserTab';
import Layout from '@/src/components/Layout/Layout';

// Define a custom interface for the tab props
interface TabProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  label: string;
}

const UserAccountTab = lazy(() => import('@/src/components/Account/UserAccountTab'));
const UpdateUserAccountTab = lazy(() => import('@/src/components/Account/UpdateUserAccountTab'));
const ChangePasswordComponent = lazy(() => import('@/src/components/Account/ChangePasswordAccountTab'));
const PreferenceTab = lazy(() => import('@/src/components/Account/PreferenceTab'));
// const UserOrdersTab = lazy(() => import('../components/UserOrdersTab'));

const Loader: React.FC = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount: React.FC = () => {
  return (
    <div className='tab-test'>
      <Layout>
        <UserTab>
          <Tab index={0} label="User">
            <Suspense fallback={<Loader />}>
              <UserAccountTab />
            </Suspense>
          </Tab>
          <Tab index={1} label="Update">
            <Suspense fallback={<Loader />}>
              <UpdateUserAccountTab />
            </Suspense>
          </Tab>
          <Tab index={2} label="Password">
            <Suspense fallback={<Loader />}>
              <ChangePasswordComponent />
            </Suspense>
          </Tab>
          <Tab index={3} label="Preferences">
            <Suspense fallback={<Loader />}>
              <PreferenceTab />
            </Suspense>
          </Tab>
          <Tab index={4} label="Orders">
            <Suspense fallback={<Loader />}>
              {/* <UserOrdersTab /> */}
            </Suspense>
          </Tab>
        </UserTab>
      </Layout>
    </div>
  );
};

// Define a new component for tab with custom props
const Tab: React.FC<TabProps> = ({ index, label, children, ...rest }) => {
  return (
    <div {...rest}>
      {children}
    </div>
  );
};

export default UserAccount;
