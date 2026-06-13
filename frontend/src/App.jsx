import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [alertText, setAlertText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

useEffect(() => {
  const savedHistory =
    JSON.parse(localStorage.getItem("alertHistory")) || [];

  setHistory(savedHistory);
}, []);
  const [searchTerm, setSearchTerm] = useState("");

  const totalAlerts = history.length;

  const criticalAlerts = history.filter(
    (h) => h.severity === "Critical"
  ).length;

  const highAlerts = history.filter(
    (h) => h.severity === "High"
  ).length;

  const mediumAlerts = history.filter(
    (h) => h.severity === "Medium"
  ).length;

  const lowAlerts = history.filter(
    (h) => h.severity === "Low"
  ).length;

  const analyzeAlert = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/analyze",
        {
          alert: alertText,
        }
      );

      setResult(response.data);

      const updatedHistory = [
  {
    alert: alertText,
    severity: response.data.severity,
    attack: response.data.attack,
    time: new Date().toLocaleString(),
  },
  ...history,
];

setHistory(updatedHistory);

localStorage.setItem(
  "alertHistory",
  JSON.stringify(updatedHistory)
);
    } catch (error) {
      console.error(error);
      alert("Backend Error");
    }
  };

  const downloadPDF = () => {
    if (!result) {
      alert("Analyze an alert first!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SOC Incident Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Severity: ${result.severity}`, 20, 40);
    doc.text(`Attack: ${result.attack}`, 20, 50);
    doc.text(`MITRE: ${result.mitre}`, 20, 60);

    doc.text("Recommendations:", 20, 80);

    result.recommendations?.forEach((item, index) => {
      doc.text(`• ${item}`, 25, 90 + index * 10);
    });

    doc.text("Detected IOCs:", 20, 130);

    result.iocs?.forEach((ioc, index) => {
      doc.text(`• ${ioc}`, 25, 140 + index * 10);
    });

    doc.save("SOC_Incident_Report.pdf");
  };

  const chartData = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        label: "Alert Count",
        data: [
          lowAlerts,
          mediumAlerts,
          highAlerts,
          criticalAlerts,
        ],
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#f97316",
          "#ef4444",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };
const pieData = {
  labels: ["Critical", "High", "Medium", "Low"],
  datasets: [
    {
      data: [
        criticalAlerts,
        highAlerts,
        mediumAlerts,
        lowAlerts,
      ],
      backgroundColor: [
        "#ef4444", // Critical
        "#f97316", // High
        "#facc15", // Medium
        "#22c55e", // Low
      ],
      borderWidth: 2,
    },
  ],
};
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="app-container">
      <h1>AI SOC Analyst Assistant</h1>

      <div className="stats-container">
        <div className="card total">
          <h3>Total Alerts</h3>
          <h1>{totalAlerts}</h1>
        </div>

        <div className="card critical">
          <h3>Critical Alerts</h3>
          <h1>{criticalAlerts}</h1>
        </div>

        <div className="card high">
          <h3>High Alerts</h3>
          <h1>{highAlerts}</h1>
        </div>

        <div className="card medium">
          <h3>Medium Alerts</h3>
          <h1>{mediumAlerts}</h1>
        </div>

        <div className="card low">
          <h3>Low Alerts</h3>
          <h1>{lowAlerts}</h1>
        </div>
      </div>

      <textarea
        placeholder="Enter Security Alert..."
        value={alertText}
        onChange={(e) => setAlertText(e.target.value)}
        rows="8"
        cols="70"
      />

      <br />
      <br />

      <button onClick={analyzeAlert}>
        Analyze Alert
      </button>

      <button
        onClick={downloadPDF}
        style={{ marginLeft: "10px" }}
      >
        Download PDF Report
      </button>

      <button
       onClick={() => {
  setHistory([]);
  localStorage.removeItem("alertHistory");
}}
        style={{
          marginLeft: "10px",
          background: "#dc2626",
          color: "white",
        }}
      >
        Clear History
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2>Analysis Result</h2>

          <p>
            <strong>Severity:</strong>{" "}
            <span
              style={{
                color:
                  result.severity === "Critical"
                    ? "#ef4444"
                    : result.severity === "High"
                    ? "#f97316"
                    : result.severity === "Medium"
                    ? "#facc15"
                    : "#22c55e",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {result.severity}
            </span>
          </p>

          <p>
            <strong>Attack:</strong> {result.attack}
          </p>

          <p>
            <strong>MITRE:</strong> {result.mitre}
          </p>

          <h3>Recommendations</h3>

          <ul>
            {result.recommendations?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Detected IOCs</h3>

          <ul>
            {result.iocs?.length > 0 ? (
              result.iocs.map((ioc, index) => (
                <li key={index}>{ioc}</li>
              ))
            ) : (
              <li>No IOC Found</li>
            )}
          </ul>
        </div>
      )}

      <h2 style={{ marginTop: "40px" }}>
        Severity Dashboard
      </h2>

      <div
        style={{
          width: "700px",
          margin: "auto",
        }}
      >
       <Bar
  data={chartData}
  options={chartOptions}
/>
</div>


<h2 style={{ marginTop: "40px" }}>
  Alert Distribution
</h2>

<div
  style={{
    width: "400px",
    margin: "20px auto",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
  }}
>
  <Pie data={pieData} />
</div>



<h2 style={{ marginTop: "40px" }}>
  Alert History
</h2>

      <input
        type="text"
        placeholder="Search Alert History..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>Time</th>
            <th>Alert</th>
            <th>Severity</th>
            <th>Attack</th>
          </tr>
        </thead>

        <tbody>
          {history
            .filter((item) =>
              item.alert
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td>{item.alert}</td>
                <td>{item.severity}</td>
                <td>{item.attack}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;