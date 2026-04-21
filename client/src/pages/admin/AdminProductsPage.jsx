import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { BagIcon, LogOutIcon, PackageIcon, PlusIcon, PencilIcon, TrashIcon, SearchIcon } from '../../components/Icons';
import { MOCK_PRODUCTS } from '../../data/mockData';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const AdminProductsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    API.get(`/api/products${search ? `?search=${search}` : ''}`)
      .then((res) => setProducts(res.data))
      .catch(() => {
        // Filter mock data client-side
        const filtered = search
          ? MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          : MOCK_PRODUCTS;
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [search]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await API.delete(`/api/products/${id}`);
      toast.success(`"${name}" deleted`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      // For mock data — just remove from local state
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success(`"${name}" removed (mock)`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Admin Navbar */}
      <nav className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <Link to="/admin" className="flex items-center gap-2 font-bold text-lg">
          <BagIcon className="w-5 h-5 text-green-300" /> EcoBags Admin
        </Link>
        <div className="flex gap-3 items-center">
          <Link to="/admin/products/add" className="btn-primary text-sm py-1.5 px-4 flex items-center gap-1.5">
            <PlusIcon className="w-4 h-4" /> Add Bag
          </Link>
          <button onClick={logout} className="flex items-center gap-1 text-xs bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded-full transition-colors">
            <LogOutIcon className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-green-900 flex items-center gap-2">
            <PackageIcon className="w-6 h-6 text-green-600" />
            Bags ({products.length})
          </h1>
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bags..."
              className="input-field pl-9 w-full sm:w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card p-4 flex gap-4 items-center">
                <div className="skeleton w-14 h-14 rounded-lg" />
                <div className="flex-1 space-y-2"><div className="skeleton h-4 w-48" /><div className="skeleton h-3 w-24" /></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-3">
              <PackageIcon className="w-12 h-12 text-green-200" />
            </div>
            <p className="text-gray-500 mb-4">No bags found</p>
            <Link to="/admin/products/add" className="btn-primary inline-flex items-center gap-1.5">
              <PlusIcon className="w-4 h-4" /> Add First Bag
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-green-800 font-semibold">Bag</th>
                    <th className="px-4 py-3 text-green-800 font-semibold">Price</th>
                    <th className="px-4 py-3 text-green-800 font-semibold hidden sm:table-cell">Category</th>
                    <th className="px-4 py-3 text-green-800 font-semibold hidden md:table-cell">Rating</th>
                    <th className="px-4 py-3 text-green-800 font-semibold hidden md:table-cell">Stock</th>
                    <th className="px-4 py-3 text-green-800 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {products.map((p) => {
                    const imgSrc = p.images?.[0] ? `${BASE_URL}${p.images[0]}` : null;
                    return (
                      <tr key={p._id} className="hover:bg-green-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex-shrink-0 overflow-hidden">
                              {imgSrc
                                ? <img src={imgSrc} alt={p.name} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center">
                                    <BagIcon className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                                  </div>
                              }
                            </div>
                            <span className="font-medium text-gray-800 max-w-[160px] truncate">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-green-700">₹{p.price?.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="badge badge-green">{p.category}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            {p.rating?.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">{p.stock}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                              className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors font-medium"
                            >
                              <PencilIcon className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p._id, p.name)}
                              disabled={deleting === p._id}
                              className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors font-medium disabled:opacity-50"
                            >
                              <TrashIcon className="w-3 h-3" />
                              {deleting === p._id ? '...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
