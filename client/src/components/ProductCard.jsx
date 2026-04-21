import { Link } from 'react-router-dom';
import { ShoppingCartIcon, TrashIcon, StarIcon } from './Icons';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const ProductCard = ({ product }) => {
  const imgSrc = product.images?.[0] ? `${BASE_URL}${product.images[0]}` : null;

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCartIcon className="w-16 h-16 text-green-200" strokeWidth={1} />
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        <div className="absolute top-2 right-2 badge badge-green text-xs">{product.category}</div>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-green-700 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{product.description}</p>

        <div className="flex items-center gap-1 mb-3">
          <StarIcon className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating?.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-green-700">
            ₹{product.price?.toLocaleString('en-IN')}
          </p>
          <Link
            to={`/products/${product._id}`}
            className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"
          >
            <ShoppingCartIcon className="w-3.5 h-3.5" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
