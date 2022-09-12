import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace, isLoading} = props;
  const [placeName, setPlaceName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link,
    });
  }

  React.useEffect(() => {
    setPlaceName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="popup__input popup__input_type_place" 
          id="place-input"
          value={placeName} 
          onChange={handlePlaceNameChange}
          placeholder="Название" 
          name="name" 
          required 
          minLength="2" 
          maxLength="30" />
        <span className="popup__input-error" id="place-input-error"></span>
        <input 
          type="url" 
          className="popup__input popup__input_type_image" 
          id="img-input"
          value={link} 
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку" 
          name="link" 
          required />
        <span className="popup__input-error" id="img-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
