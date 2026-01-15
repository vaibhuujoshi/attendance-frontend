import React, { useEffect, useState, useMemo } from "react";
import "./HomePage.css";
import ActionAlerts from "./components/ActionAlerts";
import MonthlyCalendar from "./components/MonthlyCalendar";

// --- Helpers ---
function getMonthYear(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function HomePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [alert, setAlert] = useState({ show: false, message: "", severity: "info" });

  // 1. Auth & Login (Auto-detect from URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUserId = params.get("uid") || params.get("uId");

    if (urlUserId) {
      localStorage.setItem("uid", urlUserId);
      setUserId(urlUserId);
      window.history.replaceState({}, document.title, "/"); // Clean URL
    }
  }, []);

  // 2. Fetch Data
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`https://attendance-backend-hhkn.onrender.com/attendance/all?userId=${userId}`)
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        setAttendanceData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setAlert({ show: true, severity: "error", message: "❌ Failed to connect to server" });
        setLoading(false);
      });
  }, [userId]);

  // 3. AI Summary Logic
  const handleSummarize = () => {
    setSummary("Analysing patterns...");
    setTimeout(() => {
      // Replace this with your actual fetch if you have an endpoint
       const rate = ((presentDays/totalDays)*100).toFixed(0);
      setSummary(`You maintain a ${rate}% attendance rate. Try to avoid missing Mondays to improve consistency.`);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 4. Metrics & Grouping
  const workingDays = attendanceData.filter(d => d.status !== "Holiday");
  const totalDays = workingDays.length;
  const presentDays = workingDays.filter(d => d.status === "Present").length;
  const absentDays = workingDays.filter(d => d.status === "Absent").length;
  const percentage = totalDays === 0 ? 0 : ((presentDays / totalDays) * 100).toFixed(1);

  const groupedAttendance = useMemo(() => {
    let data = [...attendanceData];
    if (statusFilter !== "All") data = data.filter(r => r.status === statusFilter);
    data.sort((a, b) => sortOrder === "latest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
    
    return data.reduce((acc, curr) => {
      const key = getMonthYear(curr.date);
      if (!acc[key]) acc[key] = [];
      acc[key].push(curr);
      return acc;
    }, {});
  }, [attendanceData, sortOrder, statusFilter]);

  if (!userId) return <LoginScreen />;

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <div className="logo-box">📅</div>
          <h1>Attendance<span className="highlight">Tracker</span></h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <main className="main-content">
        <ActionAlerts message={alert.message} severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })} />

        {/* Top Stats Row */}
        <section className="stats-container">
          <StatCard label="Total Days" value={totalDays} color="blue" icon="🗓️" />
          <StatCard label="Present" value={presentDays} color="green" icon="✅" />
          <StatCard label="Absent" value={absentDays} color="red" icon="❌" />
          <StatCard label="Attendance %" value={`${percentage}%`} color="purple" icon="📈" />
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          
          {/* LEFT: Calendar & AI */}
          <aside className="sidebar">
            <div className="card calendar-wrapper">
              <h3 className="card-title">Calendar View</h3>
              {/* Wrapping component to enforce styles */}
              <div className="calendar-box">
                <MonthlyCalendar attendanceData={attendanceData} />
              </div>
            </div>

            <div className="card ai-wrapper">
              <div className="ai-header">
                <h3>✨ AI Insights</h3>
              </div>
              <p className="ai-desc">Get a smart summary of your attendance habits.</p>
              <button onClick={handleSummarize} className="ai-btn" disabled={loading}>
                {loading ? "Thinking..." : "Summarize Now"}
              </button>
              {summary && <div className="ai-result">{summary}</div>}
            </div>
          </aside>

          {/* RIGHT: Records Table */}
          <section className="card table-wrapper">
            <div className="table-header">
              <h2>Records Log</h2>
              <div className="controls">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
                <button onClick={() => setSortOrder(prev => prev === "latest" ? "oldest" : "latest")}>
                  {sortOrder === "latest" ? "⬇ Newest" : "⬆ Oldest"}
                </button>
              </div>
            </div>

            <div className="table-scroll custom-scrollbar">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groupedAttendance).length === 0 ? (
                    <tr><td colSpan="3" className="no-data">No records found</td></tr>
                  ) : (
                    Object.entries(groupedAttendance).map(([month, records]) => (
                      <React.Fragment key={month}>
                        <tr className="month-header"><td colSpan="3">{month}</td></tr>
                        {records.map((r, i) => (
                          <tr key={i} className="data-row">
                            <td className="date-cell">{formatDate(r.date)}</td>
                            <td><StatusBadge status={r.status} /></td>
                            <td className="note-cell">{r.reason || "—"}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// --- Components ---
const LoginScreen = () => (
  <div className="login-screen">
    <div className="login-box">
      <h1>👋 Welcome Back</h1>
      <p>Please use the link provided by your Telegram Bot to access your dashboard.</p>
    </div>
  </div>
);

const StatCard = ({ label, value, color, icon }) => (
  <div className={`stat-card ${color}`}>
    <div className="stat-text">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
    <div className="icon-box">{icon}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = { Present: "badge-green", Absent: "badge-red", Holiday: "badge-yellow" };
  return <span className={`badge ${map[status] || "badge-gray"}`}>{status}</span>;
};