import {
  cards,
  cardTemplate,
  popupPicture,
  popupAddCard,
  popupProfileEditor,
  buttonPopupProfileEditor,
  buttonPopupAddCard,
  profileName,
  profileAboutMe,
  formProfile,
  formAddCard,
  buttonsClosePopup,
  profileFormProperties,
  formAddCardProperties,

  closeKey
} from './utils/constants.js';
import Card from './components/Card.js';
import ValidationForm from './components/ValidationForm.js';
import {initialCards} from './utils/initial-сards.js';
import Section from './components/Section.js';
export {openPopup};


const profileFormValidation = new ValidationForm(profileFormProperties);


profileFormValidation.enableValidation();

new ValidationForm(formAddCardProperties).enableValidation();

const creatingСard = (item) => {
  return new Card(item, cardTemplate, popupPicture);
};



const clickOverlay = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};

const keydownClosePopup = (evt) => {
  if(evt.key === closeKey){
    closePopup(document.querySelector('.popup_opened'));
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOverlay);
  document.addEventListener('keydown', keydownClosePopup);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', clickOverlay);
  document.removeEventListener('keydown', keydownClosePopup);

}

const openFormProfileEditing = () => {
  profileFormProperties['inputName'].value = profileName.textContent;
  profileFormProperties['inputAboutMe'].value = profileAboutMe.textContent;
  profileFormValidation.clearValidation();
  openPopup(popupProfileEditor);

}

const handlerFormProfileEditing = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileFormProperties['inputName'].value;
  profileAboutMe.textContent = profileFormProperties['inputAboutMe'].value;
  closePopup(popupProfileEditor);
}


const handlerFormAddCard = (evt) => {
  evt.preventDefault();
  const newLocation = [{
    name: formAddCardProperties['inputLocation'].value,
    link: formAddCardProperties['inputLink'].value
  }];
  const addNewLocation = new Section ({
    items: newLocation,
    renderer: (item) => {
      const creatingNewCard = new Card (item, cardTemplate, popupPicture);
      const cardElement = creatingNewCard.generateCard();
      addNewLocation.addItem(cardElement);
    }
  }, cards);
  addNewLocation.renderItems();
  formAddCard.reset();
  formAddCardProperties['buttonForm'].setAttribute('disabled', true);
  closePopup(popupAddCard);
}

initialCards.forEach((item) => {
  cards.prepend(creatingСard(item).generateCard());
});

buttonPopupProfileEditor.addEventListener('click', openFormProfileEditing);

formProfile.addEventListener('submit', handlerFormProfileEditing);

buttonPopupAddCard.addEventListener('click', () => openPopup(popupAddCard));

formAddCard.addEventListener('submit', handlerFormAddCard);

buttonsClosePopup.forEach((btnClosePopup) => btnClosePopup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

