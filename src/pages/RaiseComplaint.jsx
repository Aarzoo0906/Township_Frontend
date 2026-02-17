import React, { useState } from "react";

function RaiseComplaint() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint.trim()) {
      setSubmitted(true);
      setComplaint("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Raise a Complaint
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              ✓ Complaint submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your complaint here..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
              className="w-full h-32 p-4 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;