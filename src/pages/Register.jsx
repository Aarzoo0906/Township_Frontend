import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle, Shield, Users, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-red-600', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    if (!role) newErrors.role = 'Please select a role';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Add new user to the array
      const newUser = {
        _id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role,
        createdAt: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      setSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  const roles = [
    {
      value: 'admin',
      label: 'Administrator',
      icon: Shield,
    },
    {
      value: 'user',
      label: 'Regular User',
      icon: Users,
    },
    {
      value: 'supervisor',
      label: 'Township Supervisor',
      icon: Building2,
    },
  ];

  if (success) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
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
      `}</style>
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-10">
            <div className="mb-6 flex justify-center">
              <div className="inline-block bg-linear-to-r from-red-600 to-blue-700 rounded-full p-4 shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Account Created!</h2>
            <p className="text-slate-700 mb-6">Welcome! Your {role} account has been successfully created.</p>
            <Link to="/login" className="inline-block bg-linear-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg" >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
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
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="logo-gradient w-16 h-16 mx-auto mb-3">
              <img src="/logo.jpg" alt="RSPL Logo" className="w-full h-full" />
            </div>
            <div className="overflow-hidden h-5 relative">
              <h2 className="marquee-text text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 bg-clip-text text-transparent tracking-widest">EVOLUTION IS CONSTANT</h2>
            </div>
          </div>
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Create Account</h1>
            <p className="text-slate-600 text-sm">Join us on this exciting journey</p>
          </div>

          {errors.submit && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Role Selection */}
            <div className="pb-6 border-b border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-6">Select Your Role</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roles.map(({ value, label, icon: Icon }) => (
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
                    </div>
                  </label>
                ))}
              </div>
              {errors.role && <p className="text-red-600 text-sm mt-2">{errors.role}</p>}
            </div>

            {/* Full Name field */}
            <div className="pt-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-900 mb-3">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-300'} rounded-lg py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300`}
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-2">{errors.fullName}</p>}
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-3">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-300'} rounded-lg py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Password field */}
            <div className="pt-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-3">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-300'} rounded-lg py-3 px-4 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-600">Password Strength</span>
                    <span className={`text-xs font-semibold ${strength === 1 ? 'text-red-400' : strength === 2 ? 'text-orange-400' : strength === 3 ? 'text-yellow-400' : 'text-green-400'}`}>{strengthLabels[strength]}</span>
                  </div>
              <div className="w-full bg-slate-300 rounded-full h-2 mt-4">
                    <div className={`h-2 rounded-full transition-all ${strengthColors[strength]}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 mb-3">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} rounded-lg py-3 px-4 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300`}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!setShowConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-2">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and conditions */}
            <div className="pt-2 pb-4 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-5 h-5 rounded mt-0.5 bg-white/10 border border-white/20 cursor-pointer accent-blue-500 transition-all"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <p className="text-red-600 text-sm mt-2">{errors.terms}</p>}
            </div>

            {/* Submit bulinear*/}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
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
              <span className="px-2 bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-600">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign in link */}
          <Link
            to="/login"
            className="block w-full text-center py-3 border border-slate-300 hover:border-blue-500 rounded-lg text-slate-900 font-bold transition-all hover:bg-slate-100"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;