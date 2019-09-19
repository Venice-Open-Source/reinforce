import React, { Component, useState, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import * as actions from './constants/actions';
import Home from './containers/Home.jsx';
import Auth from './components/Auth.jsx';
import NavBar from './components/Navbar.jsx';
import SetContainer from './containers/SetContainer.jsx';
import Modal from './containers/Modal.jsx'
import Backdrop from './components/Backdrop.jsx';
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import CardContainer from './containers/CardContainer.jsx';
import StaticCircles from './components/StaticCircles.jsx';
import AnimatedSquares from './components/AnimatedSquares.jsx';

import './stylesheets/App.css';

const mapStateToProps = store => ({
  store: store.reinforce,
  isLoggedIn: store.reinforce.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  loginButtonHandler: user => {
    dispatch(actions.userLogin(user));
  },
  signupButtonHandler: user => {
    dispatch(actions.userSignup(user));
  }
});

const App = (props) => {
  console.log('props in APP', props);
  const [showModal, changeShowModal] = useState(false);
  const [showBackdrop, changeShowBackdrop] = useState(false);

  return (
    <div style={{ height: '100%' }}>
      <BrowserRouter>
        <Modal show={showModal} />
        {showModal && <Backdrop changeShowModal={changeShowModal} showModal={showModal} />}
        <>
          <NavBar changeShowModal={changeShowModal} showModal={showModal} isLoggedIn={props.isLoggedIn} />
          <main className="main-content">
            <Switch>
              <Redirect from='/' to='/login' exact />
              <Route path='/auth' component={Auth} />
              <Route path='/home' component={Home} />
              <Route path='/login' render={() => (<Login loginHandler={props.loginButtonHandler} />)} />
              <Route path='/signup' render={() => (<Signup signupHandler={props.signupButtonHandler} />)} />
              <Route path='/sets' component={SetContainer} />
              <Route path='/menu' component={Modal} />
              {/* <Route path='/cards' render={() => (<CardContainer props={props.store}/>)} /> */}
            </Switch>
            <StaticCircles />
            <AnimatedSquares />
          </main>
        </>
      </BrowserRouter>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
