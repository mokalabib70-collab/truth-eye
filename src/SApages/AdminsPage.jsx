import { useState } from "react";
import "./AdminsPage.css";

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

const MOCK_ADMINS = [
  { id: 1, name: "Mona Said",    phone: "01052006892", nationalId: "60709024401563" },
];

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="adm-dropdown">
      <button type="button" className="adm-dropdown__btn" onClick={() => setOpen(!open)}>
        <span style={{ color: value ? "#1a1a1a" : "#bbb", flex: 1, textAlign: "left" }}>{value || ""}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="adm-dropdown__list">
          {options.map((o, i) => (
            <button key={i} type="button"
              className={`adm-dropdown__item ${value === o ? "adm-dropdown__item--active" : ""}`}
              onClick={() => { onChange(o); setOpen(false); }}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminsPage() {
  const [university, setUniversity] = useState("");
  const [faculty,    setFaculty]    = useState("");
  const [firstName,  setFirstName]  = useState("");
  const [lastName,   setLastName]   = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone,      setPhone]      = useState("");
  const [birthDay,   setBirthDay]   = useState("");
  const [admins,     setAdmins]     = useState(MOCK_ADMINS);

  const faculties = university ? (FACULTIES_MAP[university] || []) : [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    setAdmins([...admins, {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      phone,
      nationalId,
    }]);
    setFirstName(""); setLastName(""); setNationalId(""); setPhone(""); setBirthDay("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this admin?")) setAdmins(admins.filter((a) => a.id !== id));
  };

  return (
    <div className="adm-page">
      {/* ── Left: Form ── */}
      <div className="adm-form-card">
        <h1 className="adm-form-card__title">Admin (per faculty)</h1>

        <form className="adm-form" onSubmit={handleCreate}>
          <div className="adm-field">
            <label>Select University</label>
            <Dropdown value={university} onChange={(v) => { setUniversity(v); setFaculty(""); }} options={UNIVERSITIES} />
          </div>

          <div className="adm-field">
            <label>Select Faculty</label>
            <Dropdown value={faculty} onChange={setFaculty}
              options={faculties.length ? faculties : ["— Select University first —"]} />
          </div>

          <div className="adm-field">
            <label>First name</label>
            <input placeholder="l" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="adm-field">
            <label>Last name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="adm-field">
            <label>National ID</label>
            <input value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
          </div>

          <div className="adm-field">
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="adm-field">
            <label>Birth Day</label>
            <input type="date" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} />
          </div>

          <p className="adm-note">
            Note: SuperAdmin creates accounts; faculty admins can change their own passwords after login.
          </p>

          <button type="submit" className="adm-create-btn">Create Account</button>
        </form>
      </div>

      {/* ── Right: Existing admins ── */}
      <div className="adm-list-card">
        <h2 className="adm-list-card__title">Existing Admin Accounts</h2>
        <div className="adm-list">
          {admins.map((a) => (
            <div key={a.id} className="adm-item">
              <button className="adm-item__delete" onClick={() => handleDelete(a.id)}>Delete</button>
              <p className="adm-item__name">{a.name}</p>
              <p className="adm-item__label">Phone</p>
              <p className="adm-item__value">{a.phone}</p>
              <p className="adm-item__label">National ID</p>
              <p className="adm-item__value">{a.nationalId}</p>
            </div>
          ))}
          {admins.length === 0 && <p style={{ color: "#aaa", fontSize: 13 }}>No admins yet.</p>}
        </div>
      </div>
    </div>
  );
}