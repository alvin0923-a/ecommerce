import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { BagIcon, LogOutIcon, BarChartIcon, CurrencyIcon, OrdersIcon } from '../../components/Icons';
import { MOCK_MONTHLY_REPORT, MOCK_SUMMARY } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';

const AdminReportsPage = () => {
  const { logout } = useAuth();
  const [tab, setTab] = useState('monthly');
  const [data, setData] = useState(MOCK_MONTHLY_REPORT);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReport = (type, params = '') => {
    setLoading(true);
    API.get(`/api/reports/${type}${params}`)
      .then((res) => {
        const d = res.data.data || [];
        setData(d);
        setSummary({
          totalRevenue: d.reduce((s, i) => s + i.totalRevenue, 0),
          totalOrders: d.reduce((s, i) => s + i.orderCount, 0),
        });
      })
      .catch(() => {
        setData(MOCK_MONTHLY_REPORT);
        setSummary(MOCK_SUMMARY);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (tab !== 'custom') fetchReport(tab);
  }, [tab]);

  const handleCustomFilter = () => {
    if (startDate && endDate) fetchReport('custom', `?start=${startDate}&end=${endDate}`);
  };

  const chartData = data.map((d) => ({
    name: d.month || d.day ? `Day ${d.day}` : d.year ? String(d.year) : d.date || '',
    Revenue: d.totalRevenue,
    Orders: d.orderCount,
  }));

  const TABS = [
    { key: 'daily', label: 'Daily' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
    { key: 'custom', label: 'Custom Range' },
  ];

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
        <h1 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
          <BarChartIcon className="w-6 h-6 text-green-600" /> Sales Reports
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card p-5 border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-1">
              <CurrencyIcon className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
            <p className="text-2xl font-bold text-green-700">₹{summary.totalRevenue?.toLocaleString('en-IN')}</p>
          </div>
          <div className="card p-5 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-1">
              <OrdersIcon className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
            <p className="text-2xl font-bold text-blue-700">{summary.totalOrders}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.key ? 'bg-green-600 text-white shadow-md' : 'bg-white text-green-700 hover:bg-green-100'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Custom Date Picker */}
        {tab === 'custom' && (
          <div className="card p-5 mb-6 flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" />
            </div>
            <button onClick={handleCustomFilter} className="btn-primary px-6 py-2.5 whitespace-nowrap">Apply Filter</button>
          </div>
        )}

        {/* Charts */}
        <div className="card p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <BarChartIcon className="w-12 h-12 text-green-100 mb-3" />
              <p>No sales data for this period</p>
            </div>
          ) : (
            <>
              <h2 className="font-semibold text-green-800 mb-4">Revenue (₹)</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
                  <Tooltip formatter={(v) => [`₹${v?.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: '8px', border: '1px solid #bbf7d0' }} />
                  <Bar dataKey="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <h2 className="font-semibold text-green-800 mt-8 mb-4">Orders Count</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #bbf7d0' }} />
                  <Legend />
                  <Line type="monotone" dataKey="Orders" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>

              {/* Table */}
              <h2 className="font-semibold text-green-800 mt-8 mb-3">Detailed Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-green-800">Period</th>
                      <th className="px-4 py-2 text-right text-green-800">Revenue</th>
                      <th className="px-4 py-2 text-right text-green-800">Orders</th>
                      <th className="px-4 py-2 text-right text-green-800">Avg. Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-50">
                    {chartData.map((row) => (
                      <tr key={row.name} className="hover:bg-green-50/50">
                        <td className="px-4 py-2 font-medium text-gray-700">{row.name}</td>
                        <td className="px-4 py-2 text-right text-green-700 font-medium">₹{row.Revenue?.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right text-gray-600">{row.Orders}</td>
                        <td className="px-4 py-2 text-right text-gray-500">₹{row.Orders > 0 ? Math.round(row.Revenue / row.Orders) : 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
