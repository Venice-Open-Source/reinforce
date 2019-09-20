import React, { Component, useState } from "react";
import '../stylesheets/Cards.css'

const Card = (props) => {

  // console.log('props in Card', props);
  return (
    <div className="card">
      { 
        props.showFront ? props.front : props.back
      }
    </div>
  )
}

export default Card;