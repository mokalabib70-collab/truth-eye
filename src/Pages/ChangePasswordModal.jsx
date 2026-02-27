import { useState } from "react";
import "./ChangePasswordModal.css";

export default function ChangePasswordModal({ onClose }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const generateStrongPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 14; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
    setConfirmPassword(password);
  };

  const EyeIcon = ({ visible }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {visible ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      )}
    </svg>
  );

  return (
    <div className="cpm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cpm-modal">
        <div className="cpm-header">
          <h2 className="cpm-title">Change Password</h2>
          <button className="cpm-close" onClick={onClose}>✕</button>
        </div>

        <div className="cpm-fields">
          <div className="cpm-input-wrap">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button className="cpm-eye" onClick={() => setShowOld(!showOld)}>
              <EyeIcon visible={showOld} />
            </button>
          </div>

          <div className="cpm-input-wrap">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="cpm-eye" onClick={() => setShowNew(!showNew)}>
              <EyeIcon visible={showNew} />
            </button>
          </div>

          <div className="cpm-input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="cpm-eye" onClick={() => setShowConfirm(!showConfirm)}>
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
        </div>

        <div className="cpm-actions">
          <button className="cpm-btn-suggest" onClick={generateStrongPassword}>
            Suggest Strong Password
          </button>
          <button className="cpm-btn-update">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}