import React from 'react';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UserManagement />
        <ContentManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;