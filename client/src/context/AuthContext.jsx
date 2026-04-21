import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminInfo')) || null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminInfo', JSON.stringify(data));
    setAdminInfo(data);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    setAdminInfo(null);
  };

  return (
    <AuthContext.Provider value={{ adminInfo, login, logout, isAdmin: !!adminInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
