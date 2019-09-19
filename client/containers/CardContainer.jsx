import React from 'react';
import Card from '../components/Card.jsx';
import '../stylesheets/CardContainer.css';

const CardContainer = (props) => {
  console.log('props inside Card COntainer:', props);
  const cardsArray = props.props.sets[0].cards.map((e, i) => {
    return (
      <Card key={i} id={i} front={e.cardFront} back={e.cardBack} />
    )
  });

  return (
    <div className="card-container">
      {cardsArray}
    </div>
  )
};

export default CardContainer;