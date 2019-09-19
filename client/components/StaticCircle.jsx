import React, { Component } from 'react';

function StaticCircle(props) {
  const divStyle = {
    height : props.diameter,
    width : props.diameter,
    backgroundColor : props.color,
    borderRadius : '50%',
    display : 'inline-block',
    position : 'fixed'
  };
  
  if (props.top !== undefined) divStyle.top = props.top;
  if (props.bottom !== undefined) divStyle.bottom = props.bottom;
  if (props.left !== undefined) divStyle.left = props.left;
  if (props.right !== undefined) divStyle.right = props.right;
  if (props.z !== undefined) divStyle.zIndex = props.z;

  return(
    <div style={divStyle}/>
  );
}

export default StaticCircle;
