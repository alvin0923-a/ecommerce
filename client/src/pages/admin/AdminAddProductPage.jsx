import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Tote Bag', 'Shoulder Bag', 'Shopping Bag', 'Handbag', 'Drawstring Bag', 'Backpack'];

// Suggested spec keys for carry bags
const SPEC_SUGGESTIONS = ['Material', 'Dimensions', 'Capacity', 'Strap Length', 'Strap Type', 'Closure', 'Color', 'Weight', 'Max Load', 'Inner Pockets', 'Water Resistant'];

const AdminAddProductPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [specRows, setSpecRows] = useState([{ key: '', value: '' }]);

  const [form, setForm] = useState({
    name: '', price: '', description: '', category: 'General',
    rating: '', stock: '', images: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const addSpecRow = () => setSpecRows([...specRows, { key: '', value: '' }]);
  const updateSpec = (i, field, val) => {
    const updated = [...specRows];
    updated[i][field] = val;
    setSpecRows(updated);
  };
  const removeSpec = (i) => setSpecRows(specRows.filter((_, idx) => idx !== i));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) errs.price = 'Valid price required';
    if (!form.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('price', form.price);
      fd.append('description', form.description);
      fd.append('category', form.category);
      fd.append('rating', form.rating || 0);
      fd.append('stock', form.stock || 0);

      // Build specs object
      const specs = {};
      specRows.forEach(({ key, value }) => { if (key.trim()) specs[key.trim()] = value; });
      fd.append('specifications', JSON.stringify(specs));

      // Attach image files
      form.images.forEach((file) => fd.append('images', file));

      await API.post('/api/products', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Product added successfully! 🌿');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Admin Navbar */}
      <nav className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <Link to="/admin" className="flex items-center gap-2 font-bold text-lg">🌿 EcoStore Admin</Link>
        <div className="flex gap-3">
          <Link to="/admin/products" className="text-sm text-green-200 hover:text-white">← Products</Link>
          <button onClick={logout} className="text-xs bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded-full">Logout</button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-green-800">Product Information</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Bag Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                className="input-field" placeholder="e.g. Classic Jute Tote Bag" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Price (₹) *</label>
                <input name="price" type="number" min="0" value={form.price} onChange={handleChange}
                  className="input-field" placeholder="299" />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Rating (0–5)</label>
                <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating}
                  onChange={handleChange} className="input-field" placeholder="4.5" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Stock Quantity</label>
                <input name="stock" type="number" min="0" value={form.stock}
                  onChange={handleChange} className="input-field" placeholder="50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={4} className="input-field resize-none"
                placeholder="Describe the bag material, capacity, best use cases, and eco benefits..." />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Images */}
          <div className="card p-6">
            <h2 className="font-semibold text-green-800 mb-3">Product Images</h2>
            <label className="block w-full border-2 border-dashed border-green-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition-colors">
              <span className="text-3xl block mb-2">📷</span>
              <span className="text-sm text-gray-500">📷 Upload bag photos (front, back, inside) — max 10 images, 5MB each</span>
              <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
            </label>
            {previews.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-4">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt={`preview-${i}`}
                    className="w-20 h-20 rounded-lg object-cover border border-green-100" />
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
                    placeholder="e.g. Material, Dimensions, Capacity..."
                    list="spec-suggestions" className="input-field flex-1 text-sm" />
                  <datalist id="spec-suggestions">
                    {SPEC_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
                  </datalist>
                  <input value={row.value} onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    placeholder="e.g. Bamboo" className="input-field flex-1 text-sm" />
                  {specRows.length > 1 && (
                    <button type="button" onClick={() => removeSpec(i)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 justify-center">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</span>
                : '✅ Add Product'}
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

export default AdminAddProductPage;
