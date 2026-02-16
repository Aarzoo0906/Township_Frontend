import React, { useState } from 'react';
import { LogOut, Home, Settings, User, Shield, Users, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case 'admin':
        return <Shield className="w-8 h-8 text-slate-900" />;
      case 'supervisor':
        return <Building2 className="w-8 h-8 text-slate-900" />;
      default:
        return <Users className="w-8 h-8 text-slate-900" />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'admin':
        return 'from-red-600 to-blue-700';
      case 'supervisor':
        return 'from-blue-600 to-indigo-700';
      default:
        return 'from-red-600 to-blue-700';
    }
  };

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
          <div className="text-center mb-12">
            <div className={`inline-block bg-linear-to-r ${getRoleColor()} rounded-full p-4 mb-7 shadow-lg`}>
              <LogOut className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">You're About to Log Out</h1>
            <p className="text-slate-700 text-lg">Are you sure you want to leave?</p>
          </div>

          {/* User info card */}
          {user.fullName && (
            <div className="mb-14 p-8 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 bg-gradient-to-br ${getRoleColor()} rounded-full flex items-center justify-center shadow-lg`}>
                  {getRoleIcon()}
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-lg">{user.fullName}</p>
                  <p className="text-slate-700 text-sm mt-1">{user.email}</p>
                  <p className="text-blue-600 text-xs font-semibold mt-2 uppercase">{user.role} User</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 pb-6 border-b border-slate-200">
            <Link
              to={`/${user.role}`}
              className="group p-5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <Home className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <div>
                  <p className="text-slate-900 font-medium text-sm">Back to Dashboard</p>
                  <p className="text-slate-700 text-xs mt-1">Continue working</p>
                </div>
              </div>
            </Link>

            <Link
              to={`/${user.role}`}
              className="group p-5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <div>
                  <p className="text-slate-900 font-medium text-sm">View Profile</p>
                  <p className="text-slate-700 text-xs mt-1">Manage account</p>
                </div>
              </div>
            </Link>

            <Link
              to={`/${user.role}`}
              className="group p-5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <Settings className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <div>
                  <p className="text-slate-900 font-medium text-sm">Settings</p>
                  <p className="text-slate-700 text-xs mt-1">Configure options</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex gap-5 flex-col md:flex-row mb-14 pb-6 border-b border-slate-200">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex-1 bg-linear-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out Now</span>
                </>
              )}
            </button>

            <Link
              to={`/${user.role}`}
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              Go Back
            </Link>
          </div>

          {/* Divider */}
          <div className="my-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">
                Need Help?
              </span>
            </div>
          </div>

          {/* Support links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Support</a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">We'll miss you! Come back soon.</p>
      </div>
    </div>
  );
};

export default Logout;