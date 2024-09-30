'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/user/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Total Points: {user.totalPoints}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;