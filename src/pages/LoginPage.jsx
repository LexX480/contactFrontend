// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/users/login', { email, password });
      const { accessToken } = res.data;
      setToken(accessToken);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 p-4">
      <div className="card w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit}>
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
              className="btn btn-primary mt-6 w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate('/register')}
              className="link flex items-center gap-1 justify-center mx-auto mt-2"
            >
              <UserPlus size={16} />
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;