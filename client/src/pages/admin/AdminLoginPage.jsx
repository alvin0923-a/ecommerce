import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { BagIcon, LockIcon } from '../../components/Icons';
import toast from 'react-hot-toast';

// ── Mock credentials ──────────────────────────────────────────────────────
const MOCK_USERNAME = 'alvinanil';
const MOCK_PASSWORD = 'alvin2004';
const MOCK_ADMIN = { username: MOCK_USERNAME, token: 'mock-token-alvinanil' };

const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { toast.error('Please enter username and password'); return; }
    setLoading(true);

    // ── Mock login (no backend needed) ────────────────────────────────────
    if (form.username === MOCK_USERNAME && form.password === MOCK_PASSWORD) {
      login(MOCK_ADMIN);
      toast.success(`Welcome back, ${MOCK_USERNAME}!`);
      navigate('/admin');
      setLoading(false);
      return;
    }

    // ── Real API login (when backend is available) ─────────────────────────
    try {
      const { data } = await API.post('/api/admin/login', form);
      login(data);
      toast.success(`Welcome back, ${data.username}!`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <BagIcon className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-green-900">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">EcoBags Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input-field"
                placeholder="Enter username"
                autoComplete="username"
                id="admin-username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field"
                placeholder="••••••••"
                autoComplete="current-password"
                id="admin-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              id="admin-login-btn"
              className="btn-primary w-full py-3 justify-center flex items-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Logging in...</>
                : <><LockIcon className="w-4 h-4" />Login</>}
            </button>
          </form>

          {/* Hint box */}
          <div className="mt-6 p-3 bg-green-50 rounded-lg text-xs text-green-700 text-center border border-green-100">
            <p className="font-semibold mb-0.5">Mock Login</p>
            <p>Username: <strong>alvinanil</strong></p>
            <p>Password: <strong>alvin2004</strong></p>
          </div>
        </div>

        <p className="text-center mt-4">
          <a href="/" className="text-sm text-green-700 hover:underline">Back to Store</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
