import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@prisma/client';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;