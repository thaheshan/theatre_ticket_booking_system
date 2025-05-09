import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../Components/Layout/Loginform';
import { useAuth } from '../Context/Authcontext';
import { Film } from 'lucide-react';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-black dark:bg-white">
            <Film size={32} className="text-white dark:text-black" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to Movie Explorer
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Discover trending movies, search for your favorites, and keep track of what you want to watch.
        </p>
      </motion.div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;