// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/accounts/profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

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
