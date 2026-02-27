import "./ReportDetailsModal.css";

export default function ReportDetailsModal({ report, onClose }) {
  const violationList = report.violationDetails || [];

  return (
    <div className="rdm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rdm-modal">
        {/* Header */}
        <div className="rdm-header">
          <div>
            <h2 className="rdm-title">Reports Details</h2>
            <p className="rdm-subtitle">{report.student} - {report.exam}</p>
          </div>
          <button className="rdm-close" onClick={onClose}>✕</button>
        </div>

        {/* Info Grid */}
        <div className="rdm-grid">
          <div className="rdm-info-block">
            <p className="rdm-info-label">Student</p>
            <p className="rdm-info-value">{report.student}</p>
            <p className="rdm-info-sub">{report.email}</p>
          </div>
          <div className="rdm-info-block">
            <p className="rdm-info-label">Exam</p>
            <p className="rdm-info-value">{report.exam}</p>
            <p className="rdm-info-sub">120 min</p>
          </div>
          <div className="rdm-info-block">
            <p className="rdm-info-label">Date</p>
            <p className="rdm-info-value">{report.date}</p>
          </div>
          <div className="rdm-info-block">
            <p className="rdm-info-label">Score</p>
            <p className="rdm-info-value">{report.score}</p>
          </div>
        </div>

        {/* Violations */}
        <div className="rdm-violations-section">
          <h3 className="rdm-violations-title">Violations ({violationList.length})</h3>
          {violationList.length === 0 ? (
            <div className="rdm-violation-card rdm-violation-card--none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>No violation detection</span>
            </div>
          ) : (
            <div className="rdm-violations-list">
              {violationList.map((v, i) => {
                const [type, time] = v.split(" - ");
                return (
                  <div key={i} className="rdm-violation-card rdm-violation-card--warn">
                    <div className="rdm-violation-card__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div>
                      <p className="rdm-violation-type">{type}</p>
                      <p className="rdm-violation-time">{time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Download Button */}
        <button className="rdm-btn-download">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Report
        </button>
      </div>
    </div>
  );
}