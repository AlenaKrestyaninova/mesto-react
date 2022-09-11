import React from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({title: '', src: '', alt: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=>{
    api.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
  }, []);

  React.useEffect(()=>{
    api.getCards()
      .then(cards => { 
        setCards(cards)
      })
  }, []);

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleUpdateUser(currentUser){
    api.setUserInfo(currentUser)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups()
      })
  }

  function handleUpdateAvatar(currentUser){
    api.setAvatar(currentUser)
      .then(avatar => {
        setCurrentUser(avatar);
        closeAllPopups()
      })
  }

  function handleAddPlaceSubmit(newCard){
    api.createCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked){
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } else {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
  };

  function handleCardDelete(card){
    api.deleteCard(card._id)
      .then(()=>
        setCards((state) => state.filter((c) => c._id !== card._id))
      )
  };

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({title: '', src: '', alt: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}/>
          
          <PopupWithForm
            name={'delete'}
            title={'Вы уверены?'}
            buttonText={'Да'}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
