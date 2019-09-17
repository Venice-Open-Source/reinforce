import React, { Component } from "react";

function Navbar() {
  return (
    <div id="navbar">
      <p>ReinForce</p>
      <div id="rightnav">
        <NavLink id="navbarupload" to="/Sets">
          Make Set
        </NavLink>
      </div>
      <Modal />
    </div>
  );
}

export default Navbar;
