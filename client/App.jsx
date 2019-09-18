import React, { Component, useState, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from './containers/Home.jsx';
import Auth from './components/Auth.jsx';
import NavBar from './components/Navbar.jsx';
import SetContainer from './containers/SetContainer.jsx';
import Modal from './containers/Modal.jsx'
import Backdrop from './components/Backdrop.jsx';

import './stylesheets/App.css';

const mapStateToProps = store => ({
  store: store.reinforce,
  isLoggedIn: store.reinforce.isLoggedIn
});

const mapDispatchToProps = dispatch => ({

});

const App = (props) => {
  const [showModal, changeShowModal] = useState(false);
  const [showBackdrop, changeShowBackdrop] = useState(false);

  return (
    <div style={{height: '100%'}}>
      <BrowserRouter>
        <Modal show={showModal}/>
       { showModal &&  <Backdrop changeShowModal={changeShowModal} showModal={showModal}/> }
        <>
          <NavBar changeShowModal={changeShowModal} showModal={showModal} isLoggedIn={props.isLoggedIn}/>
          <main className="main-content">
          <Switch>
            <Redirect from='/' to='/auth' exact />
            <Route path='/auth' component={Auth} />
            <Route path='/home' component={Home} />
            <Route path='/sets' component={SetContainer} />
            <Route path='/menu' component={Modal} />
          </Switch>
          </main>
        </>
      </BrowserRouter>
    </div>  
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
