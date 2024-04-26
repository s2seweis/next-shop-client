import React, { ComponentType } from 'react';
import Layout from '../../components/Layout/Layout';

const IsAuthPublic = <P extends object>(WrappedComponent: ComponentType<P>) => (props: P) => {
  return (
    <div>
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    </div>
  );
};

export default IsAuthPublic;
