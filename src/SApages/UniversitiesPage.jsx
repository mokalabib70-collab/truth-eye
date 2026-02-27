import { useState } from "react";
import "./UniversitiesPage.css";

const MOCK = [
  { id: "1763387525992", name: "Alexandria University",  location: "Alexandria", city: "Alexandria", country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1863389525992", name: "Beni suef University",   location: "Beni suef",  city: "Beni suef",  country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "3363387525992", name: "Cairo University",       location: "Giza",       city: "Giza",       country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "2763387525992", name: "Fayoum University",      location: "Fayoum",     city: "Fayoum",     country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1763387525993", name: "Ain Shams University",   location: "Cairo",      city: "Cairo",      country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1863389525993", name: "Beni suef University",   location: "Beni suef",  city: "Beni suef",  country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "3363387525993", name: "Cairo University",       location: "Giza",       city: "Giza",       country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "2763387525993", name: "Fayoum University",      location: "Fayoum",     city: "Fayoum",     country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1763387525994", name: "Alexandria University",  location: "Alexandria", city: "Alexandria", country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1863389525994", name: "Beni suef University",   location: "Beni suef",  city: "Beni suef",  country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "3363387525994", name: "Cairo University",       location: "Giza",       city: "Giza",       country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "2763387525994", name: "Fayoum University",      location: "Fayoum",     city: "Fayoum",     country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
];

const PER_PAGE = 10;

function UniversityModal({ mode, uni, onSave, onClose }) {
  const [name,     setName]     = useState(uni?.name     || "");
  const [location, setLocation] = useState(uni?.location || "");
  const [city,     setCity]     = useState(uni?.city     || "");
  const [country,  setCountry]  = useState(uni?.country  || "");

  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, location, city, country });
  };

  return (
    <div className="uni-modal-overlay" onClick={onClose}>
      <div className="uni-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className={`uni-modal__title ${isEdit ? "uni-modal__title--edit" : ""}`}>
          {isEdit ? "Edit University" : "Create University"}
        </h2>

        <form className="uni-modal__form" onSubmit={handleSubmit}>
          <div className="uni-modal__grid">
            <div className="uni-modal__field">
              <label>University name</label>
              <input placeholder="l" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="uni-modal__field">
              <label>Location</label>
              <input placeholder="" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="uni-modal__field">
              <label>City</label>
              <input placeholder="" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="uni-modal__field">
              <label>Country</label>
              <input placeholder="" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
          </div>

          <div className="uni-modal__actions">
            <button type="submit" className="uni-btn uni-btn--create">
              {isEdit ? "Save Edits" : "Create"}
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

export default function UniversitiesPage() {
  const [data,       setData]       = useState(MOCK);
  const [search,     setSearch]     = useState("");
  const [page,       setPage]       = useState(1);
  const [modal,      setModal]      = useState(null); // null | { mode: "create"|"edit", uni?: {} }

  const filtered = data.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.city.toLowerCase().includes(search.toLowerCase()) ||
    u.country.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (values) => {
    if (modal.mode === "create") {
      setData([{ id: Date.now().toString(), ...values, faculties: 0, createdAt: new Date().toLocaleDateString() }, ...data]);
    } else {
      setData(data.map((u) => u.id === modal.uni.id ? { ...u, ...values } : u));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this university?")) setData(data.filter((u) => u.id !== id));
  };

  return (
    <div className="uni-page">
      {/* Header */}
      <div className="uni-header">
        <h1 className="uni-header__title">Universities</h1>
        <button className="uni-btn-create" onClick={() => setModal({ mode: "create" })}>
          Create University
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
              <th>University</th>
              <th>Location</th>
              <th>City</th>
              <th>Country</th>
              <th>Faculties</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.location}</td>
                <td>{u.city}</td>
                <td>{u.country}</td>
                <td>{u.faculties}</td>
                <td>{u.createdAt}</td>
                <td>
                  <div className="uni-actions">
                    <button className="uni-action-btn uni-action-btn--edit"
                      onClick={() => setModal({ mode: "edit", uni: u })}>Edit</button>
                    <button className="uni-action-btn uni-action-btn--delete"
                      onClick={() => handleDelete(u.id)}>Delete</button>
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
        <UniversityModal
          mode={modal.mode}
          uni={modal.uni}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}