import React from 'react';
import '../stylesheets/Sets.css';

const Sets = (props) => {
  
  return (
    <div className="sets-container">
      {props.setName}
    </div>
  )
};

export default Sets;