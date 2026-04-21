import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BagIcon, ShoppingCartIcon, XIcon } from './Icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-green-700 font-semibold' : 'text-gray-600 hover:text-green-700'}`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <BagIcon className="w-7 h-7 text-green-600 group-hover:text-green-700 transition-colors" />
            <span className="font-bold text-xl text-green-800 group-hover:text-green-600 transition-colors">
              EcoBags
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Cart + Hamburger */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-700 transition-colors" aria-label="Cart">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-700 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-green-50 mt-2 pt-4 space-y-2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
