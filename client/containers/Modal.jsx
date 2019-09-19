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
          <a href="/sets">My Sets</a>
        </li>
        <li>
          <a href="/setss">Create Set</a>
        </li>
      </ul>
    </nav>
  )
};

export default Modal;