import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { CurrencyIcon, PackageIcon, BarChartIcon, OrdersIcon, BagIcon, LogOutIcon, PlusIcon } from '../../components/Icons';
import { MOCK_SUMMARY } from '../../data/mockData';

const StatCard = ({ Icon, label, value, sub, color }) => (
  <div className={`card p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
        <Icon className="w-7 h-7 text-gray-400" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { adminInfo, logout } = useAuth();
  const [stats, setStats] = useState(MOCK_SUMMARY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get('/api/reports/summary')
      .then((res) => setStats(res.data))
      .catch(() => setStats(MOCK_SUMMARY))
      .finally(() => setLoading(false));
  }, []);

  const quickLinks = [
    { to: '/admin/products/add', Icon: PlusIcon, label: 'Add Product', desc: 'Add a new bag to store' },
    { to: '/admin/products', Icon: PackageIcon, label: 'Products', desc: 'Manage bag catalog' },
    { to: '/admin/orders', Icon: OrdersIcon, label: 'Orders', desc: 'View & manage orders' },
    { to: '/admin/reports', Icon: BarChartIcon, label: 'Reports', desc: 'Sales analytics & reports' },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <BagIcon className="w-6 h-6 text-green-300" />
          <span className="font-bold text-lg">EcoBags Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-200 text-sm">{adminInfo?.username}</span>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded-full transition-colors">
            <LogOutIcon className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {adminInfo?.username}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-6"><div className="skeleton h-4 w-24 mb-3" /><div className="skeleton h-8 w-16" /></div>
            ))
          ) : (
            <>
              <StatCard Icon={CurrencyIcon} label="Total Revenue" value={`₹${stats.totalRevenue?.toLocaleString('en-IN')}`} sub="All time paid orders" color="border-green-500" />
              <StatCard Icon={OrdersIcon} label="Total Orders" value={stats.totalOrders} sub="Paid orders" color="border-blue-500" />
              <StatCard Icon={PackageIcon} label="Total Bags" value={stats.totalProducts} sub="Active listings" color="border-amber-500" />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-bold text-green-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {quickLinks.map(({ to, Icon, label, desc }) => (
            <Link key={to} to={to} className="card p-5 text-center hover:border-green-300 border border-transparent transition-all group">
              <div className="flex justify-center mb-3">
                <div className="w-11 h-11 rounded-xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-sm">{label}</p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Nav links */}
        <div className="card p-4 flex flex-wrap gap-3">
          {[
            { to: '/admin', label: 'Dashboard' },
            { to: '/admin/products', label: 'Products' },
            { to: '/admin/products/add', label: 'Add Product' },
            { to: '/admin/orders', label: 'Orders' },
            { to: '/admin/reports', label: 'Reports' },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="text-sm text-green-700 bg-green-50 hover:bg-green-100 px-4 py-1.5 rounded-full transition-colors">
              {link.label}
            </Link>
          ))}
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 px-4 py-1.5 rounded-full transition-colors">
            View Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
