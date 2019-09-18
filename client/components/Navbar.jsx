import React, { Component, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';

import '../stylesheets/NavBar.css';

function Navbar(props) {

  return (
    <header className="main-nav">
      <div className="main-nav_logo">
        <h1>Reinforce</h1>
      </div>
      <nav className="main-nav_items">
        <ul>
          <li>
            <NavLink to="/sets">Sets</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Auth</NavLink>
          </li>
          <li>
            {/* <NavLink to="/menu">Menu</NavLink> */}
            <FontAwesomeIcon icon={faBars} className="fa-burger" onClick={() => props.changeShowModal(!props.showModal)}/>
          </li>
        </ul>
      </nav>
      {/* <SlidingPane
        ariaHideApp={false}
        className="pane-modal"
        closeIcon={<div>Some div containing custom close icon.</div>}
        isOpen={ showModal }
        title='Hey, it is optional pane title. I can be React component too.'
        from='right'
        width='400px'
        onRequestClose={ () => changeShowModal(!showModal)}>
        <div>And I am pane content on left.</div>
      </SlidingPane> */}
    </header>
  );
}

export default Navbar;
