import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../constants/actions';
import Set from './Sets.jsx';
import CardContainer from './CardContainer.jsx';


import '../stylesheets/SetContainer.css';


const mapStateToProps = store => ({
  store: store.reinforce
});

const mapDispatchToProps = dispatch => ({
  updateSetName: e => {
    dispatch(actions.updateSetName(e.target.value));
  },
  addSet: e => {
    console.log(
      "event target value in addSet method in setContainer:",
      e.target.value
    );
    e.preventDefault();
    dispatch(actions.addSetAction());
  },
  addCard: (card) => {
    dispatch(actions.addCard(card));
  }
});

const SetContainer = props => {
  const [showCards, changeShowCards] = useState({
    setid: 0,
    show: false
  });
   
  let showTHIS;


  console.log("store sets in setContainer", props.store.sets);
  const setsArray = props.store.sets.map((e, i) => {
    return <Set sets={props.store.sets} key={i} id={i} setName={e.setname} addCard={props.addCard} showCards={showCards} changeShowCards={changeShowCards}></Set>
  });

  if (showCards.show) {
    showTHIS = <CardContainer setid={showCards.setid} sets={props.store.sets} />;
  } else {
    showTHIS = setsArray;
  }

  console.log("store inside SetContainer", props.store);
  return (
    <div>
      <form className="sets-form">
        <div className="form-control">
          <label htmlFor="setName">Set Name</label>
          <input
            type="text"
            id="setName"
            className="sets-form-input"
            onChange={props.updateSetName}
          ></input>
          <button onClick={props.addSet}>add set</button>
        </div>
      </form>
      <div className="sets-container">
        {showTHIS}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetContainer);
