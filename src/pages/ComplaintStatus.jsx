import React from "react";
import { CheckCircle, Clock } from "lucide-react";

function ComplaintStatus() {
  const complaints = [
    { id: 1, text: "Water leakage issue", status: "Resolved" },
    { id: 2, text: "Electric meter issue", status: "In Progress" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Complaint Status</h2>

        <div className="space-y-4">
          {complaints.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-900">
                    {item.text}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Complaint ID: #{item.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === "Resolved" ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {item.status}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                        {item.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {complaints.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No complaints found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintStatus;