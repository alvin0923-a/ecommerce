import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { MOCK_PRODUCTS } from '../data/mockData';
import {
  LeafIcon, RecycleIcon, TruckIcon, ShieldIcon, SparkleIcon,
  CheckCircleIcon, ToteBagIcon, HandbagIcon, BackpackIcon,
  DrawstringBagIcon, BagIcon, ArrowRightIcon
} from '../components/Icons';

const REVIEWS = [
  { name: 'Priya S.', text: 'The jute tote is stunning — incredibly sturdy and I get compliments every time I carry it.', rating: 5, avatar: 'P' },
  { name: 'Rahul M.', text: 'Bought 3 shopping bags and replaced all my plastic bags at once. Great quality!', rating: 5, avatar: 'R' },
  { name: 'Anita K.', text: 'Love the canvas backpack bag. Perfect for college and so eco-conscious!', rating: 5, avatar: 'A' },
];

const StarFilled = () => (
  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ReviewCard = ({ review }) => (
  <div className="card p-6">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
        {review.avatar}
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
        <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_, i) => <StarFilled key={i} />)}</div>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
  </div>
);

const BAG_TYPES = [
  { icon: ToteBagIcon, label: 'Tote Bag' },
  { icon: BagIcon, label: 'Shoulder Bag' },
  { icon: BackpackIcon, label: 'Backpack' },
  { icon: BagIcon, label: 'Shopping Bag' },
  { icon: HandbagIcon, label: 'Handbag' },
  { icon: DrawstringBagIcon, label: 'Drawstring Bag' },
];

const FEATURES = [
  { Icon: LeafIcon, title: 'Natural Materials', desc: 'Jute, cotton & bamboo' },
  { Icon: RecycleIcon, title: 'Plastic-Free', desc: 'Zero plastic packaging' },
  { Icon: ShieldIcon, title: 'Heavy Duty', desc: 'Carries up to 15 kg' },
  { Icon: TruckIcon, title: 'Pan India', desc: 'Fast delivery' },
];

const WHY_US = [
  { Icon: LeafIcon, title: 'Natural Materials', desc: 'Jute, organic cotton, bamboo fibre — nothing synthetic.' },
  { Icon: ShieldIcon, title: 'Heavy Duty', desc: 'All bags load-tested to carry 5–15 kg without wear or tear.' },
  { Icon: RecycleIcon, title: 'Replace 500+ Plastics', desc: 'Each bag replaces hundreds of single-use plastic bags over its lifetime.' },
  { Icon: SparkleIcon, title: 'Stylish Designs', desc: "Eco doesn't mean boring. Our bags turn heads while saving the planet." },
  { Icon: CheckCircleIcon, title: 'Secure Payment', desc: 'Powered by Razorpay — UPI, cards, net banking, wallets accepted.' },
  { Icon: TruckIcon, title: 'Pan India Delivery', desc: 'Shipped in recycled, plastic-free packaging. Fast & reliable.' },
];

const HomePage = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS.slice(0, 8));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get('/api/products')
      .then((res) => setProducts(res.data.slice(0, 8)))
      .catch(() => setProducts(MOCK_PRODUCTS.slice(0, 8)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="gradient-hero min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <BagIcon className="w-4 h-4" />
                Handcrafted Eco-Friendly Carry Bags
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-900 leading-tight mb-6">
                Carry More,<br />
                <span className="text-green-500">Waste Less</span>
              </h1>
              <p className="text-lg text-green-800/70 mb-8 max-w-lg">
                Discover our curated collection of eco-friendly carry bags — totes, shoulder bags,
                backpacks, and more. Each bag is crafted to replace hundreds of single-use plastics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
                  <BagIcon className="w-5 h-5" /> Shop Bags
                </Link>
                <Link to="/about" className="btn-outline text-base px-8 py-3">Our Story</Link>
              </div>
              <div className="flex flex-wrap gap-8 mt-10">
                {[
                  { value: '9', label: 'Bag Models' },
                  { value: '500+', label: 'Plastics Replaced / Sale' },
                  { value: '100%', label: 'Eco Materials' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-green-700">{s.value}</p>
                    <p className="text-sm text-green-600">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-200 to-green-400 opacity-30 animate-pulse" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-300 to-green-500 opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BagIcon className="w-32 h-32 text-green-600 opacity-70" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Bar ─────────────────────────────────── */}
      <section className="bg-green-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <Icon className="w-7 h-7 text-green-200" />
                <p className="font-semibold">{title}</p>
                <p className="text-green-200 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bag Collection ───────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="section-title">Our Bag Collection</h2>
        <p className="section-subtitle">Handpicked styles for every occasion</p>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/products" className="btn-primary px-10 py-3 text-base inline-flex items-center gap-2">
                View All Bags <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ── Bag Types ─────────────────────────────────────── */}
      <section className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Styles for Every Need</h2>
          <p className="section-subtitle">From daily grocery runs to office carry — we have you covered</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BAG_TYPES.map(({ icon: Icon, label }) => (
              <Link key={label} to={`/products?category=${encodeURIComponent(label)}`}
                className="card p-4 text-center hover:border-green-300 border border-transparent transition-all group">
                <div className="flex justify-center mb-2">
                  <Icon className="w-8 h-8 text-green-600 group-hover:text-green-700 transition-colors" />
                </div>
                <p className="text-xs font-semibold text-gray-700">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Our Bags ─────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="section-title">Why Our Bags?</h2>
        <p className="section-subtitle">Every bag is a pledge against single-use plastic</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US.map(({ Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────── */}
      <section className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Happy Customers</h2>
          <p className="section-subtitle">Real people, real eco impact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => <ReviewCard key={r.name} review={r} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="gradient-green text-white py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Make the Switch Today</h2>
        <p className="text-green-200 mb-8 max-w-xl mx-auto">
          Every bag you buy is a step away from plastic. Join thousands of eco-conscious shoppers.
        </p>
        <Link to="/products"
          className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-10 py-3 rounded-full hover:bg-green-50 transition-colors">
          Shop All Bags <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
