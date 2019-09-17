import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Home from './containers/Home.jsx';

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
    <div>
      <Home/>
    </div>
  );
};

export default App;
