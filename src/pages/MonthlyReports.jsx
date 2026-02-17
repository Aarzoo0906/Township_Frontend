import React, { useState } from "react";
import { Link } from "react-router-dom";

function MonthlyReport() {
  const reports = [
    {
      month: "January",
      year: 2026,
      utilities: { electricity: 1750, water: 450, gas: 300 },
      maintenance: { monthlyFee: 2000, sinkingFund: 500, parking: 300 },
      deductions: { lateFine: 200, previousDue: 500 },
    },
    {
      month: "February",
      year: 2026,
      utilities: { electricity: 1500, water: 400, gas: 250 },
      maintenance: { monthlyFee: 2000, sinkingFund: 500, parking: 300 },
      deductions: { lateFine: 0, previousDue: 0 },
    },
    {
      month: "March",
      year: 2026,
      utilities: { electricity: 2100, water: 500, gas: 320 },
      maintenance: { monthlyFee: 2000, sinkingFund: 500, parking: 300 },
      deductions: { lateFine: 150, previousDue: 200 },
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const report = reports[selectedIndex];

  const totalUtilities =
    report.utilities.electricity +
    report.utilities.water +
    report.utilities.gas;

  const totalMaintenance =
    report.maintenance.monthlyFee +
    report.maintenance.sinkingFund +
    report.maintenance.parking;

  const totalDeductions =
    report.deductions.lateFine +
    report.deductions.previousDue;

  const totalCharges = totalUtilities + totalMaintenance;
  const netPayable = totalCharges + totalDeductions;

  const handlePayment = () => {
    alert(`Redirecting to payment gateway for ₹${netPayable}`);
  };

  return (
    <div style={styles.page}>

      {/* ===== NAVBAR ===== */}
      <nav style={styles.navbar}>
        <h2 style={{ margin: 0 }}>Township Portal</h2>
        <div style={styles.navLinks}>
          <Link to="/user" style={styles.link}>Dashboard</Link>
          <Link to="/user/assets-provided" style={styles.link}>Assets</Link>
          <Link to="/user/deduction-report" style={styles.link}>Deduction</Link>
          <Link to="/user/electric-consumption" style={styles.link}>Electricity</Link>
          <Link to="/logout" style={styles.link}>Logout</Link>
        </div>
      </nav>

      {/* ===== CONTENT ===== */}
      <div style={styles.container}>
        <h2 style={{ color: "black" }}>Monthly Report</h2>

        {/* Month Selector */}
        <div style={styles.dropdownContainer}>
          <label style={{ fontWeight: "bold" }}>Select Month: </label>
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(e.target.value)}
            style={styles.dropdown}
          >
            {reports.map((item, index) => (
              <option key={index} value={index}>
                {item.month} {item.year}
              </option>
            ))}
          </select>
        </div>

        {/* Utility Charges */}
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Utility Charges</h3>
          <p>Electricity: ₹{report.utilities.electricity}</p>
          <p>Water: ₹{report.utilities.water}</p>
          <p>Gas: ₹{report.utilities.gas}</p>
          <hr />
          <strong>Total Utilities: ₹{totalUtilities}</strong>
        </div>

        {/* Maintenance Charges */}
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Maintenance Charges</h3>
          <p>Monthly Maintenance: ₹{report.maintenance.monthlyFee}</p>
          <p>Sinking Fund: ₹{report.maintenance.sinkingFund}</p>
          <p>Parking Charges: ₹{report.maintenance.parking}</p>
          <hr />
          <strong>Total Maintenance: ₹{totalMaintenance}</strong>
        </div>

        {/* Deductions */}
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Deductions / Penalties</h3>
          <p>Late Fine: ₹{report.deductions.lateFine}</p>
          <p>Previous Due: ₹{report.deductions.previousDue}</p>
          <hr />
          <strong>Total Deductions: ₹{totalDeductions}</strong>
        </div>

        {/* Summary */}
        <div
          style={styles.summary}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Final Summary</h3>
          <p>Total Charges: ₹{totalCharges}</p>
          <p>Total Deductions: ₹{totalDeductions}</p>
          <h2>Net Payable Amount: ₹{netPayable}</h2>

          <button
            style={styles.payButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#15803d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#16a34a")
            }
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff4e50, #1e3c72)",
    paddingBottom: "40px",
  },
  navbar: {
    background: "rgba(0,0,0,0.3)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: {
    margin: "40px auto",
    width: "80%",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  dropdownContainer: {
    marginBottom: "20px",
  },
  dropdown: {
    marginLeft: "10px",
    padding: "5px 10px",
    borderRadius: "6px",
  },
  card: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "2px solid #1e3c72",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    color: "black",
  },
  summary: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "12px",
    marginTop: "20px",
    border: "2px solid #ff4e50",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    color: "black",
  },
  payButton: {
    marginTop: "15px",
    padding: "10px 25px",
    border: "none",
    background: "#16a34a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};

export default MonthlyReport;
