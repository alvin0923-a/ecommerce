/**
 * Centralized SVG icon library — all icons are stroke-based, 24x24 viewBox.
 * Usage: <Icons.Bag className="w-6 h-6 text-green-700" />
 */

const icon = (paths, extra = '') => {
  const Icon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...(extra ? { dangerouslySetInnerHTML: undefined } : {})}
    >
      {paths}
    </svg>
  );
  Icon.displayName = 'Icon';
  return Icon;
};

// ── Bag / Shopping ─────────────────────────────────────────────────────────
export const BagIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export const ShoppingCartIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

export const HandbagIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <rect x="2" y="8" width="20" height="13" rx="2"/>
    <path d="M8 8V6a4 4 0 0 1 8 0v2"/>
  </svg>
);

export const BackpackIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M4 20V10a8 8 0 1 1 16 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
    <path d="M9 20v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"/>
    <path d="M8 7a4 4 0 0 1 8 0"/>
    <line x1="12" y1="4" x2="12" y2="2"/>
  </svg>
);

export const ToteBagIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/>
    <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
  </svg>
);

export const DrawstringBagIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M7 5c0 0 2-2 5-2s5 2 5 2v2H7V5z"/>
    <line x1="10" y1="5" x2="10" y2="2"/><line x1="14" y1="5" x2="14" y2="2"/>
    <path d="M5 7h14l-2 13H7L5 7z"/>
  </svg>
);

// ── Nature / Eco ──────────────────────────────────────────────────────────
export const LeafIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 8-8 8"/>
  </svg>
);

export const RecycleIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <polyline points="1 4 1 10 7 10"/>
    <polyline points="23 20 23 14 17 14"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);

export const GlobeIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

// ── UI / Actions ──────────────────────────────────────────────────────────
export const SearchIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const TrashIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

export const PencilIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export const PlusIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const XIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const ArrowRightIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export const ChevronRightIcon = ({ className = 'w-4 h-4', strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export const CheckIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const CheckCircleIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export const StarIcon = ({ className = 'w-5 h-5', fill = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill={fill} className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// ── Location / Contact ────────────────────────────────────────────────────
export const MapPinIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export const PhoneIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export const MailIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export const ClockIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export const SendIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

export const MessageCircleIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

// ── Admin / Dashboard ─────────────────────────────────────────────────────
export const PackageIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

export const BarChartIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

export const OrdersIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M9 11l3 3L22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

export const CurrencyIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

export const LogOutIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export const LockIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const ShieldIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export const TruckIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

export const UserIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export const UsersIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export const HeartIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export const SparkleIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export const ImageIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

export const GridIcon = ({ className = 'w-6 h-6', strokeWidth = 1.8 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

// WhatsApp icon (filled)
export const WhatsAppIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="white">
    <path d="M16.001 3.2C9.001 3.2 3.2 9.001 3.2 16c0 2.32.637 4.583 1.843 6.562L3.2 28.8l6.4-1.807A12.706 12.706 0 0016 28.8c7 0 12.8-5.8 12.8-12.8S23.001 3.2 16.001 3.2zm6.372 17.598c-.267.749-1.554 1.43-2.138 1.52-.547.084-1.24.12-2-.126-.46-.147-1.05-.344-1.806-.674-3.174-1.37-5.25-4.573-5.41-4.785-.16-.213-1.306-1.738-1.306-3.317s.826-2.357 1.12-2.68c.293-.32.638-.4.851-.4l.612.012c.2.008.467-.076.73.558.28.667.952 2.295 1.036 2.46.085.165.14.36.027.576-.11.213-.165.346-.33.533-.16.187-.338.417-.48.56-.16.16-.327.333-.14.653.187.32.83 1.37 1.786 2.22 1.227 1.09 2.26 1.43 2.58 1.59.32.16.506.136.694-.08.187-.213.8-.933 1.013-1.253.213-.32.427-.267.72-.16.293.107 1.867.88 2.187 1.04.32.16.534.24.613.373.08.133.08.773-.187 1.52z"/>
  </svg>
);
