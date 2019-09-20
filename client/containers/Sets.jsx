import React, { useState } from 'react';
import '../stylesheets/Sets.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Card from '../components/Card.jsx';
import CardContainer from '../containers/CardContainer.jsx';

const Sets = (props) => {
  const [cardFront, changeCardFront] = useState('');
  const [cardBack, changeCardBack] = useState('');
  

  console.log('props in Sets component:', props);
  let cardCount, cardString;

  if (props.sets[props.id].cards) {
    cardCount = props.sets[props.id].cards.length > 0 ? props.sets[props.id].cards.length : 0;
    cardString = cardCount > 0 ? `There ` + (cardCount === 1 ? 'is ' : 'are ') + `${cardCount} card` + (cardCount === 1 ? ' ' : 's ') + `in this set` : 'There are no cards in this set';
  } 
  return (
    <div className="set-div">
      <a className="set-boxes">
        <strong>Enter a card for the {props.setName} Set</strong>
        <br/>
        <form className="sets-form">
          <div className="form-control">
            <input type="text" id="cardFront" placeholder="Type in your question" onChange={(e) => changeCardFront(e.target.value)}></input>
            <textarea id="cardBack" placeholder="Answer it!" onChange={(e) => changeCardBack(e.target.value)}></textarea>
            <button onClick={(e) => {
              e.preventDefault();
              const newCard = { setKey: props.id, cardFront, cardBack };
              props.addCard(newCard);
            }}>add card</button>
            <button setid={props.id} onClick={() => props.changeShowCards({setid: props.id, show: !props.showCards.show})}>show me my cards</button>
          </div>
        </form>
      </a>
    </div>
  )
};

export default Sets;