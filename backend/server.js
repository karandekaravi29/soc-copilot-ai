const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI SOC Backend Running");
});

app.post("/analyze", (req, res) => {
  const alertText = (req.body.alert || "").toLowerCase();

  let severity = "Low";
  let attack = "Unknown";
  let mitre = "Unknown";
  let recommendations = [];

  // -----------------------
  // IOC Extraction
  // -----------------------

  const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

  const domainRegex =
    /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/g;

  const emailRegex =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

  const ips = alertText.match(ipRegex) || [];
  const domains = alertText.match(domainRegex) || [];
  const emails = alertText.match(emailRegex) || [];

  const iocs = [...new Set([...ips, ...domains, ...emails])];

  // -----------------------
  // SQL Injection
  // -----------------------

  if (
    alertText.includes("sql injection") ||
    alertText.includes("or 1=1") ||
    alertText.includes("union select") ||
    alertText.includes("select * from")
  ) {
    severity = "High";
    attack = "SQL Injection";
    mitre = "T1190 - Exploit Public-Facing Application";

    recommendations = [
      "Validate user input",
      "Use parameterized queries",
      "Deploy Web Application Firewall",
    ];
  }

  // -----------------------
  // Phishing
  // -----------------------

  else if (
    alertText.includes("phishing") ||
    alertText.includes("credential") ||
    alertText.includes("suspicious email")
  ) {
    severity = "High";
    attack = "Phishing Attack";
    mitre = "T1566 - Phishing";

    recommendations = [
      "Block sender domain",
      "Reset affected credentials",
      "Educate end users",
    ];
  }

  // -----------------------
  // DDoS
  // -----------------------

  else if (
    alertText.includes("ddos") ||
    alertText.includes("traffic flood")
  ) {
    severity = "Critical";
    attack = "DDoS Attack";
    mitre = "T1498 - Network Denial of Service";

    recommendations = [
      "Enable rate limiting",
      "Block malicious IPs",
      "Use DDoS protection service",
    ];
  }

  // -----------------------
  // XSS
  // -----------------------

  else if (
    alertText.includes("<script>") ||
    alertText.includes("xss")
  ) {
    severity = "High";
    attack = "Cross-Site Scripting (XSS)";
    mitre = "T1059 - Command and Scripting Interpreter";

    recommendations = [
      "Sanitize user input",
      "Implement CSP headers",
      "Encode output",
    ];
  }

  // -----------------------
  // Command Injection
  // -----------------------

  else if (
    alertText.includes("command injection") ||
    alertText.includes("cmd.exe") ||
    alertText.includes("powershell")
  ) {
    severity = "Critical";
    attack = "Command Injection";
    mitre = "T1059 - Command and Scripting Interpreter";

    recommendations = [
      "Block dangerous commands",
      "Validate input",
      "Monitor process execution",
    ];
  }

  // -----------------------
  // Privilege Escalation
  // -----------------------

  else if (
    alertText.includes("privilege escalation") ||
    alertText.includes("administrator access") ||
    alertText.includes("root access")
  ) {
    severity = "High";
    attack = "Privilege Escalation";
    mitre = "T1068 - Exploitation for Privilege Escalation";

    recommendations = [
      "Review permissions",
      "Audit privileged accounts",
      "Apply patches",
    ];
  }

  // -----------------------
  // Reverse Shell
  // -----------------------

  else if (
    alertText.includes("reverse shell") ||
    alertText.includes("shell connection") ||
    alertText.includes("netcat")
  ) {
    severity = "Critical";
    attack = "Reverse Shell";
    mitre = "T1059 - Command and Scripting Interpreter";

    recommendations = [
      "Terminate connection",
      "Isolate endpoint",
      "Investigate attacker activity",
    ];
  }

  // -----------------------
  // Brute Force
  // -----------------------

  else if (
    alertText.includes("failed login") ||
    alertText.includes("failed") ||
    alertText.includes("brute force")
  ) {
    severity = "Medium";
    attack = "Brute Force Attack";
    mitre = "T1110 - Brute Force";

    recommendations = [
      "Enable MFA",
      "Lock accounts after failures",
      "Review authentication logs",
    ];
  }

  // -----------------------
  // Malware
  // -----------------------

  else if (
    alertText.includes("malware") ||
    alertText.includes("virus") ||
    alertText.includes("trojan")
  ) {
    severity = "High";
    attack = "Malware Infection";
    mitre = "T1204 - User Execution";

    recommendations = [
      "Isolate infected host",
      "Run AV scan",
      "Investigate lateral movement",
    ];
  }

  // -----------------------
  // Ransomware
  // -----------------------

  else if (
    alertText.includes("ransomware") ||
    alertText.includes("encrypted")
  ) {
    severity = "Critical";
    attack = "Ransomware Attack";
    mitre = "T1486 - Data Encrypted for Impact";

    recommendations = [
      "Disconnect host",
      "Restore backups",
      "Notify IR team",
    ];
  }

  // -----------------------
  // Data Exfiltration
  // -----------------------

  else if (
    alertText.includes("data transfer") ||
    alertText.includes("exfiltration")
  ) {
    severity = "High";
    attack = "Data Exfiltration";
    mitre = "T1041 - Exfiltration Over C2 Channel";

    recommendations = [
      "Block outbound traffic",
      "Review firewall logs",
      "Investigate compromised accounts",
    ];
  }

  res.json({
    severity,
    attack,
    mitre,
    recommendations,
    iocs,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});