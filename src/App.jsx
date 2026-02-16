import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import UserDashboard from './pages/dashboards/UserDashboard';
import SupervisorDashboard from './pages/dashboards/SupervisorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - User */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Township Supervisor */}
        <Route
          path="/supervisor/*"
          element={
            <ProtectedRoute requiredRole="supervisor">
              <SupervisorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Logout - Protected */}
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />

        {/* Redirect root based on token */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate to={`/${JSON.parse(localStorage.getItem('user') || '{}').role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;