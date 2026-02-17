import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

import AdminDashboard from './pages/dashboards/AdminDashboard';
import UserDashboard from './pages/dashboards/UserDashboard';
import SupervisorDashboard from './pages/dashboards/SupervisorDashboard';

import ProtectedRoute from './components/ProtectedRoute';

import ElectricConsumption from './pages/ElectricConsumption';
import MonthlyReports from './pages/MonthlyREports'; // ✅ fixed spelling
import AssetsProvided from './pages/AssetsProvided';
import DeductionReport from './pages/DeductionReport';

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/electric-consumption"
          element={
            <ProtectedRoute requiredRole="user">
              <ElectricConsumption />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/monthly-reports"
          element={
            <ProtectedRoute requiredRole="user">
              <MonthlyReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/assets-provided"
          element={
            <ProtectedRoute requiredRole="user">
              <AssetsProvided />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/deduction-report"
          element={
            <ProtectedRoute requiredRole="user">
              <DeductionReport />
            </ProtectedRoute>
          }
        />

        {/* ================= SUPERVISOR ROUTES ================= */}
        <Route
          path="/supervisor/*"
          element={
            <ProtectedRoute requiredRole="supervisor">
              <SupervisorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= LOGOUT ================= */}
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />

        {/* ================= ROOT REDIRECT ================= */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate
                to={`/${JSON.parse(localStorage.getItem('user') || '{}').role}`}
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ================= CATCH ALL ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
