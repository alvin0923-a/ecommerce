import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, ShoppingCartIcon, ArrowRightIcon, BagIcon } from '../components/Icons';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const CartPage = () => {
  const { cartItems, cartTotal, updateQty, removeFromCart } = useCart();
  const shippingFee = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCartIcon className="w-16 h-16 text-green-200" strokeWidth={1} />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Browse our eco-friendly bag collection and add some items!</p>
          <Link to="/products" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
            <BagIcon className="w-4 h-4" /> Shop Bags
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 page-enter">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-900 mb-8 flex items-center gap-3">
          <ShoppingCartIcon className="w-7 h-7 text-green-600" />
          Your Cart <span className="text-lg font-normal text-gray-400">({cartItems.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const imgSrc = item.images?.[0] ? `${BASE_URL}${item.images[0]}` : null;
              return (
                <div key={item._id} className="card p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl bg-green-50 flex-shrink-0 overflow-hidden">
                    {imgSrc
                      ? <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center">
                          <BagIcon className="w-8 h-8 text-green-300" strokeWidth={1} />
                        </div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-green-700 font-bold mt-1">₹{item.price?.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center border border-green-200 rounded-full overflow-hidden">
                      <button onClick={() => updateQty(item._id, item.quantity - 1)}
                        className="w-8 h-8 text-green-700 hover:bg-green-50 flex items-center justify-center font-bold transition-colors">−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, item.quantity + 1)}
                        className="w-8 h-8 text-green-700 hover:bg-green-50 flex items-center justify-center font-bold transition-colors">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors ml-1">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="font-bold text-lg text-green-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm border-b border-green-100 pb-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-xs text-green-600">Add ₹{(999 - cartTotal).toLocaleString('en-IN')} more for free shipping</p>
              )}
            </div>
            <div className="flex justify-between font-bold text-base mb-5">
              <span>Total</span>
              <span className="text-green-700">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full py-3 justify-center flex items-center gap-2">
              Proceed to Checkout <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link to="/products" className="btn-outline w-full py-2.5 mt-3 flex items-center justify-center gap-2">
              <BagIcon className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
