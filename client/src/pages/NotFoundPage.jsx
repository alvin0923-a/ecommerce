import { useNavigate } from 'react-router-dom';
import { BagIcon, ShoppingCartIcon, ArrowRightIcon } from '../components/Icons';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center page-enter px-4">
      <div className="text-center">
        <p className="text-[8rem] font-bold text-green-100 leading-none mb-0">404</p>
        <div className="-mt-8 relative z-10">
          <div className="flex justify-center mb-4">
            <BagIcon className="w-14 h-14 text-green-400" strokeWidth={1} />
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-3">Page Not Found</h1>
          <p className="text-gray-500 mb-8">Looks like this bag has gone on a journey. Let's get you back!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={() => navigate('/')} className="btn-primary px-8 py-3 flex items-center gap-2 justify-center">
              Home
            </button>
            <button onClick={() => navigate('/products')} className="btn-outline px-8 py-3 flex items-center gap-2 justify-center">
              <ShoppingCartIcon className="w-4 h-4" /> Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
