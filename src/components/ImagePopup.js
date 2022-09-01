import React from 'react';

function ImagePopup(props) {
  const {card, onClose} = props;

  return (
    <div className={`popup popup_type_photo ${card.src ? "popup_opened" : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close"
          onClick={onClose}>
        </button>
        <figure className="popup__figure">
          <img alt={card ? card.alt : ''} className="popup__img" src={card ? card.src : ''}/>
          <figcaption className="popup__img-title">{card ? card.title : ''}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;