import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../constants/actions';
import Set from './Sets.jsx';

import '../stylesheets/SetContainer.css';


const mapStateToProps = store => ({
  store: store.reinforce,
});

const mapDispatchToProps = dispatch => ({
  updateSetName: (e) => {
    dispatch(actions.updateSetName(e.target.value));
  },
  addSet: (e) => {
    console.log('event target value in addSet method in setContainer:', e.target.value);
    e.preventDefault();
    dispatch(actions.addSet());
  },
  updateCardFront: (e) => {
    dispatch(actions.updateCardFront(e.target.value))
  },
  updateCardBack: (e) => {
    dispatch(actions.updateCardBack(e.target.value))
  },
  addCard: (card) => {
    dispatch(actions.addCard(card));
  }
});

const SetContainer = (props) => {
  console.log('store sets in setContainer',props.store.sets);
  const setsArray = props.store.sets.map((e, i) => {
    return <Set sets={props.store.sets} key={i} setName={e.setname} addCard={props.addCard}></Set>
  });

  console.log('store inside SetContainer', props.store);
  return (
    <div>
      <form className="auth-form">
        <div className="form-control">
          <label htmlFor="setName">Set Name</label>
          <input type="text" id="setName" onChange={props.updateSetName}></input>
          <button onClick={props.addSet}>Add Set</button>
        </div>
      </form>
      <div className="sets-container">
        {setsArray}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SetContainer);