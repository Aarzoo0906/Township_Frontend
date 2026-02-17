import React, { useState } from "react";
import { Link } from "react-router-dom";

const designationChart = {
  "Supervisor / Trainee / Operator / Fitter / Welder / Lab Associate": 1000,
  "Junior Executive / GET / DET / Junior Chemist": 1000,
  "Executive / Jr. Engineer / Chemist": 1000,
  "Senior Executive / Assistant Engineer / Senior Chemist": 1000,
  "Officer / Engineer": 1500,
  "Senior Officer / Sr. Engineer": 1500,
  "Assistant Manager / Deputy Manager / Manager / Senior Manager": 2000,
  "AGM / DGM / Principal (Bachelor)": 3500,
  "AGM / DGM / Principal (Family)": 3000,
  "General Manager (Bachelor)": 4000,
  "General Manager (Family)": 3500,
  "Sr. General Manager": 4000,
};

const electricityExemption = {
  1000: 200,
  1500: 300,
  2000: 400,
  3000: 600,
  3500: 600,
  4000: 800,
};

const DeductionReport = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [unitsConsumed, setUnitsConsumed] = useState(0);

  const baseCharge = designationChart[designation] || 0;
  const exemptionUnits = electricityExemption[baseCharge] || 0;
  const extraUnits = Math.max(unitsConsumed - exemptionUnits, 0);
  const extraElectricityCharge = extraUnits * 4.5;
  const totalDeduction = baseCharge + extraElectricityCharge;

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2>Township Portal</h2>
        <div style={styles.navLinks}>
          <Link to="/user" style={styles.link}>Dashboard</Link>
          <Link to="/user/monthly-reports" style={styles.link}>Monthly Reports</Link>
          <Link to="/user/assets-provided" style={styles.link}>Assets</Link>
          <Link to="/user/electric-consumption" style={styles.link}>Electricity</Link>
          <Link to="/logout" style={styles.link}>Logout</Link>
        </div>
      </nav>

      <div style={styles.container}>
        <h2 style={{ color: "black" }}>Deduction Report</h2>

        <div style={styles.form}>
          <input
            type="text"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">Select Designation</option>
            {Object.keys(designationChart).map((des, index) => (
              <option key={index} value={des}>{des}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Electricity Units Consumed"
            value={unitsConsumed}
            onChange={(e) => setUnitsConsumed(Number(e.target.value))}
          />
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <h3>Deduction Breakdown</h3>
          <p><strong>Base Facility Charge:</strong> ₹{baseCharge}</p>
          <p><strong>Electricity Exemption:</strong> {exemptionUnits} Units</p>
          <p><strong>Units Consumed:</strong> {unitsConsumed} Units</p>
          <p><strong>Extra Units:</strong> {extraUnits} Units</p>
          <p><strong>Extra Electricity Charge:</strong> ₹{extraElectricityCharge}</p>
          <hr />
          <h2>Total Deduction: ₹{totalDeduction}</h2>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff4e50, #1e3c72)",
  },
  navbar: {
    background: "rgba(0,0,0,0.3)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
  },
  navLinks: { display: "flex", gap: "20px" },
  link: { color: "white", textDecoration: "none", fontWeight: "bold" },
  container: {
    margin: "40px auto",
    width: "80%",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "25px",
  },
  card: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "12px",
    border: "2px solid #1e3c72",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    color: "black",
  },
};

export default DeductionReport;
