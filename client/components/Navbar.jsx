import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import '../stylesheets/NavBar.css';

function Navbar() {
  return (
    <header className="main-nav">
      <div className="main-nav_logo">
        <h1>re.in.force</h1>
      </div>
      <nav className="main-nav_items">
        <ul>
          <li>
            <NavLink to="/sets">Sets</NavLink>
          </li>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Auth</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
