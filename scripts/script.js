const popupProfileEditor = document.querySelector('#popup_profile-editor');
const popupAddCard = document.querySelector('#popup_add-card');
const popupPicture = document.querySelector('#popup_picture');
const buttonPopupProfileEditor = document.querySelector('.profile__button-edit');
const buttonPopupAddCard = document.querySelector('.profile__button-add');
const buttonPopupPicture = document.querySelector('.card__picture');
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
const cardTemplate = document.querySelector('#card').content;
const popupPictureCardImage = popupPicture.querySelector('.pictures-block__img');
const popupPictureCardTitle = popupPicture.querySelector('.pictures-block__title');

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

const formList = Array.from(document.querySelectorAll('.form'));


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


const openPicture = (link, title) => {
  popupPictureCardImage.src = link;
  popupPictureCardImage.setAttribute('alt', title);
  popupPictureCardTitle.textContent = title;
}

const openFormProfileEditing = () => {
  profileFormProperties['inputName'].value = profileName.textContent;
  profileFormProperties['inputAboutMe'].value = profileAboutMe.textContent;
  clearValidation(profileFormProperties['inputList'], profileFormProperties['errorClassInput'], profileFormProperties['errorList']);
  toggleButtonState(profileFormProperties['inputList'], profileFormProperties['buttonForm']);
  openPopup(popupProfileEditor);

}

const handlerFormProfileEditing = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileFormProperties['inputName'].value;
  profileAboutMe.textContent = profileFormProperties['inputAboutMe'].value;
  closePopup(popupProfileEditor);
}

const createCard = (item) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardName = card.querySelector('.card__title');
  const cardPicture = card.querySelector('.card__picture');
  const cardButtonLike = card.querySelector('.card__like');
  const cardButtonRemove = card.querySelector('.card__remove');

  cardName.textContent = item.name;
  cardPicture.alt = item.name;
  cardPicture.src = item.link;

  cardButtonLike.addEventListener('click', (evt) => evt.target.classList.toggle('card__like_active'));
  cardButtonRemove.addEventListener('click', (evt) => evt.target.closest('.card').remove());
  cardPicture.addEventListener('click', () => {
    openPicture(cardPicture.src, cardName.textContent);
    openPopup(popupPicture);
  });
  return card;
}

const addCards = (warp, data) => warp.prepend(createCard(data));

const handlerFormAddCard = (evt) => {
  evt.preventDefault();
  const newLocation = {
    name: formAddCardProperties['inputLocation'].value,
    link: formAddCardProperties['inputLink'].value
  };
  addCards(cards, newLocation);
  formAddCard.reset();
  closePopup(popupAddCard);
}

initialCards.forEach((item) => addCards(cards, item));
buttonPopupProfileEditor.addEventListener('click', openFormProfileEditing);
formProfile.addEventListener('submit', handlerFormProfileEditing);
buttonPopupAddCard.addEventListener('click', () => openPopup(popupAddCard));
formAddCard.addEventListener('submit', handlerFormAddCard);
buttonsClosePopup.forEach((btnClosePopup) => btnClosePopup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

enableValidation(profileFormProperties);
enableValidation(formAddCardProperties);

