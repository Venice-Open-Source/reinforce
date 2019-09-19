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

  // let showThis;

  // if (showCards) {
  //   showThis = <CardContainer setid={props.id} sets={props.sets} />
  // } else {
  //   showThis = 
  //     <div className="set-div">
  //     <div className="set-boxes">
  //      <button setid={props.id} onClick={() => props.changeShowCards({setid: props.id, show: !showsCards.show})}>show me my cards</button>
  //        {props.setName}
  //        <br/>
  //        {cardString}
  //        <form className="auth-form">
  //          <div className="form-control">
  //            <label htmlFor="cardFront">Card Front</label>
  //            <input type="text" id="cardFront" onChange={(e) => changeCardFront(e.target.value)}></input>
  //            <label htmlFor="cardBack">Card Back</label>
  //            <input type="text" id="cardBack" onChange={(e) => changeCardBack(e.target.value)}></input>
  //            <button onClick={(e) => {
  //              e.preventDefault();
  //              const newCard = { setKey: props.id, cardFront, cardBack };
  //              props.addCard(newCard);
  //            }}>Add Card</button>
  //          </div>
  //        </form>
  //      </div>
  //    </div>
  // }

  return (
  <div className="set-div">
    <div className="set-boxes">
     <button setid={props.id} onClick={() => props.changeShowCards({setid: props.id, show: !props.showCards.show})}>show me my cards</button>
       {props.setName}
       <br/>
       {cardString}
       <form className="auth-form">
         <div className="form-control">
           <label htmlFor="cardFront">Card Front</label>
           <input type="text" id="cardFront" onChange={(e) => changeCardFront(e.target.value)}></input>
           <label htmlFor="cardBack">Card Back</label>
           <input type="text" id="cardBack" onChange={(e) => changeCardBack(e.target.value)}></input>
           <button onClick={(e) => {
             e.preventDefault();
             const newCard = { setKey: props.id, cardFront, cardBack };
             props.addCard(newCard);
           }}>Add Card</button>
         </div>
       </form>
     </div>
   </div>
    // <div className="set-div">
    //    <div className="set-boxes">
    //     <button setid={props.id} onClick={() => changeShowCards(!showCards)}>show me my cards</button>
    //       {props.setName}
    //       <br/>
    //       {cardString}
    //       <form className="auth-form">
    //         <div className="form-control">
    //           <label htmlFor="cardFront">Card Front</label>
    //           <input type="text" id="cardFront" onChange={(e) => changeCardFront(e.target.value)}></input>
    //           <label htmlFor="cardBack">Card Back</label>
    //           <input type="text" id="cardBack" onChange={(e) => changeCardBack(e.target.value)}></input>
    //           <button onClick={(e) => {
    //             e.preventDefault();
    //             const newCard = { setKey: props.id, cardFront, cardBack };
    //             props.addCard(newCard);
    //           }}>Add Card</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
  )
};

export default Sets;