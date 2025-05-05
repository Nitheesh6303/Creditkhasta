// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('credikhasta_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    const mockUser = {
      id: 'user1',
      name: 'Shop Owner',
      email,
      shopName: 'My Local Store'
    };
    localStorage.setItem('credikhasta_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signup = (userData) => {
    const newUser = {
      id: `user${Date.now()}`,
      ...userData
    };
    localStorage.setItem('credikhasta_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('credikhasta_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);