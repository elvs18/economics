import { createContext, useContext, useState } from 'react';

const ADMIN_PASSCODE = 'samsueconomics';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('economics_admin_auth') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (passcode) => {
    if (passcode.trim().toLowerCase() === ADMIN_PASSCODE.toLowerCase()) {
      sessionStorage.setItem('economics_admin_auth', 'true');
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('economics_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
