import React from "react";
import { Check, AlertCircle } from "lucide-react";

function PaymentHistory() {
  const payments = [
    { month: "January", amount: 5200, status: "Paid" },
    { month: "February", amount: 4750, status: "Paid" },
    { month: "March", amount: 6100, status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Payment History</h2>

        <div className="space-y-4">
          {payments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-slate-900">
                    {item.month}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === "Paid" ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {item.status}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        {item.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {payments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No payment history found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;