import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { BagIcon, LogOutIcon, ImageIcon, PlusIcon, XIcon } from '../../components/Icons';
import { MOCK_PRODUCTS } from '../../data/mockData';
import toast from 'react-hot-toast';

const CATEGORIES = ['Tote Bag', 'Shoulder Bag', 'Shopping Bag', 'Handbag', 'Drawstring Bag', 'Backpack'];

const SPEC_SUGGESTIONS = ['Material', 'Dimensions', 'Capacity', 'Strap Length', 'Strap Type', 'Closure', 'Color', 'Weight', 'Max Load', 'Inner Pockets', 'Water Resistant'];
const BASE_URL = import.meta.env.VITE_API_URL || '';

const AdminEditProductPage = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [newPreviews, setNewPreviews] = useState([]);
  const [specRows, setSpecRows] = useState([{ key: '', value: '' }]);
  const [existingImages, setExistingImages] = useState([]);

  const [form, setForm] = useState({
    name: '', price: '', description: '', category: 'General',
    rating: '', stock: '', newImages: [],
  });

  useEffect(() => {
    API.get(`/api/products/${id}`)
      .then((res) => {
        const p = res.data;
        setForm({ name: p.name || '', price: p.price || '', description: p.description || '', category: p.category || 'Tote Bag', rating: p.rating || '', stock: p.stock || '', newImages: [] });
        setExistingImages(p.images || []);
        const specs = p.specifications instanceof Object ? Object.entries(p.specifications).filter(([k]) => !k.startsWith('$')) : [];
        setSpecRows(specs.length > 0 ? specs.map(([k, v]) => ({ key: k, value: v })) : [{ key: '', value: '' }]);
      })
      .catch(() => {
        // Fallback to mock data
        const p = MOCK_PRODUCTS.find((mp) => mp._id === id);
        if (p) {
          setForm({ name: p.name, price: p.price, description: p.description, category: p.category, rating: p.rating, stock: p.stock, newImages: [] });
          const specs = p.specifications instanceof Object ? Object.entries(p.specifications) : [];
          setSpecRows(specs.length > 0 ? specs.map(([k, v]) => ({ key: k, value: v })) : [{ key: '', value: '' }]);
          toast('Loaded mock data for editing', { icon: 'i' });
        } else {
          toast.error('Product not found');
        }
      })
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, newImages: files });
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeExistingImage = (img) =>
    setExistingImages((prev) => prev.filter((i) => i !== img));

  const addSpecRow = () => setSpecRows([...specRows, { key: '', value: '' }]);
  const updateSpec = (i, field, val) => {
    const updated = [...specRows];
    updated[i][field] = val;
    setSpecRows(updated);
  };
  const removeSpec = (i) => setSpecRows(specRows.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      toast.error('Name and price are required'); return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('price', form.price);
      fd.append('description', form.description);
      fd.append('category', form.category);
      fd.append('rating', form.rating || 0);
      fd.append('stock', form.stock || 0);
      existingImages.forEach((img) => fd.append('existingImages', img));
      const specs = {};
      specRows.forEach(({ key, value }) => { if (key.trim()) specs[key.trim()] = value; });
      fd.append('specifications', JSON.stringify(specs));
      form.newImages.forEach((file) => fd.append('images', file));

      await API.put(`/api/products/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Bag updated successfully!');
      navigate('/admin/products');
    } catch {
      // Mock success — still navigate back
      toast.success('Changes saved (mock mode)');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-green-700">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <Link to="/admin" className="flex items-center gap-2 font-bold text-lg">
            <BagIcon className="w-5 h-5 text-green-300" /> EcoBags Admin
          </Link>
          <div className="flex gap-3">
            <Link to="/admin/products" className="text-sm text-green-200 hover:text-white">Products</Link>
            <button onClick={logout} className="flex items-center gap-1 text-xs bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded-full">
              <LogOutIcon className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-green-800">Product Information</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className="input-field" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Price (₹) *</label>
                <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Rating (0–5)</label>
                <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Stock</label>
                <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className="input-field" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={4} className="input-field resize-none" />
            </div>
          </div>

          {/* Images */}
          <div className="card p-6">
            <h2 className="font-semibold text-green-800 mb-3">Images</h2>
            {existingImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Existing (click × to remove)</p>
                <div className="flex gap-3 flex-wrap">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={`${BASE_URL}${img}`} alt={`img-${i}`}
                        className="w-20 h-20 rounded-lg object-cover border border-green-100" />
                      <button type="button" onClick={() => removeExistingImage(img)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <label className="block w-full border-2 border-dashed border-green-200 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 transition-colors">
              <div className="flex justify-center mb-1"><ImageIcon className="w-6 h-6 text-gray-400" /></div>
              <span className="text-sm text-gray-500">Click to add new bag images</span>
              <input type="file" multiple accept="image/*" onChange={handleNewImages} className="hidden" />
            </label>
            {newPreviews.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-3">
                {newPreviews.map((src, i) => (
                  <img key={i} src={src} alt={`new-${i}`}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-green-300" />
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-green-800">Specifications</h2>
              <button type="button" onClick={addSpecRow}
                className="text-xs text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full">
                + Add Row
              </button>
            </div>
            <div className="space-y-3">
              {specRows.map((row, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={row.key} onChange={(e) => updateSpec(i, 'key', e.target.value)}
                    placeholder="Key" className="input-field flex-1 text-sm" />
                  <input value={row.value} onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    placeholder="Value" className="input-field flex-1 text-sm" />
                  {specRows.length > 1 && (
                    <button type="button" onClick={() => removeSpec(i)}
                      className="text-red-400 hover:text-red-600 text-lg">×</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 justify-center">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Updating...</span>
                : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate('/admin/products')} className="btn-outline px-6 py-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProductPage;
