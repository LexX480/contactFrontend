// pages/SettingPage.jsx
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const SettingPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-base-200 p-6 rounded-lg shadow">
        <h2 className="text-xl">User Info</h2>
        <p><strong>Name:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button className="btn btn-error btn-sm mt-4" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingPage;