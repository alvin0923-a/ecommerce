import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axios';
import { LockIcon, ShoppingCartIcon, BagIcon, CheckCircleIcon } from '../components/Icons';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mockSuccess, setMockSuccess] = useState(false);

  const shippingFee = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + shippingFee;

  // Redirect if cart is empty
  if (cartItems.length === 0 && !mockSuccess) {
    navigate('/cart');
    return null;
  }

  const validate = () => {
    const errs = {};
    if (!form.customerName.trim()) errs.customerName = 'Name is required';
    if (!form.customerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.customerEmail = 'Valid email required';
    if (!form.customerPhone.match(/^\d{10}$/)) errs.customerPhone = '10-digit phone required';
    if (!form.street.trim()) errs.street = 'Street address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.pincode.match(/^\d{6}$/)) errs.pincode = '6-digit pincode required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ── Mock payment (no backend needed) ─────────────────────────────────────
  const handleMockPayment = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setMockSuccess(true);
      setLoading(false);
      toast.success('Order placed successfully! (Mock Payment)');
      setTimeout(() => navigate('/'), 2500);
    }, 1500);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    try {
      // 1. Try real backend
      const orderPayload = {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        shippingAddress: { street: form.street, city: form.city, state: form.state, pincode: form.pincode },
        products: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] || '',
        })),
        totalAmount: grandTotal,
      };

      const { data } = await API.post('/api/orders', orderPayload);
      const { razorpayOrderId, razorpayKeyId } = data;

      // 2. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Razorpay script failed');

      // 3. Open Razorpay
      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(grandTotal * 100),
        currency: 'INR',
        name: 'EcoBags',
        description: 'Eco-Friendly Carry Bags',
        order_id: razorpayOrderId,
        prefill: { name: form.customerName, email: form.customerEmail, contact: form.customerPhone },
        theme: { color: '#16a34a' },
        handler: async (response) => {
          try {
            await API.post('/api/orders/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            clearCart();
            toast.success('Payment successful! Thank you for shopping eco!');
            navigate('/');
          } catch {
            toast.error('Payment verification failed. Contact support.');
          }
        },
        modal: { ondismiss: () => { setLoading(false); toast.error('Payment cancelled'); } },
      };
      new window.Razorpay(options).open();
    } catch {
      // ── Backend unavailable: use mock payment flow ───────────────────────
      handleMockPayment();
    }
  };

  // ── Mock success screen ───────────────────────────────────────────────────
  if (mockSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircleIcon className="w-9 h-9 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-1">Thank you, <strong>{form.customerName || 'Customer'}</strong>!</p>
          <p className="text-sm text-gray-400">Redirecting you to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 page-enter">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-900 mb-8 flex items-center gap-2">
          <ShoppingCartIcon className="w-7 h-7 text-green-600" /> Checkout
        </h1>

        <form onSubmit={handlePayment}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Shipping Form ─────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-lg text-green-900 mb-4">Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                    <input name="customerName" value={form.customerName} onChange={handleChange}
                      className="input-field" placeholder="Your full name" />
                    {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email *</label>
                    <input name="customerEmail" value={form.customerEmail} onChange={handleChange}
                      className="input-field" placeholder="you@example.com" type="email" />
                    {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Phone *</label>
                    <input name="customerPhone" value={form.customerPhone} onChange={handleChange}
                      className="input-field" placeholder="10-digit mobile number" maxLength={10} />
                    {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Street Address *</label>
                    <input name="street" value={form.street} onChange={handleChange}
                      className="input-field" placeholder="House no, Street, Locality" />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">City *</label>
                    <input name="city" value={form.city} onChange={handleChange}
                      className="input-field" placeholder="Mumbai" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">State *</label>
                    <input name="state" value={form.state} onChange={handleChange}
                      className="input-field" placeholder="Maharashtra" />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Pincode *</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange}
                      className="input-field" placeholder="400001" maxLength={6} />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Secure payment note */}
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <LockIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 text-sm">Secure Payment via Razorpay</p>
                  <p className="text-green-600 text-xs mt-1">
                    Your payment is 100% secure. We accept UPI, Cards, Net Banking &amp; Wallets.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Order Summary ─────────────────────────── */}
            <div className="card p-6 h-fit sticky top-24">
              <h2 className="font-bold text-lg text-green-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => {
                  const imgSrc = item.images?.[0] ? `${BASE_URL}${item.images[0]}` : null;
                  return (
                    <div key={item._id} className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex-shrink-0 overflow-hidden">
                        {imgSrc
                          ? <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center">
                              <BagIcon className="w-5 h-5 text-green-300" strokeWidth={1.5} />
                            </div>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-green-700">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-green-100 pt-3 space-y-2 text-sm mb-4">
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
                <div className="flex justify-between font-bold text-base pt-2 border-t border-green-100">
                  <span>Total</span>
                  <span className="text-green-700">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 justify-center disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                ) : (
                  <><LockIcon className="w-4 h-4" />Pay Now</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
