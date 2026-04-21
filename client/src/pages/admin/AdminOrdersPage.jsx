import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { BagIcon, LogOutIcon, OrdersIcon } from '../../components/Icons';
import { MOCK_ORDERS } from '../../data/mockData';

const STATUS_COLORS = { paid: 'badge-green', pending: 'badge-yellow', failed: 'badge-red' };

const AdminOrdersPage = () => {
  const { logout } = useAuth();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    API.get('/api/orders')
      .then((res) => setOrders(res.data))
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.paymentStatus === filter);

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <Link to="/admin" className="flex items-center gap-2 font-bold text-lg">
          <BagIcon className="w-5 h-5 text-green-300" /> EcoBags Admin
        </Link>
        <div className="flex gap-3">
          <Link to="/admin" className="text-sm text-green-200 hover:text-white">Dashboard</Link>
          <button onClick={logout} className="flex items-center gap-1 text-xs bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded-full">
            <LogOutIcon className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-green-900 flex items-center gap-2">
            <OrdersIcon className="w-6 h-6 text-green-600" /> Orders ({filtered.length})
          </h1>
          <div className="flex gap-2 flex-wrap">
            {['all', 'paid', 'pending', 'failed'].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
                  filter === s ? 'bg-green-600 text-white' : 'bg-white text-green-700 hover:bg-green-100'
                }`}>{s}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card p-4 space-y-2"><div className="skeleton h-4 w-48" /><div className="skeleton h-3 w-32" /></div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <OrdersIcon className="w-12 h-12 text-green-200 mx-auto mb-3" />
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-green-800 font-semibold">Order ID</th>
                    <th className="px-4 py-3 text-green-800 font-semibold">Customer</th>
                    <th className="px-4 py-3 text-green-800 font-semibold hidden sm:table-cell">Items</th>
                    <th className="px-4 py-3 text-green-800 font-semibold">Amount</th>
                    <th className="px-4 py-3 text-green-800 font-semibold">Status</th>
                    <th className="px-4 py-3 text-green-800 font-semibold hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {filtered.map((order) => (
                    <tr key={order._id} className="hover:bg-green-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-gray-500">#{order._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{order.customerEmail}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
                        {order.products?.length} item{order.products?.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-4 py-3 font-bold text-green-700">₹{order.totalAmount?.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${STATUS_COLORS[order.paymentStatus] || 'badge-yellow'} capitalize`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                        {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
