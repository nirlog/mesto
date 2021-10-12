import './index.css';

import {
  cards,
  cardTemplate,
  popupPicture,
  popupProfileEditor,
  buttonPopupProfileEditor,
  buttonPopupAddCard,
  profileName,
  profileAboutMe,
  formAddCard,
  profileFormProperties,
  formAddCardProperties
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import ValidationForm from '../scripts/components/ValidationForm.js';
import {initialCards} from '../scripts/utils/initial-сards.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from '../scripts/components/UserInfo.js';

const popupAddCard = document.querySelector('#popup_add-card');


const popupImage = new PopupWithImage(popupPicture);
popupImage.setEventListeners();

// ВАЛИДАЦИЯ
const profileFormValidation = new ValidationForm(profileFormProperties);
profileFormValidation.enableValidation();


const formAddCardValidation = new ValidationForm(formAddCardProperties);
formAddCardValidation.enableValidation();

// СОЗДАНИЕ КАРТОЧЕК
const handleCardClick = (name, link) => {
  popupImage.open({nameImage:name, linkImage:link});
}

const creatingCard = (item) => {
  return new Card(item, cardTemplate, handleCardClick);
};

initialCards.forEach((item) => {
  cards.prepend(creatingCard(item).generateCard());
});


// ПРОФИЛЬ
const userInfo = new UserInfo({selectorName:profileName, selectorAboutMe:profileAboutMe});
const handlerFormProfileEditing = (e, inputList) => {
  e.preventDefault();
  userInfo.setUserInfo(inputList);
}

const popupFormProfile = new PopupWithForm(popupProfileEditor, handlerFormProfileEditing);
popupFormProfile.setEventListeners();
const openFormProfileEditing = () => {
  const inputList = userInfo.getUserInfo();
  profileFormProperties.inputName.value = inputList.name;
  profileFormProperties.inputAboutMe.value = inputList.aboutMe;

  profileFormValidation.clearValidation();
  popupFormProfile.open();
}

buttonPopupProfileEditor.addEventListener('click', openFormProfileEditing);


// КАРТОЧКИ

const addNewLocation = new Section ({
  renderer: (item) => {
    const creatingNewCard = new Card (item, cardTemplate, handleCardClick);
    const cardElement = creatingNewCard.generateCard();
    addNewLocation.addItem(cardElement);
  }
}, cards);

const handlerFormAddCard = (e) => {
  e.preventDefault();
  const newLocation = [{
    name: formAddCardProperties['inputLocation'].value,
    link: formAddCardProperties['inputLink'].value
  }];

  addNewLocation.renderItems(newLocation);
  formAddCard.reset();
  formAddCardValidation.disableButtonForm();
  popupFormAddCard.close();
}

const popupFormAddCard = new PopupWithForm(popupAddCard, handlerFormAddCard);
popupFormAddCard.setEventListeners();

buttonPopupAddCard.addEventListener('click', () => popupFormAddCard.open());
