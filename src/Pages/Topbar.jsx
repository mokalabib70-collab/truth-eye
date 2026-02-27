import React from 'react';
import "./Topbar.css";
import logoImg from "./Logo (2).png"; // اتأكدي من مسار اللوجو
import DP from "./dp.png"; // اتأكدي من مسار صورة الدكتور

export default function Topbar({onMenuClick}) {
  return (
<header className="dp-topbar">
  <div className="dp-topbar__left">
    <button className="dp-topbar__menu-btn" onClick={onMenuClick}>☰</button>
    <img src={logoImg} alt="Logo" className="dp-topbar__logo-full" />
  </div>
  
  <div className="dp-topbar__user">
    <div className="dp-topbar__avatar">
      <img src={DP} alt="User" />
    </div>
    <span className="dp-topbar__username">Dr. Ahmed</span>
  </div>
</header>
  );
}