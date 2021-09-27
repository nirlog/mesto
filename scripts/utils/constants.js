export const popupProfileEditor = document.querySelector('#popup_profile-editor');
export const popupAddCard = document.querySelector('#popup_add-card');
export const popupPicture = document.querySelector('#popup_picture');
export const buttonPopupProfileEditor = document.querySelector('.profile__button-edit');
export const buttonPopupAddCard = document.querySelector('.profile__button-add');
export const buttonsClosePopup = document.querySelectorAll('.popup__close');
export const closeKey = 'Escape';
export const profileName = document.querySelector('.profile__name');
export const profileAboutMe = document.querySelector('.profile__about-me');
export const formProfile = document.querySelector('.form_type_profile-editor');
export const profileFormProperties = {
  formElement: formProfile,
  inputList: Array.from(formProfile.querySelectorAll('.form__input')),
  buttonForm: formProfile.querySelector('.form__submit'),
  errorClassSpan: 'form__error',
  errorClassInput:'form__input_type_error',
  errorList: Array.from(formProfile.querySelectorAll('.form__error')),
  inputName: formProfile.querySelector('input[name="name"]'),
  inputAboutMe: formProfile.querySelector('input[name="about-me"]')
};
export const cards = document.querySelector('.cards');
export const cardTemplate = '#card';
export const formAddCard = document.querySelector('.form_type_add-card');
export const formAddCardProperties = {
  formElement: formAddCard,
  inputList: Array.from(formAddCard.querySelectorAll('.form__input')),
  buttonForm: formAddCard.querySelector('.form__submit'),
  errorClassSpan: 'form__error',
  errorClassInput:'form__input_type_error',
  errorList: Array.from(formAddCard.querySelectorAll('.form__error')),
  inputLocation: formAddCard.querySelector('input[name="location"]'),
  inputLink: formAddCard.querySelector('input[name="link"]')
};
