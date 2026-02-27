import { useState } from "react";
import "./AiSettingsPage.css";

const UNIVERSITIES = [
  "Alexandria University",
  "Beni suef University",
  "Cairo University",
  "Fayoum University",
  "Ain Shams University",
];

const FACULTIES_MAP = {
  "Alexandria University": ["Faculty of Engineering", "Faculty of science", "Faculty of Law"],
  "Beni suef University":  ["Faculty of computer and AI", "Faculty of Medicine"],
  "Cairo University":      ["Faculty of Law", "Faculty of Engineering"],
  "Fayoum University":     ["Faculty of pharmacy"],
  "Ain Shams University":  ["Faculty of Medicine", "Faculty of science"],
};

const MODULES = [
  "Face Recognition",
  "Liveness Detection",
  "Multiple Faces Detection",
  "Eye Tracking & Head Pose",
  "Audio Classification",
];

function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ai-dropdown">
      <button type="button" className="ai-dropdown__btn" onClick={() => setOpen(!open)}>
        <span style={{ color: value ? "#1a1a1a" : "#bbb", flex: 1, textAlign: "left" }}>
          {value || placeholder || ""}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="ai-dropdown__list">
          {options.map((o, i) => (
            <button key={i} type="button"
              className={`ai-dropdown__item ${value === o ? "ai-dropdown__item--active" : ""}`}
              onClick={() => { onChange(o); setOpen(false); }}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button type="button" className={`ai-toggle ${on ? "ai-toggle--on" : "ai-toggle--off"}`} onClick={onToggle}>
      <span className="ai-toggle__label">{on ? "ON" : "OFF"}</span>
      <span className="ai-toggle__knob" />
    </button>
  );
}

export default function AISettingsPage() {
  const [university, setUniversity] = useState("");
  const [faculty,    setFaculty]    = useState("");
  const [modules,    setModules]    = useState(
    Object.fromEntries(MODULES.map((m) => [m, true]))
  );
  const [saved, setSaved] = useState(false);

  const handleUniChange = (val) => { setUniversity(val); setFaculty(""); };

  const faculties = university ? (FACULTIES_MAP[university] || []) : [];

  const toggleModule = (m) => setModules((prev) => ({ ...prev, [m]: !prev[m] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="ai-page">
      <div className="ai-card">
        {/* Title */}
        <div className="ai-header">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <div>
            <h1 className="ai-header__title">AI Detection Settings</h1>
            <p className="ai-header__sub">Enable / Disable Detection Modules</p>
          </div>
        </div>

        {/* Select University */}
        <div className="ai-section">
          <h2 className="ai-section__label">Select University</h2>
          <Dropdown value={university} onChange={handleUniChange} options={UNIVERSITIES} />
        </div>

        {/* Select Faculty */}
        <div className="ai-section">
          <h2 className="ai-section__label">Select Faculty</h2>
          <Dropdown value={faculty} onChange={setFaculty}
            options={faculties.length ? faculties : ["— Select University first —"]} />
        </div>

        {/* Modules */}
        <div className="ai-modules">
          {MODULES.map((m) => (
            <div key={m} className="ai-module-row">
              <span className="ai-module-row__name">{m}</span>
              <Toggle on={modules[m]} onToggle={() => toggleModule(m)} />
            </div>
          ))}
        </div>

        {/* Save */}
        <button className={`ai-save-btn ${saved ? "ai-save-btn--saved" : ""}`} onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save AI Settings"}
        </button>
      </div>
    </div>
  );
}