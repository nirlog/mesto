import {Card} from './card.js';
import {ValidationForm} from './validate.js';
import {initialCards} from './initial-сards.js'
export {openPopup};

const popupProfileEditor = document.querySelector('#popup_profile-editor');
const popupAddCard = document.querySelector('#popup_add-card');
const popupPicture = document.querySelector('#popup_picture');
const buttonPopupProfileEditor = document.querySelector('.profile__button-edit');
const buttonPopupAddCard = document.querySelector('.profile__button-add');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const closeKey = 'Escape';
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formProfile = document.querySelector('.form_type_profile-editor');
const profileFormProperties = {
  formElement: formProfile,
  inputList: Array.from(formProfile.querySelectorAll('.form__input')),
  buttonForm: formProfile.querySelector('.form__submit'),
  errorClassSpan: 'form__error',
  errorClassInput:'form__input_type_error',
  errorList: Array.from(formProfile.querySelectorAll('.form__error')),
  inputName: formProfile.querySelector('input[name="name"]'),
  inputAboutMe: formProfile.querySelector('input[name="about-me"]')
};
const cards = document.querySelector('.cards');
const cardTemplate = '#card';
const formAddCard = document.querySelector('.form_type_add-card');
const formAddCardProperties = {
  formElement: formAddCard,
  inputList: Array.from(formAddCard.querySelectorAll('.form__input')),
  buttonForm: formAddCard.querySelector('.form__submit'),
  errorClassSpan: 'form__error',
  errorClassInput:'form__input_type_error',
  errorList: Array.from(formAddCard.querySelectorAll('.form__error')),
  inputLocation: formAddCard.querySelector('input[name="location"]'),
  inputLink: formAddCard.querySelector('input[name="link"]')
};
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
  const newLocation = {
    name: formAddCardProperties['inputLocation'].value,
    link: formAddCardProperties['inputLink'].value
  };
  cards.prepend(creatingСard(newLocation).generateCard());
  formAddCard.reset();
  formAddCardProperties['buttonForm'].setAttribute('disabled', true); //не вижу приемуществ в использовании класса, если атрибут прекрасно работает
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
