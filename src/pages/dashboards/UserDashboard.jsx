import React, { useState } from 'react';
import { LogOut, Home, Settings, Bell, Menu, X, Zap, Heart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 relative overflow-hidden">
      <style>{`
        .logo-gradient-small {
          position: relative;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626 0%, #1e40af 100%);
          padding: 2px;
          display: inline-flex;
        }
        .logo-gradient-small img {
          display: block;
          border-radius: 50%;
          background: white;
        }
      `}</style>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Header/Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="logo-gradient-small w-10 h-10">
                <img src="/logo.jpg" alt="RSPL Logo" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">User Dashboard</h1>
                <p className="text-xs font-semibold bg-linear-to-r from-red-600 to-blue-700 bg-clip-text text-transparent">RSPL</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <span className="text-slate-600 text-sm">Welcome, <span className="text-blue-600 font-semibold">{user.fullName}</span></span>
              <Link
                to="/logout"
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 font-medium shadow-lg text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-900 hover:text-blue-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-slate-300">
              <div className="space-y-3 pt-4">
                <span className="block text-slate-600 text-sm px-4">Welcome, <span className="text-blue-600 font-semibold">{user.fullName}</span></span>
                <Link
                  to="/logout"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-600 to-blue-700 text-white rounded-lg w-full justify-center text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome Back, <span className="bg-linear-to-r from-red-600 to-blue-700 bg-clip-text text-transparent">{user.fullName}</span>
          </h2>
          <p className="text-slate-600 text-lg">Access your personal features and settings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {[
            { label: 'Profile Completion', value: '85%', icon: Home, color: 'from-cyan-500 to-blue-500' },
            { label: 'Active Sessions', value: '2', icon: Zap, color: 'from-teal-500 to-cyan-500' },
            { label: 'Last Login', value: 'Today', icon: Clock, color: 'from-blue-500 to-cyan-500' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-8 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className={`inline-block bg-linear-to-r ${stat.color} rounded-lg p-3 mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-slate-700 text-sm">{stat.label}</p>
                <p className="text-slate-900 text-2xl font-bold mt-3">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-slate-900 mb-10">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: 'Edit Profile', desc: 'Update your info' },
              { title: 'Settings', desc: 'Preferences & privacy' },
              { title: 'Notifications', desc: 'Manage alerts' },
              { title: 'Help Center', desc: 'Get support' },
            ].map((action, idx) => (
              <button key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 p-8 hover:border-blue-400 hover:bg-white hover:shadow-lg transition-all text-left">
                <p className="text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">{action.title}</p>
                <p className="text-slate-700 text-sm mt-3">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-slate-200 p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-10">Your Activity</h3>
          <div className="space-y-6">
            {[
              'Profile updated successfully',
              'Password changed 3 days ago',
              'Logged in from new device',
              'Account verification completed',
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-5 p-5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0"></div>
                <p className="text-slate-700 text-sm">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;