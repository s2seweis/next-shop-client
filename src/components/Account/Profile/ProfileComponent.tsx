import React, { useEffect } from 'react';
import { fetchUserProfile } from '../../../redux/slices/profileSlice';
import styles from '@/src/styles/scss/components/account/Profile.module.scss';
import Loader from '@/src/components/Loader/Loader'; // Import the Loader component

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

const ProfileComponent: React.FC<ProfileComponentProps> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector((state) => state.profile.userProfile) as UserProfile | null;
  const status = useAppSelector((state) => state.profile.status);
  const error = useAppSelector((state) => state.profile.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  if (status === 'loading' || !userProfile) {
    // Render Loader while loading or userProfile is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>User Profile Landing</h1>
      <div className={styles.profileInfo}>
        <p>
          <strong>Id:</strong> {userProfile.userId}
        </p>
        <p>
          <strong>User Name:</strong> {userProfile.username}
        </p>
        <p>
          <strong>Full Name:</strong> {userProfile.fullName}
        </p>
        <p>
          <strong>E-Mail:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Role:</strong> {userProfile.role}
        </p>
        <p>
          <div className={styles.imgTitle}>
            <strong>Profile Image:</strong>
          </div>
          <br></br>
        </p>
        <div className={styles.roundImageContainer}>
          <img src={userProfile.profilePictureUrl} alt="Profile Image" />
        </div>
      </div>

      <div className={styles.buttonContainer}></div>
    </div>
  );
};

export default ProfileComponent;
