# 🛡️ AI SOC Analyst Assistant

A modern AI-powered SOC (Security Operations Center) Analyst Dashboard built using **React.js**, **Node.js**, **Express.js**, **Chart.js**, and **MITRE ATT&CK Mapping**. The application analyzes security alerts, identifies attack techniques, extracts Indicators of Compromise (IOCs), and provides actionable recommendations with an interactive dashboard.

---

# ✨ Features

* 🔍 AI-based Security Alert Analysis
* 🛡️ MITRE ATT&CK Technique Mapping
* 🌐 IOC Extraction (IP Addresses, Domains, Emails)
* 🚨 Automatic Severity Classification
* 📄 PDF Incident Report Generation
* 📊 Interactive Dashboard (Bar Chart & Pie Chart)
* 📈 Alert Statistics
* 🔎 Search Alert History
* 💾 Local Storage Support
* 📅 Alert Timeline
* 📋 Alert History Table
* 🧹 Clear Alert History
* 🎨 Professional Dark-Themed SOC Dashboard

---

# 🖥️ Dashboard Preview

> Add screenshots here after uploading them.

```
/screenshots/dashboard.png
/screenshots/analysis.png
/screenshots/history.png
```

---

# 🛠️ Tech Stack

| Layer       | Technology            |
| ----------- | --------------------- |
| Frontend    | React.js              |
| Backend     | Node.js               |
| API         | Express.js            |
| Charts      | Chart.js              |
| PDF         | jsPDF                 |
| HTTP Client | Axios                 |
| Storage     | Browser Local Storage |

---

# 📂 Project Structure

```
soc-copilot-ai
│
├── backend
│   ├── server.js
│   ├── package.json
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── assets
│   │
│   ├── package.json
│
├── README.md
├── .gitignore
└── package.json
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/karandekaravi29/soc-copilot-ai.git

cd soc-copilot-ai
```

---

# Backend Setup

```bash
cd backend

npm install

node server.js
```

Backend runs at

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🧪 Supported Attack Detection

The AI SOC Assistant currently detects:

* Malware Infection
* Ransomware
* Phishing Attack
* SQL Injection
* Cross Site Scripting (XSS)
* Brute Force Attack
* Reverse Shell
* Command Injection
* Privilege Escalation
* DDoS Attack
* Data Exfiltration

---

# 📊 Dashboard Features

The dashboard includes:

* Total Alerts
* Critical Alerts
* High Alerts
* Medium Alerts
* Low Alerts

Visualizations

* Bar Chart
* Pie Chart
* Alert History
* Search Alerts

---

# 📄 PDF Report

Generate an Incident Report including:

* Severity
* Attack Name
* MITRE ATT&CK Technique
* Recommendations
* Indicators of Compromise (IOCs)

---

# 📌 MITRE ATT&CK Mapping

Example mappings

| Attack        | MITRE Technique |
| ------------- | --------------- |
| SQL Injection | T1190           |
| Phishing      | T1566           |
| Brute Force   | T1110           |
| Malware       | T1204           |
| DDoS          | T1498           |
| Ransomware    | T1486           |

---

# 📸 Example Alert

```
Malware detected from IP 192.168.1.20

Severity:
High

Attack:
Malware Infection

MITRE:
T1204

Recommendations:
• Isolate Host
• Run Antivirus
• Check Lateral Movement

IOC:
192.168.1.20
```

---

# 🎯 Future Improvements

* Authentication
* User Login
* MongoDB Integration
* Email Notifications
* AI Threat Intelligence
* VirusTotal API
* AbuseIPDB Integration
* Sigma Rule Mapping
* Splunk Integration
* Elastic SIEM Integration
* Live Alert Monitoring

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Avinash Karandekar**

* Cybersecurity Enthusiast
* SOC Analyst Aspirant
* B.Tech (Cyber Security)
* GitHub: https://github.com/karandekaravi29
* LinkedIn: https://www.linkedin.com/in/karandekar-avinash
# AI SOC Analyst Assistant

An AI-powered SOC Analyst Dashboard built using React, Node.js, Express, Chart.js and MITRE ATT&CK Mapping.

## Features

* Security Alert Analysis
* MITRE ATT&CK Mapping
* IOC Extraction
* Severity Classification
* PDF Report Generation
* Alert History Tracking
* Search Alerts
* Severity Dashboard
* Pie Chart Visualization
* Local Storage Support

## Technologies

* React.js
* Node.js
* Express.js
* Chart.js
* jsPDF

## Screenshots

(Add screenshots here)

## Installation

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Author

Avinash Karandekar
Cybersecurity Enthusiast
