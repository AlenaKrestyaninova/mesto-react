import React from 'react';

function Card(props) {
  const{onCardClick, card} = props;
  const {src, title, alt, likes} = card

  function handleClick(card) {
    onCardClick(card);
  } 

  return (
    <>
      <button className="card__trash"></button>
      <img className="card__img" src={src} alt={alt}
        onClick = {()=>{handleClick (card)}}
      />
      <div className="card__text">
        <h2 className="card__title">{title}</h2>
        <div className="card__button">
          <button className="card__like"></button>
          <p className="card__like-counter">{likes}</p>
        </div>
      </div>
    </>
  );
}

export default Card;