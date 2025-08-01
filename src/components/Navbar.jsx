// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="navbar bg-base-100 shadow-md mb-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          📞 Contact Manager
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/" className="btn btn-ghost">Home</Link>
        <Link to="/settings" className="btn btn-ghost">Settings</Link>
        {user ? (
          <button onClick={logout} className="btn btn-outline btn-error btn-sm">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;