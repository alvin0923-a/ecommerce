import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { PageLoader } from '../components/SkeletonLoader';
import { StarIcon, ShoppingCartIcon, BagIcon, LeafIcon, RecycleIcon, CheckCircleIcon } from '../components/Icons';
import { MOCK_PRODUCTS } from '../data/mockData';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const StarRating = ({ rating, size = 'md' }) => {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`${sz} ${i < Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
};

const ECO_BADGES = [
  { Icon: LeafIcon, label: 'Eco-Friendly' },
  { Icon: RecycleIcon, label: 'Recyclable' },
  { Icon: CheckCircleIcon, label: 'Quality Tested' },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    API.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {
        // Fallback to mock data
        const found = MOCK_PRODUCTS.find((p) => p._id === id);
        if (found) setProduct(found);
        else setError('Product not found');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) return <PageLoader />;

  if (error) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <BagIcon className="w-16 h-16 text-green-200" strokeWidth={1} />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">{error}</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    </div>
  );

  const images = product.images?.length > 0
    ? product.images.map((img) => `${BASE_URL}${img}`)
    : [];

  const specs = product.specifications instanceof Object
    ? Object.entries(product.specifications).filter(([k]) => !k.startsWith('$'))
    : [];

  return (
    <div className="min-h-screen pt-20 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex gap-2">
          <button onClick={() => navigate('/')} className="hover:text-green-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-green-600">Bags</button>
          <span>/</span>
          <span className="text-green-700 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ── Images ──────────────────────────────────────── */}
          <div>
            <div className="bg-green-50 rounded-2xl overflow-hidden h-80 sm:h-96 mb-4 flex items-center justify-center">
              {images.length > 0 ? (
                <img src={images[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <BagIcon className="w-24 h-24 text-green-200" strokeWidth={1} />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImg === i ? 'border-green-500 scale-105' : 'border-transparent'
                    }`}>
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ─────────────────────────────────────────── */}
          <div>
            {product.category && <span className="badge badge-green mb-3">{product.category}</span>}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating || 0} size="lg" />
              <span className="text-gray-500 text-sm">({product.rating?.toFixed(1) || '0.0'} / 5.0)</span>
            </div>

            <p className="text-3xl font-bold text-green-700 mb-4">
              ₹{product.price?.toLocaleString('en-IN')}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-green-200 rounded-full overflow-hidden">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors font-bold">
                  −
                </button>
                <span className="w-10 text-center font-semibold text-gray-800">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors font-bold">
                  +
                </button>
              </div>
              {product.stock > 0 && (
                <span className="text-xs text-gray-400">{product.stock} in stock</span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button onClick={handleAddToCart}
                className="btn-outline flex-1 py-3 flex items-center justify-center gap-2">
                <ShoppingCartIcon className="w-4 h-4" /> Add to Cart
              </button>
              <button onClick={handleBuyNow}
                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                <BagIcon className="w-4 h-4" /> Buy Now
              </button>
            </div>

            {/* Eco Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {ECO_BADGES.map(({ Icon, label }) => (
                <span key={label}
                  className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Specifications ───────────────────────────────── */}
        {specs.length > 0 && (
          <div className="mt-10 card p-6">
            <h2 className="text-xl font-bold text-green-900 mb-4">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specs.map(([key, val]) => (
                <div key={key} className="flex gap-2 py-2 border-b border-green-50 last:border-0">
                  <span className="text-sm text-gray-500 font-medium w-36 flex-shrink-0 capitalize">{key}</span>
                  <span className="text-sm text-gray-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
