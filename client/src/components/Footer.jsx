import { Link } from 'react-router-dom';
import { BagIcon, MailIcon, PhoneIcon, MapPinIcon, HeartIcon } from './Icons';

const year = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-green-900 text-green-100 pt-14 pb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BagIcon className="w-6 h-6 text-green-300" />
            <span className="font-bold text-xl text-white">EcoBags</span>
          </div>
          <p className="text-sm text-green-300 leading-relaxed">
            Carry your world without carrying plastic.
          </p>
        </div>

        {/* Bags */}
        <div>
          <h4 className="font-semibold text-white mb-3">Our Bags</h4>
          <ul className="space-y-2 text-sm text-green-300">
            <li><Link to="/products" className="hover:text-white transition-colors">All Bags</Link></li>
            <li><Link to="/products?category=Tote%20Bag" className="hover:text-white transition-colors">Tote Bags</Link></li>
            <li><Link to="/products?category=Shoulder%20Bag" className="hover:text-white transition-colors">Shoulder Bags</Link></li>
            <li><Link to="/products?category=Shopping%20Bag" className="hover:text-white transition-colors">Shopping Bags</Link></li>
            <li><Link to="/products?category=Backpack" className="hover:text-white transition-colors">Backpacks</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-green-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-green-300">
            <li className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
              123 Green Park, Mumbai – 400001
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 flex-shrink-0 text-green-400" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 flex-shrink-0 text-green-400" />
              hello@ecobags.in
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-800 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-green-400">
        <p>&copy; {year} EcoBags. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <HeartIcon className="w-4 h-4 text-red-400 mx-0.5" strokeWidth={2} /> for a plastic-free world
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
