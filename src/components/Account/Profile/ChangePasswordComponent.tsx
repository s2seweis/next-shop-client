// ChangePasswordComponent.jsx
import React, { useEffect, useState } from 'react';
// import { fetchPassword, updatePassword } from '../../../redux/slices/passwordSlice';
import { fetchPassword, updatePassword } from '@/src/redux/slices/passwordSlice';
import styles from '@/src/styles/scss/components/account/UpdateProfile.module.scss';
import Loader from '@/src/components/Loader/Loader'; // Import the Loader component
import { notification } from 'antd'; // Import notification component from Ant Design
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';

const ChangePasswordComponent = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const password = useAppSelector((state) => state.profile.userProfile);
  const status = useAppSelector((state) => state.profile.error);
  const error = useAppSelector((state) => state.profile.status);

  // State to manage form data
  const [formData, setFormData] = useState({
    userId: '',
    newPassword: '' // Adjusted field name
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPassword(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  useEffect(() => {
    if (password) {
      setFormData({
        userId: password.userId,
        newPassword: '' // Adjusted field name
      });
    }
  }, [password]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updatePassword({ userId, formData }));
    notification.success({
      message: 'Password Update Successful',
      description: 'Your Password has been updated successfully.',
      duration: 3,
    });
  };

  if (status === 'loading' || !password) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>Change Password</h1>
      <div className={styles.profileInfo}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="userId">UserId:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Password:</label>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
