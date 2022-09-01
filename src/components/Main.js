import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {
  const {onEditAvatar, onEditProfile, onAddCard, onCardClick} = props;
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setuserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setuserAvatar] = React.useState('../images.Avatar.png');
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=>{
    api.getUserInfo()
      .then(userInfo => {
        setUserName(userInfo.name);
        setuserDescription(userInfo.about);
        setuserAvatar(userInfo.avatar);
      })
  }, []);

  React.useEffect(()=>{
    api.getCards()
      .then(cardsArray => { 
        setCards(
          cardsArray.map(item =>({
            id: item._id,
            title: item.name,
            src: item.link,
            alt: item.name,
            likes: item.likes.length
          }))
        )
      })
  }, []);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar"
          onClick={onEditAvatar}>
          <img className="profile__avatar-img" src={userAvatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__edit"
            onClick={onEditProfile}>
          </button>
        </div>
        <button className="profile__add"
          onClick={onAddCard}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (

            <li key={card.id} className="card">
              <Card
                onCardClick={onCardClick}
                card={card}
              />
            </li>
            
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;