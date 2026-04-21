import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { MOCK_PRODUCTS } from '../data/mockData';
import { SearchIcon, ToteBagIcon, HandbagIcon, BackpackIcon, DrawstringBagIcon, BagIcon } from '../components/Icons';

const CATEGORIES = ['All', 'Tote Bag', 'Shoulder Bag', 'Shopping Bag', 'Handbag', 'Drawstring Bag', 'Backpack'];

const CATEGORY_ICONS = {
  'All': BagIcon,
  'Tote Bag': ToteBagIcon,
  'Shoulder Bag': BagIcon,
  'Shopping Bag': BagIcon,
  'Handbag': HandbagIcon,
  'Drawstring Bag': DrawstringBagIcon,
  'Backpack': BackpackIcon,
};

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'All') params.set('category', category);
    if (sort) params.set('sort', sort);

    API.get(`/api/products?${params.toString()}`)
      .then((res) => setProducts(res.data))
      .catch(() => {
        // Fallback: filter mock data client-side
        let filtered = MOCK_PRODUCTS;
        if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        if (category !== 'All') filtered = filtered.filter(p => p.category === category);
        if (sort === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
        if (sort === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
        if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [search, category, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.searchInput.value);
  };

  return (
    <div className="min-h-screen pt-20 page-enter">
      {/* Header */}
      <div className="gradient-hero py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">Our Bag Collection</h1>
        <p className="text-green-700">
          {!loading ? `${products.length} eco-friendly bag${products.length !== 1 ? 's' : ''} — all handcrafted` : 'Handcrafted eco-friendly carry bags'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              name="searchInput"
              defaultValue={search}
              placeholder="Search bags (e.g. jute, canvas, tote)..."
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary px-4 py-2 flex items-center gap-1">
              <SearchIcon className="w-4 h-4" />
            </button>
          </form>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-full md:w-48">
            <option value="">Sort: Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}>
                <Icon className="w-4 h-4" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-12 h-12 text-green-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bags found</h3>
            <p className="text-gray-500 mb-6">Try a different style or clear the filter.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setSort(''); }} className="btn-outline">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
