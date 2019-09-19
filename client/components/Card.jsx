import React, { Component, useState } from "react";
import '../stylesheets/Cards.css'

const Card = (props) => {

  // console.log('props in Card', props);
  return (
    <div className="card">
      <ul>
        {/* <li>
          Front: {props.front}
        </li>
        <li>
          Back: {props.back}
        </li> */}
      { 
        props.showFront ? 
        <li>
          Front: {props.front}
        </li> 
        : 
        <li>
          Back: {props.back}
        </li>
      }
      </ul>
    </div>
  )
}

export default Card;