import React, { Component } from "react";

import '../stylesheets/Modal.css';

const Modal = (props) => {
  let modalClasses = "modal-pane";
  
  if (props.show) {
    modalClasses = "modal-pane open";
  }

  return (
    <nav className={modalClasses}>
      <ul>
        <li>
          <a href="/">My Sets</a>
        </li>
        <li>
          <a href="/">Create Set</a>
        </li>
      </ul>
    </nav>
  )
};

export default Modal;