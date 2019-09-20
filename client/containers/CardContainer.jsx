import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import '../stylesheets/CardContainer.css';

const CardContainer = (props) => {
  const [count, changeCount] = useState(0);
  const [showFront, changeShowFront] = useState(true);

  console.log('props inside Card COntainer:', props);
  const cardsArray = props.sets[props.setid].cards.map((e, i) => {
    return (
      <Card key={i} id={props.setid} front={e.cardFront} back={e.cardBack} showFront={showFront}/>
    )
  });

  return (
    <div className="card-container">
      {cardsArray[count]}
      <button onClick={() => { 
        if (showFront) {
          changeShowFront(!showFront)
        } else {
          changeShowFront(true);
        }
      }
      }>flip</button>
      <button onClick={() => 
        {
          changeCount(count + 1);
          if (!showFront) {
            changeShowFront(true);
          }
        }
        }>next card</button>
      <button onClick={() => {
        changeCount(count - 1);
        if (!showFront) {
          changeShowFront(true);
        }
      }
    }>prev card</button>
    </div>
  )
};

export default CardContainer;