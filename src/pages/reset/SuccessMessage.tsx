import React from 'react';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';

const ResetMessage: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ background: 'aliceblue', padding: '30px', margin: '250px auto', width: 'fit-content', borderRadius: '25px' }}>
        <div style={{ margin: '15px 0px 0px 15px', display: 'flex' }}>
          <a href='javascript:history.back()'>Go Back</a>
        </div>
        <h2 style={{ padding: '10px' }}>You changed your password successfully!</h2>
        <h4>Go back to the Sign In Page</h4>
      </div>
    </div>
  );
};

export default IsAuthPublic(ResetMessage);
