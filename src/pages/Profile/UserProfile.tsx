// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Profile {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null); // Change the initial state to null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get<Profile>(`${process.env.REACT_APP_API_BASE_PROD}/accounts/profile/`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading || profile === null) { // Add null check for profile
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>First Name: {profile.first_name}</p>
      <p>Last Name: {profile.last_name}</p>
    </div>
  );
};

export default UserProfile;
