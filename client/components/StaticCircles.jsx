import React, { Component } from 'react';
import StaticCircle from './StaticCircle.jsx';

function StaticCircles() {
  const imageStyle =  {
    position: 'fixed',
    zIndex: -1,
    right: '9vw',
    bottom: '9vh',
    width: '15rem',
    backgroundColor: 'rgb(34, 185, 160)',
    borderRadius: '50%',
    display: 'inline-block'
  }

  return(
    <div style={{position: 'fixed'}}>
      <StaticCircle color="rgb(39, 226, 194)" 
        diameter="110px"
        left={-40}
        z={-2}/>

      <StaticCircle color="rgb(143, 195, 255)" 
        diameter="190px" 
        left="-4vw"
        bottom="2vh"
        z={-2}/>

      <StaticCircle color="rgb(255, 109, 167)" 
        diameter="100px" 
        top="-2vw"
        right="-5vw"
        z={-2} />

      <StaticCircle color="rgb(34, 185, 160)" 
        diameter="25px" 
        left="9vw"
        z={-2}/>  
      <img style={imageStyle} src='/assets/thinker.svg'/>
    </div>
  );
}

export default StaticCircles;