import React, { createContext, useState, useEffect, useContext } from 'react';

// Mock users - in a real app, validate against backend
const MOCK_USERS = [
  { username: 'user', password: 'password' },
  { username: 'demo', password: 'demo123' }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isAuthenticated: !!savedUser
    };
  });

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem('user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [authState.user]);

  const login = (username, password) => {
    const user = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setAuthState({
        user,
        isAuthenticated: true
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
