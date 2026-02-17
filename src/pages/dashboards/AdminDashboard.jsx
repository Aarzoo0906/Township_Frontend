import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  FileText,
  Calendar,
  Menu,
  X,
  PlusCircle,
  CheckCircle,
} from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dashboard, setDashboard] = useState({});
  const [finance, setFinance] = useState({});
  const [charts, setCharts] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dashRes = await axios.get("/api/admin/dashboard");
        const financeRes = await axios.get("/api/admin/revenue-summary");

        setDashboard(
          dashRes.data || {
            totalEmployees: 25,
            totalUnits: 50,
            totalBeds: 200,
            occupiedBeds: 180,
            vacantBeds: 20,
            occupancyPercent: 90,
          }
        );

        setFinance(
          financeRes.data || {
            currentMonthRevenue: 145000,
            totalPaid: 125000,
            totalPending: 20000,
            pendingCount: 5,
          }
        );

        setCharts({
          revenueTrend: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            data: [20000, 25000, 30000, 22000, 28000, 35000],
          },
          occupancyPie: {
            labels: ["Occupied", "Vacant"],
            data: [180, 20],
          },
          paidPendingBar: {
            labels: ["Paid", "Pending"],
            data: [125000, 20000],
          },
        });

        setComplaints([
          { id: 1, employee: "John Doe", type: "Electrical", status: "Open" },
          { id: 2, employee: "Jane Smith", type: "Plumbing", status: "Escalated" },
          { id: 3, employee: "Alice", type: "Maintenance", status: "Open" },
        ]);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const navLinkStyle = ({ isActive }) =>
    `transition duration-200 ${
      isActive ? "text-white border-b-2 border-white pb-1" : "text-white hover:text-white/80"
    }`;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-slate-600 font-bold">
        Loading Admin Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(254, 226, 226,0.05) 0%, rgba(219, 234, 254,0.05) 100%)" }}
    >
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-red-600 to-blue-700 shadow-lg py-4">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="RSPL Logo" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs font-semibold text-white/90">RSPL Township</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/admin/users" className={navLinkStyle}>Users</Link>
            <Link to="/admin/revenue" className={navLinkStyle}>Revenue</Link>
            <Link to="/admin/payroll" className={navLinkStyle}>Payroll</Link>
            <Link to="/logout" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition">
              <LogOut className="w-4 h-4" /> Logout
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-4 space-y-3 px-6 text-white">
            <Link to="/admin/users" onClick={() => setIsMenuOpen(false)}>Users</Link>
            <Link to="/admin/revenue" onClick={() => setIsMenuOpen(false)}>Revenue</Link>
            <Link to="/admin/payroll" onClick={() => setIsMenuOpen(false)}>Payroll</Link>
          </div>
        )}
      </nav>

      <div className="h-20"></div> {/* Spacer for navbar */}

      {/* Main Sections */}
      <div className="space-y-12 w-full px-6 lg:px-12">

        {/* Card Style */}
        <style>{`
          .gradient-border {
            border: 2px solid transparent;
            border-radius: 0.75rem;
            background-image: linear-gradient(white, white), linear-gradient(to right, #dc2626, #1e40af);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .gradient-border:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(220,38,38,0.3), 0 10px 20px rgba(30,64,175,0.3);
          }
        `}</style>

        {/* Top Summary */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Top Summary</h2>
          <div className="grid md:grid-cols-6 gap-6">
            {["Total Employees", "Total Units", "Total Beds", "Occupied Beds", "Vacant Beds", "Occupancy %"].map((label, idx) => (
              <div key={idx} className="gradient-border p-6 text-center bg-slate-50">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {label === "Total Employees" ? dashboard.totalEmployees :
                   label === "Total Units" ? dashboard.totalUnits :
                   label === "Total Beds" ? dashboard.totalBeds :
                   label === "Occupied Beds" ? dashboard.occupiedBeds :
                   label === "Vacant Beds" ? dashboard.vacantBeds :
                   dashboard.occupancyPercent + "%"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Finance Summary */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Finance Summary</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[{ label: "Current Month Revenue", value: `₹${finance.currentMonthRevenue}` },
              { label: "Total Paid", value: `₹${finance.totalPaid}` },
              { label: "Total Pending", value: `₹${finance.totalPending}` },
              { label: "Pending Payments Count", value: finance.pendingCount }].map((card, idx) => (
              <div key={idx} className="gradient-border p-6 text-center bg-slate-50">
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Charts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="gradient-border p-6 bg-slate-50">
              <h3 className="text-lg font-bold mb-4">Revenue Trend</h3>
              <Line data={{ labels: charts.revenueTrend.labels, datasets: [{ label: 'Revenue', data: charts.revenueTrend.data, borderColor: '#dc2626', backgroundColor: 'rgba(220,38,38,0.2)' }] }} />
            </div>
            <div className="gradient-border p-6 bg-slate-50">
              <h3 className="text-lg font-bold mb-4">Occupancy</h3>
              <Pie data={{ labels: charts.occupancyPie.labels, datasets: [{ data: charts.occupancyPie.data, backgroundColor: ['#1e40af','#dc2626'] }] }} />
            </div>
            <div className="gradient-border p-6 bg-slate-50">
              <h3 className="text-lg font-bold mb-4">Paid vs Pending</h3>
              <Bar data={{ labels: charts.paidPendingBar.labels, datasets: [{ label: 'Amount', data: charts.paidPendingBar.data, backgroundColor: ['#1e40af','#dc2626']}] }} />
            </div>
          </div>
        </section>

        {/* Complaints */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Complaints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="gradient-border p-6 bg-slate-50">
              <p className="text-lg">Open Complaints: <strong>{complaints.filter(c => c.status === "Open").length}</strong></p>
              <p className="text-lg mt-2">Escalated Complaints: <strong>{complaints.filter(c => c.status === "Escalated").length}</strong></p>
            </div>
            <div className="gradient-border p-6 bg-slate-50 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Employee</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(c => (
                    <tr key={c.id} className="border-t">
                      <td className="px-3 py-2">{c.id}</td>
                      <td className="px-3 py-2">{c.employee}</td>
                      <td className="px-3 py-2">{c.type}</td>
                      <td className="px-3 py-2">{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HR Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">HR</h2>
          <div className="flex flex-wrap gap-6">
            <button className="gradient-border px-6 py-3 bg-slate-50 flex items-center gap-2"><FileText /> Download Payroll</button>
            <button className="gradient-border px-6 py-3 bg-slate-50 flex items-center gap-2"><Calendar /> Generate Monthly Deductions</button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Quick Actions</h2>
          <div className="flex flex-wrap gap-6">
            <button className="gradient-border px-6 py-3 bg-slate-50 flex items-center gap-2"><PlusCircle /> Create Unit</button>
            <button className="gradient-border px-6 py-3 bg-slate-50 flex items-center gap-2"><PlusCircle /> Create Allotment</button>
            <button className="gradient-border px-6 py-3 bg-slate-50 flex items-center gap-2"><CheckCircle /> Checkout Employee</button>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-red-600 to-blue-700 shadow-lg mt-12 py-6">
        <div className="text-center text-white px-6">
          <p className="text-sm font-bold">RSPL Township Management</p>
          <p className="text-xs text-white/90 mt-2">Building Better Communities, Creating Better Lives</p>
          <p className="text-xs text-white/70 mt-4">© 2026 RSPL Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
