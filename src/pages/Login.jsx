import React, { useState } from 'react';
import { Eye, EyeOff, Mail, ArrowRight, Shield, Users, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!role) newErrors.role = 'Please select a role';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Find user by email
      const foundUser = registeredUsers.find(u => u.email === email && u.role === role);
      
      if (!foundUser) {
        setErrors({ submit: 'Invalid email or role. Please register first.' });
        setIsLoading(false);
        return;
      }
      
      // Create user session with registered fullName
      const userData = {
        _id: foundUser._id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role,
      };

      localStorage.setItem('token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('user', JSON.stringify(userData));

      navigate(`/${role}`);
      setIsLoading(false);
    }, 1500);
  };

  const roles = [
    {
      value: 'admin',
      label: 'Administrator',
      description: 'Full system access',
      icon: Shield,
      color: 'from-red-600 to-blue-700',
    },
    {
      value: 'user',
      label: 'Regular User',
      description: 'Basic access',
      icon: Users,
      color: 'from-red-600 to-blue-700',
    },
    {
      value: 'supervisor',
      label: 'Township Supervisor',
      description: 'Manage townships',
      icon: Building2,
      color: 'from-blue-600 to-indigo-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .marquee-text {
              display: inline-block;
              animation: marquee 8s linear infinite;
              white-space: nowrap;
            }
            .logo-gradient {
              position: relative;
              border-radius: 50%;
              background: linear-gradient(135deg, #dc2626 0%, #1e40af 100%);
              padding: 3px;
            }
            .logo-gradient img {
              display: block;
              border-radius: 50%;
              background: white;
            }
          `}</style>
          <div className="text-center mb-8">
            <div className="logo-gradient w-16 h-16 mx-auto mb-3">
              <img src="/logo.jpg" alt="RSPL Logo" className="w-full h-full" />
            </div>
            <div className="overflow-hidden h-5 relative">
              <h2 className="marquee-text text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 bg-clip-text text-transparent tracking-widest">EVOLUTION IS CONSTANT</h2>
            </div>
          </div>
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome Back</h1>
            <p className="text-slate-600 text-sm">Select your role and sign in</p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Role Selection */}
            <div className="pb-6 border-b border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-6">Select Your Role</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roles.map(({ value, label, description, icon: Icon }) => (
                  <label
                    key={value}
                    className={`relative cursor-pointer p-5 rounded-lg border-2 transition-all duration-300 ${
                      role === value
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-slate-300 bg-slate-100/50 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Icon className={`w-7 h-7 ${role === value ? 'text-blue-600' : 'text-slate-500'}`} />
                      <p className="text-slate-900 font-semibold text-sm">{label}</p>
                      <p className="text-slate-600 text-xs">{description}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.role && <p className="text-red-600 text-sm mt-2">{errors.role}</p>}
            </div>

            {/* Email field */}
            <div className="pt-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-4">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="you@example.com"
                className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-300'} rounded-lg py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-3">{errors.email}</p>}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-4">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-300'} rounded-lg py-3 px-4 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-3">{errors.password}</p>}
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded bg-slate-100 border border-slate-300 cursor-pointer accent-blue-600 transition-all" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">Forgot Password?</a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">
                New to our platform?
              </span>
            </div>
          </div>

          {/* Sign up link */}
          <Link
            to="/register"
            className="block w-full text-center py-3 border border-slate-300 hover:border-blue-500 rounded-lg text-slate-900 font-bold transition-all hover:bg-slate-100"
          >
            Create an Account
          </Link>
        </div>

        <p className="text-center text-slate-700 text-sm mt-8">
          By signing in, you agree to our <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default Login;