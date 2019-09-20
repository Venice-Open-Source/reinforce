import React, { useState } from 'react';
import '../stylesheets/Sets.css';

const Sets = (props) => {
  const [cardFront, changeCardFront] = useState('');
  const [cardBack, changeCardBack] = useState('');
  console.log('props in Sets component:', props);
  let cardCount, cardString;

  if (props.sets[0].cards) {
    cardCount = props.sets[0].cards.length > 0 ? props.sets[0].cards.length : 0;
    cardString = `There are ${cardCount} cards in this set`;
  } else {
    cardString = 'There are no cards in this set';
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
                const newCard = { cardFront, cardBack };
                props.addCard(newCard);
              }}>Add Card</button>
            </div>
          </form>
        </a>
      </div>
  )
};

export default Sets;