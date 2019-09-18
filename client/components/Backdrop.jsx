import React from 'react';

import '../stylesheets/Backdrop.css';

const Backdrop = (props) => {
  return (
    <div className="backdrop" onClick={() => props.changeShowModal(false)}>
    </div>
  )
};

export default Backdrop;