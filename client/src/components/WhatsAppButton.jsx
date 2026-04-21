const WhatsAppButton = () => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const message = encodeURIComponent('Hello! I am interested in your eco-friendly products. 🌿');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 animation-delay-300" />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {/* WhatsApp icon SVG */}
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
            <path d="M16.001 3.2C9.001 3.2 3.2 9.001 3.2 16c0 2.32.637 4.583 1.843 6.562L3.2 28.8l6.4-1.807A12.706 12.706 0 0016 28.8c7 0 12.8-5.8 12.8-12.8S23.001 3.2 16.001 3.2zm6.372 17.598c-.267.749-1.554 1.43-2.138 1.52-.547.084-1.24.12-2-.126-.46-.147-1.05-.344-1.806-.674-3.174-1.37-5.25-4.573-5.41-4.785-.16-.213-1.306-1.738-1.306-3.317s.826-2.357 1.12-2.68c.293-.32.638-.4.851-.4l.612.012c.2.008.467-.076.73.558.28.667.952 2.295 1.036 2.46.085.165.14.36.027.576-.11.213-.165.346-.33.533-.16.187-.338.417-.48.56-.16.16-.327.333-.14.653.187.32.83 1.37 1.786 2.22 1.227 1.09 2.26 1.43 2.58 1.59.32.16.506.136.694-.08.187-.213.8-.933 1.013-1.253.213-.32.427-.267.72-.16.293.107 1.867.88 2.187 1.04.32.16.534.24.613.373.08.133.08.773-.187 1.52z" />
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 w-max bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us! 💬
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
