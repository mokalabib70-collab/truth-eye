import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import "./DoctorProfile.css";
import DP from "./dp.png";

export default function DoctorProfile({onNavigate}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dp-layout-container"> {/* تأكدي إن السطر ده موجود عشان يشيل المحتوى */}
      <main className="dp-content">
        <div className="dp-page-header">
          <h1 className="dp-page-title">My Profile</h1>
          <button
           className="dp-btn-logout"
            onClick={() => onNavigate && onNavigate("Login")}>
              Log Out
              </button>
        </div>

        <div className="dp-info-card">
          {/* Profile Header Section */}
          <div className="dp-profile-card">
            <div className="dp-profile-card__avatar">
              <img src={DP} alt="Dr. Ahmed Kareem" />
            </div>
            <div className="dp-profile-card__info">
              <h2 className="dp-profile-card__name">Dr. Ahmed Kareem</h2>
              <p className="dp-profile-card__role">Professor</p>
              <p className="dp-profile-card__dept">Artificial Intelligence</p>
              <p className="dp-profile-card__meta"><strong>Employee ID:</strong> EMP-2018CS-0042</p>
              <p className="dp-profile-card__meta">Joined: September 2018</p>
            </div>
          </div>

          {/* 1. Personal Info */}
          <section className="dp-section">
            <h3 className="dp-section__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Personal Info
            </h3>
            <div className="dp-section__divider" />
            <div className="dp-form-grid col-3">
              <div className="dp-field">
                <label>First Name</label>
                <input type="text" defaultValue="Mohammad" />
              </div>
              <div className="dp-field">
                <label>Last Name</label>
                <input type="text" defaultValue="Ahmed" />
              </div>
              <div className="dp-field">
                <label>Date of Birth</label>
                <input type="date" defaultValue="1980-09-08" />
              </div>
            </div>
          </section>

          {/* 2. Academic Details */}
          <section className="dp-section">
            <h3 className="dp-section__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              Academic Details
            </h3>
            <div className="dp-section__divider" />
            <div className="dp-form-grid col-2">
              <div className="dp-field">
                <label>Department</label>
                <input type="text" defaultValue="Computer Science" />
              </div>
              <div className="dp-field">
                <label>Academic Rank</label>
                <input type="text" defaultValue="Ph.D. in Computer Science" />
              </div>
            </div>
            <div className="dp-form-grid col-2" style={{ marginTop: '20px' }}>
              <div className="dp-field">
                <label>University</label>
                <input type="text" defaultValue="Beni-Suef University" />
              </div>
            </div>
          </section>

          {/* 3. Contact Info */}
          <section className="dp-section">
            <h3 className="dp-section__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 8h.01M12 8h.01M7 12h10M7 16h6"/>
              </svg>
              Contact Info
            </h3>
            <div className="dp-section__divider" />
            <div className="dp-form-grid col-2">
              <div className="dp-field">
                <label>Primary Email</label>
                <input type="email" defaultValue="ahmedmohammad@university.edu" />
              </div>
              <div className="dp-field">
                <label>Office Location</label>
                <input type="text" defaultValue="Building A, Room 301" />
              </div>
            </div>
            <div className="dp-form-grid col-2" style={{ marginTop: '20px' }}>
              <div className="dp-field">
                <label>Phone Number</label>
                <input type="text" defaultValue="+20 112 124 0126" />
              </div>
              <div className="dp-field">
                <label>Office Hours</label>
                <input type="text" defaultValue="Monday & Wednesday, 2:00 PM - 4:00 PM" />
              </div>
            </div>
          </section>

          {/* 4. Security Settings */}
          <section className="dp-section">
            <h3 className="dp-section__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Security Settings
            </h3>
            <div className="dp-section__divider" />
            <div className="dp-form-grid col-2">
              <div className="dp-field">
                <label>Change Password</label>
                <button className="dp-btn-update-password" onClick={() => setShowModal(true)}>
                  Update Password
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {showModal && <ChangePasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
}