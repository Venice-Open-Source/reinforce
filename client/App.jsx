import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

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
      <button className="hello" onClick={() => setHello("goodbye")}>
        goodbye
      </button>
      <div>{hello}</div>
    </div>
  );
};

export default App;
