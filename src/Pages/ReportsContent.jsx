import { useState } from "react";
import ReportDetailsModal from "./ReportDetailsModal";
import "./ReportsContent.css";

const exportToPDF = (data) => {
  const rows = data.map((r) =>
    `${r.student} | ${r.email} | ${r.exam} | ${r.date} | ${r.violations} violations | ${r.score} | ${r.status}`
  ).join("\n");

  const content = `TRUTHEYE - EXAM REPORTS\nGenerated: ${new Date().toLocaleDateString()}\n${"=".repeat(80)}\n\nStudent | Email | Exam | Date | Violations | Score | Status\n${"-".repeat(80)}\n${rows}\n\n${"=".repeat(80)}\nTotal Records: ${data.length}\n`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `TruthEye_Reports_${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

const allReports = [
  { id: 1, student: "Sara Ahmed Ali", email: "sara.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 0, score: "45/50", status: "Passed" },
  { id: 2, student: "Ali Ahmed Ali", email: "ali.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 4, score: "26/50", status: "Suspected", violationDetails: ["Tab Switch - Detected at 30 min", "Multiple Faces - Detected at 90 min", "Object Detection - Detected at 50 min", "Face Not Detected - Detected at 105 min"] },
  { id: 3, student: "Sara Ahmed Ali", email: "sara.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 0, score: "45/50", status: "Passed" },
  { id: 4, student: "Ali Ahmed Ali", email: "ali.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 4, score: "26/50", status: "Suspected", violationDetails: ["Tab Switch - Detected at 30 min", "Multiple Faces - Detected at 90 min", "Object Detection - Detected at 50 min", "Face Not Detected - Detected at 105 min"] },
  { id: 5, student: "Sara Ahmed Ali", email: "sara.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 0, score: "45/50", status: "Passed" },
  { id: 6, student: "Mai Ali Alaa", email: "mai.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 1, score: "35/50", status: "Suspected", violationDetails: ["Tab Switch - Detected at 45 min"] },
  { id: 7, student: "Ali Ahmed Ali", email: "ali.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 4, score: "26/50", status: "Suspected", violationDetails: ["Tab Switch - Detected at 30 min", "Multiple Faces - Detected at 90 min", "Object Detection - Detected at 50 min", "Face Not Detected - Detected at 105 min"] },
  { id: 8, student: "Sara Ahmed Ali", email: "sara.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 0, score: "45/50", status: "Passed" },
  { id: 9, student: "Alaa Ali Sami", email: "alaa.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 3, score: "30/50", status: "Suspected", violationDetails: ["Multiple Faces - Detected at 20 min", "Object Detection - Detected at 60 min", "Tab Switch - Detected at 80 min"] },
  { id: 10, student: "Sara Ahmed Ali", email: "sara.a@university.edu", exam: "Data Structures Final", date: "10/24/2025", violations: 0, score: "45/50", status: "Passed" },
];

const PAGE_SIZE = 10;

export default function ReportsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  const filtered = allReports.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.exam.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rc-wrap">
      {/* Header */}
      <div className="rc-header">
        <div>
          <h1 className="rc-title">Exam Reports</h1>
          <p className="rc-subtitle">View and analyze exam session and violations and Cheating reports</p>
        </div>
        <button className="rc-btn-export" onClick={() => exportToPDF(filtered)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export All Reports
        </button>
      </div>

      {/* Table Card */}
      <div className="rc-card">
        <h2 className="rc-section-title">Session Reports</h2>

        {/* Filters */}
        <div className="rc-filters">
          <div className="rc-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search by student name, email, or exam title..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="rc-select-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option>All Status</option>
              <option>Passed</option>
              <option>Suspected</option>
            </select>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        {/* Table */}
        <div className="rc-table-wrap">
          <table className="rc-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Exam</th>
                <th>Date</th>
                <th>Violations</th>
                <th>Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id}>
                  <td>{r.student}</td>
                  <td>{r.email}</td>
                  <td>{r.exam}</td>
                  <td>
                    <span className="rc-date">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {r.date}
                    </span>
                  </td>
                  <td>
                    {r.violations === 0 ? (
                      <span className="rc-violations rc-violations--none">0</span>
                    ) : (
                      <span className="rc-violations rc-violations--warn">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        {r.violations}
                      </span>
                    )}
                  </td>
                  <td>{r.score}</td>
                  <td>
                    <span className={`rc-status rc-status--${r.status.toLowerCase()}`}>{r.status}</span>
                  </td>
                  <td>
                    <button className="rc-btn-view" onClick={() => setSelectedReport(r)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="rc-pagination">
          <div className="rc-pagination__pages">
            <button className="rc-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹ Back</button>
            {[1, 2, 3, 4, 5, 6, 7].map((p) => (
              <button key={p} className={`rc-page-btn ${page === p ? "rc-page-btn--active" : ""}`} onClick={() => setPage(p)}>{p}</button>
            ))}
            <span className="rc-page-dots">...</span>
            <button className="rc-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next ›</button>
          </div>
          <div className="rc-pagination__go">
            <span>Page</span>
            <input type="number" value={page} onChange={(e) => setPage(Number(e.target.value))} min={1} />
            <button onClick={() => {}}>Go</button>
          </div>
          <span className="rc-pagination__total">110-120 of 1,250</span>
        </div>
      </div>

      {selectedReport && (
        <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </div>
  );
}