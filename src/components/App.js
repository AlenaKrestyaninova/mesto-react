import React from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

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
    //console.log(selectedCard)
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  }

  return (
    <body className="body">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name={'edit'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
            <input type="text" className="popup__input popup__input_type_name" id="name-input" placeholder="Имя" name="name" required minLength="2" maxLength="40" />
            <span className="popup__input-error" id="name-input-error"></span>
            <input type="text" className="popup__input popup__input_type_about" id="about-input" placeholder="Род занятий" name="about" required minLength="2" maxLength="200" />
            <span className="popup__input-error" id="about-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={'add'}
          title={'Новое место'}
          buttonText={'Сохранить'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
            <input type="text" className="popup__input popup__input_type_place" id="place-input" placeholder="Название" name="name" required minLength="2" maxLength="30" />
            <span className="popup__input-error" id="place-input-error"></span>
            <input type="url" className="popup__input popup__input_type_image" id="img-input" placeholder="Ссылка на картинку" name="link" required />
            <span className="popup__input-error" id="img-input-error"></span>
        </PopupWithForm>
        
        <PopupWithForm
          name={'delete'}
          title={'Вы уверены?'}
          buttonText={'Да'}
        />

        <PopupWithForm
          name={'avatar'}
          title={'Обновить аватар'}
          buttonText={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
            <input type="url" className="popup__input popup__input_type_avatar" id="avatar-input" placeholder="Ссылка на картинку" name="avatar" required />
            <span className="popup__input-error" id="avatar-input-error"></span>
        </PopupWithForm>

      </div>
    </body>

  );
}

export default App;
