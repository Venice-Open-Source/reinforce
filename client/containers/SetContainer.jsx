import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../constants/actions';
import Set from './Sets.jsx';


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
  updatedCardName: (e) => {
    dispatch(actions.updateCardName(e.target.value))
  },

});

const SetContainer = (props) => {
  console.log('store sets in setContainer',props.store.sets);
  const setsArray = props.store.sets.map((e, i) => {
    return <Set sets={props.store.sets} key={i} setName={e.setname}></Set>
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
      {setsArray}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SetContainer);