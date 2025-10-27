import React from 'react';
import './CustomLoginIllustration.css';
const CustomLoginIllustration = () => {
  return (
    <div className="login-illustration">
      <div className="starbucks-cup">
        <div className="cup-body">
          <div className="cup-top"></div>
          <div className="cup-middle"></div>
          <div className="cup-bottom"></div>
          <div className="cup-handle"></div>
        </div>
        <div className="cup-shadow"></div>
      </div>
      <div className="starbucks-logo">
        <div className="logo-circle">
          <div className="logo-starbucks"></div>
        </div>
      </div>
      <div className="coffee-splash">
        <div className="splash-dot"></div>
        <div className="splash-dot"></div>
        <div className="splash-dot"></div>
      </div>
      <div className="coffee-steam">
        <div className="steam-dot"></div>
        <div className="steam-dot"></div>
        <div className="steam-dot"></div>
      </div>
    </div>
  );
};
export default CustomLoginIllustration;
