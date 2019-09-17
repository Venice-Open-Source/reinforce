import React, { Component } from "react";

import '../stylesheets/Footer.css';

const Footer = () => {
  const footers = ['footerEl1', 'footerEl2', 'footerEl3'];
  const footerElements = footers.map(el => {
    return (
      <div className='footer-elements'>{el}</div>
    )
  })

  return (
    <footer className="Footer-div">
      {footerElements}
    </footer>
  )
}

export default Footer;