import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LogOut,
  Zap,
  Calendar,
  Building2,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const UserDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "Aarzoo Singh",
    address: "Block A, Room 204",
    contact: "+91 9876543210",
    block: "Block A",
    buildingType: "Family",
    bedNo: "B2",
    floor: "2nd Floor",
    checkIn: "12 Jan 2025",
  };
  const navLinkStyle = ({ isActive }) =>
  `transition duration-200 ${
    isActive
      ? "text-white border-b-2 border-white pb-1"
      : "text-white hover:text-white/80"
  }`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-50 to-slate-100 flex flex-col relative overflow-hidden">
      <style>{`
        .gradient-border {
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(254, 226, 226, 0.6) 0%, rgba(219, 234, 254, 0.6) 100%) padding-box, linear-gradient(135deg, #dc2626 0%, #1e40af 100%) border-box;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
        }
        .gradient-border:hover {
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.2), 0 15px 40px rgba(30, 64, 175, 0.15);
          transform: translateY(-4px);
        }
      `}</style>

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* ================= NAVBAR (FULL WIDTH) ================= */}
      <nav className="w-full bg-gradient-to-r from-red-600 to-blue-700 sticky top-0 z-50 shadow-lg">
  <div className="px-6 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      

      {/* Logo */}
      <div className ="flex items-center gap-3">
        <img src="/logo.jpg"
        alt="RSPL Logo"
        className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
        />
        <div>
          <h1 className ="text-xl font-bold text-white">
            User Dashboard
          </h1>
          <p className="text-xs font-semibold text-white/90">
          RSPL Township
          </p>
        </div>
      </div>
     

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <NavLink to="/pages/raise-complaint" className={navLinkStyle}>
          Raise Complaint
        </NavLink>

        <NavLink to="/pages/complaints" className={navLinkStyle}>
          Complaint Status
        </NavLink>

        <NavLink to="/pages/payments" className={navLinkStyle}>
          Payment History
        </NavLink>

        <NavLink
          to="/logout"
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </NavLink>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden pb-4 space-y-3 pt-4">
        <NavLink
          to="/user/raise-complaint"
          onClick={() => setIsMenuOpen(false)}
          className="block text-white"
        >
          Raise Complaint
        </NavLink>

        <NavLink
          to="/user/complaints"
          onClick={() => setIsMenuOpen(false)}
          className="block text-white"
        >
          Complaint Status
        </NavLink>

        <NavLink
          to="/user/payments"
          onClick={() => setIsMenuOpen(false)}
          className="block text-white"
        >
          Payment History
        </NavLink>
      </div>
    )}
  </div>
</nav>

      {/* ================= MAIN CONTENT (FULL SCREEN) ================= */}
      <div className="relative z-10 flex-1 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Grid - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 w-full max-w-7xl">

          {/* LEFT CARD */}
          <div className="lg:col-span-2 gradient-border rounded-xl p-10 w-100 h-100 shadow-sm space-y-8">

            {/* Profile */}
            <div className="flex items-center gap-6">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-600"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {user.fullName}
                </h2>
                <p className="text-sm text-slate-600">{user.block}</p>
              </div>
            </div>

            <div className="border-t border-slate-200"></div>

            {/* Resident Details */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-slate-900">
                Resident Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-700">
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
                <p><strong>Building Type:</strong> {user.buildingType}</p>
                <p><strong>Bed No:</strong> {user.bedNo}</p>
                <p><strong>Floor:</strong> {user.floor}</p>
                <p><strong>Check-in Date:</strong> {user.checkIn}</p>
              </div>
            </div>

          </div>

          {/* RIGHT CARDS */}
         {/* RIGHT CARDS */}
<div className="lg:col-span-2 grid md:grid-cols-2 gap-15">

  <Link to="/user/electric-consumption" className="gradient-border rounded-xl p-6 h-40 w-40 shadow-sm">
    <Zap className="mb-4 text-red-600" />
    <h4 className="font-semibold">Electricity Consumption</h4>
  </Link>

  <Link to="/user/monthly-reports" className="gradient-border rounded-xl p-6 shadow-sm h-40 w-40">
    <Calendar className="mb-4 text-blue-600" />
    <h4 className="font-semibold">Monthly Report</h4>
  </Link>

  <Link to="/user/assets-provided" className="gradient-border rounded-xl p-6 shadow-sm h-40 w-40">
    <Building2 className="mb-4 text-green-600" />
    <h4 className="font-semibold">Assets Provided</h4>
  </Link>

  <Link to="/user/deduction-report" className="gradient-border rounded-xl h-40 w-40 p-6 shadow-sm">
    <FileText className="mb-4 text-purple-600" />
    <h4 className="font-semibold">Deduction Report</h4>
  </Link>

</div>

        </div>
      </div>

      {/* ================= OVERVIEW SECTION ================= */}
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-8 pb-4">
        <div className="max-w-7xl mx-auto">
        <div className="gradient-border rounded-xl p-10 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">
            Overview
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <p className="text-sm text-slate-500">Pending Complaints</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <p className="text-sm text-slate-500">Last Bill Amount</p>
              <p className="text-2xl font-bold text-blue-600">₹1,450</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <p className="text-sm text-slate-500">Total Units Used</p>
              <p className="text-2xl font-bold text-green-600">325 kWh</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <p className="text-sm text-slate-500">Active Assets</p>
              <p className="text-2xl font-bold text-purple-600">4</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* ================= FOOTER (FULL WIDTH GRADIENT) ================= */}
      <footer className="relative z-10 w-full bg-linear-to-r from-red-600 to-blue-700 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-sm font-bold text-white">
            RSPL Township Management
          </p>
          <p className="text-xs text-white/90 mt-2">
            Building Better Communities, Creating Better Lives
          </p>
          <p className="text-xs text-white/70 mt-4">
            © 2026 RSPL Group. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default UserDashboard;