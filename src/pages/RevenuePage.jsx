import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RevenuePage = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState({
    currentMonth: 145000,
    totalPaid: 125000,
    totalPending: 20000,
    pendingCount: 5
  });

  return (
    <div className="min-h-screen px-6 py-6 bg-slate-50">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Revenue Details</h1>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Dashboard</button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Current Month Revenue", value: `₹${revenue.currentMonth}` },
          { label: "Total Paid", value: `₹${revenue.totalPaid}` },
          { label: "Total Pending", value: `₹${revenue.totalPending}` },
          { label: "Pending Payments Count", value: revenue.pendingCount }
        ].map((item, idx) => (
          <div key={idx} className="p-6 shadow-lg rounded-lg bg-white border-2 border-gradient-to-r from-red-600 to-blue-600 hover:scale-105 transition text-center">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenuePage;
