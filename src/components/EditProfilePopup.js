import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser} = props;
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  return (
    <PopupWithForm
      name={'edit'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="popup__input popup__input_type_name" 
          id="name-input"
          value={name} 
          onChange={handleNameChange}
          placeholder="Имя" 
          name="name" 
          required minLength="2" 
          maxLength="40" />
        <span className="popup__input-error" id="name-input-error"></span>
        <input 
          type="text" 
          className="popup__input popup__input_type_about" 
          id="about-input" 
          value={description} 
          onChange={handleDescriptionChange}
          placeholder="Род занятий" 
          name="about" 
          required minLength="2" 
          maxLength="200" />
        <span className="popup__input-error" id="about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
