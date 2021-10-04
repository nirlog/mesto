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
  formAddCard,
  profileFormProperties,
  formAddCardProperties
} from './utils/constants.js';
import Card from './components/Card.js';
import ValidationForm from './components/ValidationForm.js';
import {initialCards} from './utils/initial-сards.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

// ВАЛИДАЦИЯ
const profileFormValidation = new ValidationForm(profileFormProperties);
profileFormValidation.enableValidation();

new ValidationForm(formAddCardProperties).enableValidation();

// СОЗДАНИЕ КАРТОЧЕК
const creatingСard = (item) => {
  return new Card(item, cardTemplate, popupPicture);
};

initialCards.forEach((item) => {
  cards.prepend(creatingСard(item).generateCard());
});


// ПРОФИЛЬ
const userInfo = new UserInfo({selectorName:profileName, selectorAboutMe:profileAboutMe});
const handlerFormProfileEditing = (e, inputList) => {
  e.preventDefault();
  userInfo.setUserInfo(inputList);
}

const popupFormProfile = new PopupWithForm(popupProfileEditor, handlerFormProfileEditing);
const openFormProfileEditing = () => {
  const inputList = userInfo.getUserInfo();
  profileFormProperties.inputName.value = inputList.name;
  profileFormProperties.inputAboutMe.value = inputList.aboutMe;

  profileFormValidation.clearValidation();
  popupFormProfile.open();
}

buttonPopupProfileEditor.addEventListener('click', openFormProfileEditing);


// КАРТОЧКИ
const handlerFormAddCard = (e) => {
  e.preventDefault();
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
  popupFormAddCard.close();
}

const popupFormAddCard = new PopupWithForm(popupAddCard, handlerFormAddCard);

buttonPopupAddCard.addEventListener('click', () => popupFormAddCard.open());

