import React from "react";
import logoImg from "../../image/logo.png";
import "../../style/header.css";
function Header() {
  return (
    <div className="headerbar">
      <header>
        <img src={logoImg} alt="logo" />
        <nav>
          <ul>
            <li className="active">Home</li>
            <li>Why us?</li>
            <li>Scrap Rates</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
