import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { useAuth } from '../../Context/Authcontext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.3)',
          zIndex: 0
        }}
      ></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-xl bg-white/10 border border-white/20 p-8 transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
                Welcome Back
              </h2>
              <p className="text-gray-300">
                Sign in to continue to MovieExplorer
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-lg text-sm backdrop-blur-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400 group-focus-within:text-white transition-colors" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400 group-focus-within:text-white transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                  Sign In
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-400 mt-6 space-y-1">
                <p>Demo credentials:</p>
                <p className="font-mono bg-white/5 py-1 px-2 rounded inline-block">
                  Username: demo | Password: demo123
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;