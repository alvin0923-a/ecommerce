import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// User Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';

// Layout wrapper for user-facing pages (Navbar + Footer + WhatsApp button)
const UserLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#14532d',
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />

          <Routes>
            {/* ── User Routes ──────────────────────────── */}
            <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
            <Route path="/products" element={<UserLayout><ProductsPage /></UserLayout>} />
            <Route path="/products/:id" element={<UserLayout><ProductDetailPage /></UserLayout>} />
            <Route path="/cart" element={<UserLayout><CartPage /></UserLayout>} />
            <Route path="/checkout" element={<UserLayout><CheckoutPage /></UserLayout>} />
            <Route path="/about" element={<UserLayout><AboutPage /></UserLayout>} />
            <Route path="/contact" element={<UserLayout><ContactPage /></UserLayout>} />

            {/* ── Admin Routes ─────────────────────────── */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
            <Route path="/admin/products/add" element={<ProtectedRoute><AdminAddProductPage /></ProtectedRoute>} />
            <Route path="/admin/products/edit/:id" element={<ProtectedRoute><AdminEditProductPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><AdminReportsPage /></ProtectedRoute>} />

            {/* ── 404 ─────────────────────────────────── */}
            <Route path="*" element={<UserLayout><NotFoundPage /></UserLayout>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
