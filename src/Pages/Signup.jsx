import { useState } from "react";
import "./Signup.css";
import logoImg from "./Logo (2).png";
import IdentityVerification from "./IdentityVerification";

const steps = [
  { label: "STEP 1", desc: "Lorem ipsum dolor sit amet, consectetur." },
  { label: "STEP 2", desc: "Lorem ipsum dolor sit amet, consectetur." },
  { label: "STEP 3", desc: "Lorem ipsum dolor sit amet, consectetur." },
  { label: "STEP 4", desc: "Lorem ipsum dolor sit amet, consectetur." },
  { label: "FINAL STEP", desc: "Lorem ipsum dolor sit amet, consectetur." },
];

const passwordRules = [
  { label: "Use 8 or more characters", test: (p) => p.length >= 8 },
  { label: "One lowercase character",  test: (p) => /[a-z]/.test(p) },
  { label: "One special character",    test: (p) => /[^a-zA-Z0-9]/.test(p) },
  { label: "One number",               test: (p) => /[0-9]/.test(p) },
  { label: "One Uppercase character",  test: (p) => /[A-Z]/.test(p) },
];

export default function SignUp({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree]         = useState(true);

  const activeStep = step === 1 ? 2 : 4;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerified = () => {
    if (onNavigate) onNavigate("Dashboard");
  };

  return (
    <div className="signup-page">
      <header className="signup-topbar">
        <img src={logoImg} alt="TruthEye" className="signup-topbar__logo" />
        <div className="signup-topbar__right">
          <span>Already a Member?</span>
          <button className="signup-topbar__login" onClick={() => onNavigate && onNavigate("Login")}>
            Log In
          </button>
        </div>
      </header>

      <div className="signup-bg-triangle" />

      <div className="signup-content">
        {step === 1 ? (
          <div className="signup-card">
            <h1 className="signup-card__welcome">
              Welcome to <span className="signup-card__brand-dark">Truth</span><span className="signup-card__brand-gold">Eye</span>! Please log in or create a new account.
            </h1>
            <h2 className="signup-card__trial">Start Your 14-Day Free Trial Today.</h2>
            <p className="signup-card__nocredit">NO CREDIT CARD REQUIRED!</p>

            <form className="signup-form" onSubmit={handleSubmit}>
              <input className="signup-input" type="text" placeholder="Enter your first name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className="signup-input" type="text" placeholder="Enter your last name"
                value={lastName} onChange={(e) => setLastName(e.target.value)} />

              <div className="signup-phone">
                <div className="signup-phone__flag">
                  <span>🇪🇬</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <span className="signup-phone__code">+20</span>
                <input className="signup-phone__input" type="tel" placeholder="Phone number"
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <input className="signup-input" type="email" placeholder="Enter your university email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <div className="signup-password-wrap">
                <input
                  className="signup-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="signup-password__toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="signup-rules">
                {passwordRules.map((rule, i) => (
                  <span key={i} className={`signup-rule ${rule.test(password) ? "signup-rule--ok" : ""}`}>
                    • {rule.label}
                  </span>
                ))}
              </div>

              <label className="signup-checkbox">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span className="signup-checkbox__box">
                  {agree && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </span>
                <span>I want to receive emails about the product, feature updates, events, and marketing promotions.</span>
              </label>
<p className="signup-terms">
  By Creating an Account, It means you agree to our 
  <button className="signup-link" type="button" onClick={() => onNavigate("PrivacyPolicy")}>
    Privacy Policy
  </button> 
  and 
  <button className="signup-link" type="button" onClick={() => onNavigate("TermsOfService")}>
    Terms of Service
  </button>
</p>

              <button type="submit" className="signup-btn-submit">Sign Up</button>
            </form>
          </div>
        ) : (
          <IdentityVerification onDone={handleVerified} />
        )}

        <div className="signup-steps">
          {steps.map((s, i) => {
            const done   = i + 1 < activeStep;
            const active = i + 1 === activeStep;
            return (
              <div key={i} className="signup-step">
                <div className="signup-step__left">
                  <div className={`signup-step__circle ${done ? "signup-step__circle--done" : active ? "signup-step__circle--active" : ""}`}>
                    {done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : active ? (
                      <div className="signup-step__dot" />
                    ) : null}
                  </div>
                  {i < steps.length - 1 && <div className="signup-step__line" />}
                </div>
                <div className="signup-step__text">
                  <p className="signup-step__label">{s.label}</p>
                  <p className="signup-step__desc">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}