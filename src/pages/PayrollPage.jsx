import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayrollPage = () => {
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState([]);

  const [formData, setFormData] = useState({ name: "", salary: "" });

  const handleAddPayroll = () => {
    if (!formData.name || !formData.salary) return;
    setPayroll([...payroll, { ...formData, id: Date.now() }]);
    setFormData({ name: "", salary: "" });
  };

  const handleDelete = (id) => setPayroll(payroll.filter(p => p.id !== id));

  return (
    <div className="min-h-screen px-6 py-6 bg-slate-50">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Payroll Management</h1>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Dashboard</button>
      </div>

      <div className="p-6 mb-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-4">Add Payroll Record</h2>
        <div className="flex flex-wrap gap-4">
          <input type="text" placeholder="Employee Name" value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} className="border p-2 rounded-md flex-1"/>
          <input type="number" placeholder="Salary" value={formData.salary} onChange={e => setFormData({...formData,salary:e.target.value})} className="border p-2 rounded-md flex-1"/>
          <button onClick={handleAddPayroll} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add</button>
        </div>
      </div>

      <div className="shadow-lg rounded-lg overflow-x-auto bg-white p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Salary</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map(record => (
              <tr key={record.id} className="border-b">
                <td className="px-3 py-2">{record.name}</td>
                <td className="px-3 py-2">₹{record.salary}</td>
                <td className="px-3 py-2">
                  <button onClick={() => handleDelete(record.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollPage;
