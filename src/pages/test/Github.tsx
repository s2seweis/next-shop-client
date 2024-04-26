import { useEffect, useState } from 'react';
import styles from '../../styles/scss/pages/test/Github.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';

interface UserData {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
}

const GithubProfile = () => {
  const userId = '58604870'; // Your GitHub user ID
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/user/${userId}`);
        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.githubContainer}>
      {userData ? (
        <div className={styles.githubContainerAlign}>
          <h1>{userData.login}</h1>
          <img
            src={userData.avatar_url}
            alt={userData.login}
            style={{ width: '100px', borderRadius: '50%' }}
          />
          <p>Name: {userData.name}</p>
          <p>Location: {userData.location}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IsAuthPublic(GithubProfile);
