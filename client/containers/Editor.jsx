import React from 'react';
import * as actions from '../constants/actions';
import { connect } from 'react-redux';


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


const Editor = (props) => {

  return (
    <div className="main-editor-container">
      
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);