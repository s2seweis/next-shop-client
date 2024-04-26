import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile } from '@/src/redux/slices/profileSlice';
import styles from '@/src/styles/scss/components/account/UpdateProfile.module.scss';
import Loader from '@/src/components/Loader/Loader'; // Import the Loader component
import Select from 'react-select';
import { notification } from 'antd'; // Import notification component from Ant Design
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';


interface UserProfile {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  profilePictureUrl: string;
}

interface ProfileComponentProps {
  userId: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const UpdateProfileComponent: React.FC<ProfileComponentProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  // const userProfile = useSelector((state) => state.profile.userProfile);
  const userProfile = useAppSelector((state) => state.profile.userProfile) as UserProfile | null;


  const status = useAppSelector((state) => state.profile.status);
  const error = useAppSelector((state) => state.profile.error);

  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    role: '',
    profile_picture_url: '',
    // Add more fields as needed
  });
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  useEffect(() => {
    // Populate form data when userProfile changes
    if (userProfile) {
      setFormData({
        username: userProfile.username,
        full_name: userProfile.fullName,
        email: userProfile.email,
        role: userProfile.role,
        profile_picture_url: userProfile.profilePictureUrl || '',
        // Add more fields as needed
      });
    }
  }, [userProfile]);

  // Function to handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setFormData({
        ...formData,
        role: selectedOption.value,
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Dispatch action to update user profile
    await dispatch(updateUserProfile({ userId, formData }));
    // Display notification if update was successful
    notification.success({
      message: 'Update Successful',
      description: 'Your profile has been updated successfully.',
      duration: 3, // Notification duration in seconds
    });
  };

  if (status === 'loading' || !userProfile) {
    // Render Loader while loading or userProfile is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Define options for role select
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

  return (
    <div className={styles.profileContainer}>
      <h1>Update Profile</h1>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <div className={styles.imgTitle}>
            <strong>Profile Image:</strong>
          </div>
          <br />
          <div className={styles.roundImageContainer}>
            <img src={userProfile.profilePictureUrl} alt="Profile Image" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="full_name">Full Name:</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role:</label>
            <Select
              id="role"
              name="role"
              options={roleOptions}
              value={roleOptions.find(option => option.value === formData.role)}
              onChange={handleRoleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="profile_picture_url">Image URL:</label>
            <input
              type="text"
              id="profile_picture_url"
              name="profile_picture_url"
              value={formData.profile_picture_url}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more input fields for other profile attributes */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileComponent;
