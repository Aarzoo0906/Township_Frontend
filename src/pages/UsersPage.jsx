import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const navigate = useNavigate();

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.role) return;
    setUsers([...users, { ...formData, id: Date.now() }]);
    setFormData({ name: "", email: "", role: "" });
  };

  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div className="min-h-screen px-6 py-6 bg-slate-50">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Users Management</h1>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Dashboard</button>
      </div>

      {/* Add User Form */}
      <div className="p-6 mb-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        <div className="flex flex-wrap gap-4">
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} className="border p-2 rounded-md flex-1"/>
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData,email:e.target.value})} className="border p-2 rounded-md flex-1"/>
          <input type="text" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData,role:e.target.value})} className="border p-2 rounded-md flex-1"/>
          <button onClick={handleAddUser} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add User</button>
        </div>
      </div>

      {/* Users Table */}
      <div className="shadow-lg rounded-lg overflow-x-auto bg-white p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2">
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
