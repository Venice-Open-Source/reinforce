import React, { Component } from "react";
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

// import css
import '../stylesheets/Home.css';

const Home = (props) => {
  console.log('props in Home component', props.props);
  return (
    <div id="Home-container" className="Home">
      <div className="home-div">
        sets
      </div>
    </div>
  )
}

export default Home;