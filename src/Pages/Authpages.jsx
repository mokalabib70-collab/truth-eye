import { useState, useRef } from "react";
import "./Authpages.css";
import logoImg from "./Logo (2).png";
import aiLogoImg from "./logo.png"; // will use same logo as placeholder for AI icon

// ── Shared Layout Wrapper ────────────────────────────────────────────────────
function AuthLayout({ children, onNavigate }) {
  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <img src={logoImg} alt="TruthEye" className="auth-topbar__logo" />
        <div className="auth-topbar__right">
          <span>No Account yet?</span>
          <button className="auth-topbar__btn" onClick={() => onNavigate("Signup")}>Sign Up</button>
        </div>
      </header>

      <div className="auth-bg-triangle" />

      <div className="auth-content">
        <div className="auth-card">{children}</div>
        <div className="auth-icon-wrap">
          <img src={aiLogoImg} alt="AI" className="auth-ai-icon" />
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginPage({ onNavigate }) {
  const [email, setEmail]       = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

 const handleSubmit = (e) => {
    e.preventDefault();
    // لو الـ email بتاع Super Admin → روح Admin Panel
    if (email === "admin@trutheye.com") {
      onNavigate("AdminPanel");
    } else {
      onNavigate("Dashboard");
    }
  };

  return (
    <AuthLayout onNavigate={onNavigate}>
      <h1 className="auth-card__title">
        Welcome to <span className="auth-dark">Turth</span><span className="auth-gold">Eye</span>!<br />
        Log in into your account
      </h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="email" placeholder="Enter your university email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="auth-input" type="text" placeholder="Enter your student ID"
          value={studentId} onChange={(e) => setStudentId(e.target.value)} />

        <div className="auth-password-wrap">
          <input className="auth-input" type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(!showPass)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
              {showPass
                ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
              }
            </svg>
          </button>
        </div>

        <div className="auth-row">
          <label className="auth-checkbox">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span className="auth-checkbox__box">
              {remember && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
            </span>
            <span>Remember Me</span>
          </label>
          <button type="button" className="auth-link" onClick={() => onNavigate("ResetPassword")}>
            Forgot Password?
          </button>
        </div>
 <p className="auth-terms">
  By Creating an Account, It means you agree to our 
  <button 
    type="button" 
    className="auth-link" 
    onClick={() => onNavigate("PrivacyPolicy")}
  >
    Privacy Policy
  </button> 
  and 
  <button 
    type="button" 
    className="auth-link" 
    onClick={() => onNavigate("TermsOfService")}
  >
    Terms of Service
  </button>
</p>
        <button type="submit" className="auth-btn">Log in</button>
      </form>
    </AuthLayout>
  );
}

// ── RESET PASSWORD ───────────────────────────────────────────────────────────
export function ResetPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate("VerifyCode");
  };

  return (
    <AuthLayout onNavigate={onNavigate}>
      <h1 className="auth-card__title">Reset Password</h1>
      <p className="auth-card__sub">Type your authorised email to receive reset password link.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="email" placeholder="Enter your university email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="auth-btn">Send Reset Password Link</button>
      </form>
    </AuthLayout>
  );
}

// ── VERIFY CODE ──────────────────────────────────────────────────────────────
export function VerifyCodePage({ onNavigate }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate("CreatePassword");
  };

  return (
    <AuthLayout onNavigate={onNavigate}>
      <h1 className="auth-card__title">Verify Your Code</h1>
      <p className="auth-card__sub">
        Enter the passcode you just received on your email address ending with ********in@gmail.com
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-otp">
          {otp.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => (inputs.current[idx] = el)}
              className={`auth-otp__box ${val ? "auth-otp__box--filled" : ""}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            />
          ))}
        </div>
        <button type="submit" className="auth-btn">Verify</button>
      </form>
    </AuthLayout>
  );
}

// ── CREATE NEW PASSWORD ──────────────────────────────────────────────────────
export function CreatePasswordPage({ onNavigate }) {
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate("Login");
  };

  const EyeIcon = ({ show, toggle }) => (
    <button type="button" className="auth-pass-toggle" onClick={toggle}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
        {show
          ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
          : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
        }
      </svg>
    </button>
  );

  return (
    <AuthLayout onNavigate={onNavigate}>
      <h1 className="auth-card__title">Create New Password</h1>
      <p className="auth-card__sub">
        Type your new strong password. Your password must include: One capital letter & one small letter at least, One special character & Minimum 8 digits long.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-password-wrap">
          <input className="auth-input" type={showPass ? "text" : "password"}
            placeholder="Enter password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <EyeIcon show={showPass} toggle={() => setShowPass(!showPass)} />
        </div>
        <div className="auth-password-wrap">
          <input className="auth-input" type={showConf ? "text" : "password"}
            placeholder="Confirm password" value={confirm}
            onChange={(e) => setConfirm(e.target.value)} />
          <EyeIcon show={showConf} toggle={() => setShowConf(!showConf)} />
        </div>
        <button type="submit" className="auth-btn">Confirm Changes</button>
      </form>
    </AuthLayout>
  );
}