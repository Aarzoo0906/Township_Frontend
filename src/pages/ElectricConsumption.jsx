import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ElectricConsumption() {
  const [designation] = useState("Officer / Engineer");
  const [units] = useState(450);

  const designationChart = {
    "Supervisor / Trainee / Operator / Fitter / Welder / Lab Associate": 1000,
    "Officer / Engineer": 1500,
    "Assistant Manager / Manager": 2000,
    "AGM / DGM (Family)": 3000,
    "AGM / DGM (Bachelor)": 3500,
    "General Manager (Family)": 3500,
    "General Manager (Bachelor)": 4000,
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

  const baseCharge = designationChart[designation] || 0;
  const exemptionUnits = electricityExemption[baseCharge] || 0;

  const extraUnits = units > exemptionUnits ? units - exemptionUnits : 0;
  const extraElectricityCharge = extraUnits * 4.5;

  const pieData = {
    labels: ["Exempted Units", "Extra Charged Units"],
    datasets: [
      {
        data: [exemptionUnits, extraUnits],
        backgroundColor: ["#3b82f6", "#dc2626"],
      },
    ],
  };

  return (
    <div style={styles.page}>

      {/* ===== NAVBAR ===== */}
      <nav style={styles.navbar}>
        <h2 style={{ margin: 0 }}>Township Portal</h2>
        <div style={styles.navLinks}>
          <Link to="/user" style={styles.link}>Dashboard</Link>
          <Link to="/user/monthly-reports" style={styles.link}>Monthly Reports</Link>
          <Link to="/user/assets-provided" style={styles.link}>Assets</Link>
          <Link to="/user/deduction-report" style={styles.link}>Deduction</Link>
          <Link to="/logout" style={styles.link}>Logout</Link>
        </div>
      </nav>

      {/* ===== CONTENT ===== */}
      <div style={styles.container}>
        <h2 style={{ color: "black" }}>Electric Consumption</h2>

        {/* BILL CARD */}
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <p><strong>Designation:</strong> {designation}</p>
          <p><strong>Base Facility Charge:</strong> ₹{baseCharge}</p>
          <p><strong>Total Units Consumed:</strong> {units} Units</p>
          <p><strong>Exempted Units:</strong> {exemptionUnits} Units</p>
          <p><strong>Extra Units:</strong> {extraUnits} Units</p>
          <p><strong>Extra Charge:</strong> ₹{extraElectricityCharge}</p>

          <hr />

          <p style={styles.bill}>
            <strong>Total Electricity Deduction:</strong> ₹{extraElectricityCharge}
          </p>
        </div>

        {/* CHART CARD */}
        <div
          style={styles.chartCard}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3 style={{ color: "black" }}>Electricity Usage Breakdown</h3>
          <Pie data={pieData} />
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
  card: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    border: "2px solid #1e3c72",
    transition: "all 0.3s ease",
    color: "black",
  },
  chartCard: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    border: "2px solid #ff4e50",
    transition: "all 0.3s ease",
    color: "black",
    maxWidth: "500px",
  },
  bill: {
    fontSize: "20px",
    color: "#dc2626",
  },
};

export default ElectricConsumption;
