import React, { Component, useState, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from './containers/Home.jsx';
import Auth from './components/Auth.jsx';
import NavBar from './components/Navbar.jsx';
import SetContainer from './containers/SetContainer.jsx';
import Modal from './containers/Modal.jsx'
import StaticCircles from './components/StaticCircles.jsx';
import AnimatedSquares from './components/AnimatedSquares.jsx';

import './stylesheets/App.css';
const mapStateToProps = store => ({
  user: {
    userId: store.colleague.user.userId,
    userName: store.colleague.user.userName,
    userScores: store.colleague.user.userScores
  },
  set: store.set,
  cards: [...store.cards]
});

const App = () => {
  const [hello, setHello] = useState("hello");

  return (
    <BrowserRouter>
      <Fragment>
        <NavBar/>
        <main className="main-content">
        <Switch>
          <Redirect from='/' to='/auth' exact />
          <Route path='/auth' component={Auth} />
          <Route path='/home' component={Home} />
          <Route path='/sets' component={SetContainer} />
          <Route path='/menu' component={Modal} />
        </Switch>                 
        <StaticCircles />
        <AnimatedSquares />
        </main>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
