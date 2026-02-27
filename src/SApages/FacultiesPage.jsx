import { useState } from "react";
import "./UniversitiesPage.css"; // reuse same styles

const UNIVERSITIES = [
  "Alexandria University",
  "Beni suef University",
  "Cairo University",
  "Fayoum University",
  "Ain Shams University",
];

const MOCK = [
  { id: "87525992",  name: "Faculty of Engineering",       university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "85692792",  name: "Faculty of computer and AI",   university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "97625992",  name: "Faculty of science",           university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "35325992",  name: "Faculty of Law",               university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "75365992",  name: "Faculty of Medicine",          university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "143682792", name: "Faculty of pharmacy",          university: "Fayoum University",     createdAt: "12/17/2025" },
  { id: "87525993",  name: "Faculty of Engineering",       university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "85692793",  name: "Faculty of computer and AI",   university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "97625993",  name: "Faculty of science",           university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "35325993",  name: "Faculty of Law",               university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "75365993",  name: "Faculty of Medicine",          university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "143682793", name: "Faculty of pharmacy",          university: "Fayoum University",     createdAt: "12/17/2025" },
  { id: "87525994",  name: "Faculty of Engineering",       university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "85692794",  name: "Faculty of computer and AI",   university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "97625994",  name: "Faculty of science",           university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "35325994",  name: "Faculty of Law",               university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "75365994",  name: "Faculty of Medicine",          university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "143682794", name: "Faculty of pharmacy",          university: "Fayoum University",     createdAt: "12/17/2025" },
  { id: "75365995",  name: "Faculty of Medicine",          university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "75365996",  name: "Faculty of Medicine",          university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "75365997",  name: "Faculty of Medicine",          university: "Beni suef University",  createdAt: "12/17/2025" },
];

const PER_PAGE = 10;

// ── University Dropdown ──────────────────────────────────────────────────────
function UniDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="uni-dropdown" style={{ position: "relative" }}>
      <button
        type="button"
        className="uni-dropdown__btn"
        onClick={() => setOpen(!open)}
      >
        <span style={{ color: value ? "#1a1a1a" : "#bbb", flex: 1, textAlign: "left" }}>
          {value || ""}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="uni-dropdown__list">
          {UNIVERSITIES.map((u, i) => (
            <button
              key={i}
              type="button"
              className={`uni-dropdown__item ${value === u ? "uni-dropdown__item--active" : ""}`}
              onClick={() => { onChange(u); setOpen(false); }}
            >
              {u}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function FacultyModal({ mode, faculty, onSave, onClose }) {
  const [name,       setName]       = useState(faculty?.name       || "");
  const [university, setUniversity] = useState(faculty?.university || "");
  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, university });
  };

  return (
    <div className="uni-modal-overlay" onClick={onClose}>
      <div className="uni-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className={`uni-modal__title ${isEdit ? "uni-modal__title--edit" : ""}`}>
          {isEdit ? "Edit Faculty" : "Faculty University"}
        </h2>

        <form className="uni-modal__form" onSubmit={handleSubmit}>
          <div className="uni-modal__grid">
            <div className="uni-modal__field">
              <label>Faculty name</label>
              <input placeholder="l" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="uni-modal__field">
              <label>Select University</label>
              <UniDropdown value={university} onChange={setUniversity} />
            </div>
          </div>

          <div className="uni-modal__actions">
            <button type="submit" className="uni-btn uni-btn--create">
              {isEdit ? "Save Edit" : "Create"}
            </button>
            <button type="button" className="uni-btn uni-btn--cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function FacultiesPage() {
  const [data,  setData]  = useState(MOCK);
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [modal,  setModal]  = useState(null);

  const filtered = data.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.university.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (values) => {
    if (modal.mode === "create") {
      setData([{ id: Date.now().toString(), ...values, createdAt: new Date().toLocaleDateString() }, ...data]);
    } else {
      setData(data.map((f) => f.id === modal.faculty.id ? { ...f, ...values } : f));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this faculty?")) setData(data.filter((f) => f.id !== id));
  };

  return (
    <div className="uni-page">
      {/* Header */}
      <div className="uni-header">
        <h1 className="uni-header__title">Faculties</h1>
        <button className="uni-btn-create" onClick={() => setModal({ mode: "create" })}>
          Create Faculty
        </button>
      </div>

      {/* Search */}
      <div className="uni-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          placeholder="Search by University name, City or Country"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Table */}
      <div className="uni-table-wrap">
        <table className="uni-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Faculty</th>
              <th>University</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.name}</td>
                <td>{f.university}</td>
                <td>{f.createdAt}</td>
                <td>
                  <div className="uni-actions">
                    <button className="uni-action-btn uni-action-btn--edit"
                      onClick={() => setModal({ mode: "edit", faculty: f })}>Edit</button>
                    <button className="uni-action-btn uni-action-btn--delete"
                      onClick={() => handleDelete(f.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="uni-pagination">
        <button className="uni-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={`uni-page-btn ${page === i + 1 ? "uni-page-btn--active" : ""}`}
            onClick={() => setPage(i + 1)}>{i + 1}</button>
        ))}
        <button className="uni-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <FacultyModal
          mode={modal.mode}
          faculty={modal.faculty}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}