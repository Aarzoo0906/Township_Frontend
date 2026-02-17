import React from "react";
import { Link } from "react-router-dom";

function AssetsProvided() {
  const assetData = {
    roomNumber: "A-102",
    totalBeds: 3,
    occupiedBeds: 2,
    furniture: [
      { name: "Chair", quantity: 2 },
      { name: "Study Table", quantity: 1 },
      { name: "Cupboard", quantity: 1 },
    ],
    fixtures: [
      { name: "Mattress", quantity: 2 },
      { name: "Pillow", quantity: 2 },
      { name: "Bedsheet", quantity: 2 },
      { name: "Blanket", quantity: 2 },
      { name: "Ceiling Fan", quantity: 1 },
      { name: "LED Light", quantity: 2 },
    ],
  };

  const availableBeds = assetData.totalBeds - assetData.occupiedBeds;
  const occupancyPercentage =
    (assetData.occupiedBeds / assetData.totalBeds) * 100;

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2>Township Portal</h2>
        <div style={styles.navLinks}>
          <Link to="/user" style={styles.link}>Dashboard</Link>
          <Link to="/user/monthly-reports" style={styles.link}>Monthly Reports</Link>
          <Link to="/user/deduction-report" style={styles.link}>Deduction</Link>
          <Link to="/user/electric-consumption" style={styles.link}>Electricity</Link>
          <Link to="/logout" style={styles.link}>Logout</Link>
        </div>
      </nav>

      <div style={styles.container}>
        <h2 style={{ color: "black" }}>Assets Provided</h2>

        {[ 
          <div key="room">
            <h3>Room Details</h3>
            <p>Room: {assetData.roomNumber}</p>
            <p>Total Beds: {assetData.totalBeds}</p>
            <p>Occupied Beds: {assetData.occupiedBeds}</p>
            <p>Available Beds: {availableBeds}</p>
            <div style={styles.progressBarContainer}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${occupancyPercentage}%`,
                }}
              >
                {occupancyPercentage.toFixed(0)}%
              </div>
            </div>
          </div>,

          <div key="furniture">
            <h3>Furniture</h3>
            <ul>
              {assetData.furniture.map((item, i) => (
                <li key={i}>{item.name} - {item.quantity}</li>
              ))}
            </ul>
          </div>,

          <div key="fixtures">
            <h3>Fixtures</h3>
            <ul>
              {assetData.fixtures.map((item, i) => (
                <li key={i}>{item.name} - {item.quantity}</li>
              ))}
            </ul>
          </div>
        ].map((section, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}

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
  progressBarContainer: {
    width: "100%",
    background: "#e5e7eb",
    borderRadius: "10px",
    marginTop: "10px",
    height: "25px",
  },
  progressBarFill: {
    height: "100%",
    background: "#3b82f6",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
    lineHeight: "25px",
    fontWeight: "bold",
  },
};

export default AssetsProvided;
