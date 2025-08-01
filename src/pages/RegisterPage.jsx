// pages/RegisterPage.jsx
import React, { useState } from 'react';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader2, LogIn } from 'lucide-react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/users/register', { username, email, password });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 p-4">
      <div className="card w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered mt-4 w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered mt-4 w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered mt-4 w-full"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success mt-6 w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Register
                </>
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="link flex items-center gap-1 justify-center mx-auto mt-2"
            >
              <LogIn size={16} />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;