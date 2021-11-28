/* Popups */
export const arrayPopupProfile = {
  popupSelector: document.querySelector('#popup_profile-editor'),
  buttonOpenPopup: document.querySelector('.profile__button-edit'),
}

export const arrayPopupAvatar = {
  popupSelector: document.querySelector('#popup_avatar'),
  buttonOpenPopup: document.querySelector('.profile__update-avatar'),
}

export const arrayPopupAddCard = {
  popupSelector: document.querySelector('#popup_add-card'),
  buttonOpenPopup: document.querySelector('.profile__button-add')
}

export const arrayPopupOpenPicture = {
  popupSelector: document.querySelector('#popup_picture')
}

export const arrayPopupDeleteCard = {
  popupSelector: document.querySelector('#popup_delete-card'),
  buttonSubmitForm: document.querySelector('#popup_delete-card').querySelector('.form__submit')
}

/* Кнопка закрытия Popup */
export const ESCAPE_KEY = 'Escape';

/* ProfileEditor */
const selectorFormProfile = document.querySelector('.form_type_profile-editor');
export const arrayFormProfile = {
  selectorForm: selectorFormProfile,
  inputList: Array.from(selectorFormProfile.querySelectorAll('.form__input')),
  buttonSubmitForm: selectorFormProfile.querySelector('.form__submit'),
  classErrorText: 'form__error',
  classErrorInput:'form__input_type_error',
  errorList: Array.from(selectorFormProfile.querySelectorAll('.form__error')),
  inputName: selectorFormProfile.querySelector('input[name="name"]'),
  inputAbout: selectorFormProfile.querySelector('input[name="about"]'),
  inactiveButtonClass: 'form__submit_inactive'
}

/* ProfileAvatar */
const selectorFormAvatar = document.querySelector('.form_type_avatar');
export const arrayFormAvatar = {
  selectorForm: selectorFormAvatar,
  inputList: Array.from(selectorFormAvatar.querySelectorAll('.form__input')),
  buttonSubmitForm: selectorFormAvatar.querySelector('.form__submit'),
  classErrorText: 'form__error',
  classErrorInput:'form__input_type_error',
  errorList: Array.from(selectorFormAvatar.querySelectorAll('.form__error')),
  inputLink: selectorFormAvatar.querySelector('input[name="link"]'),
  inactiveButtonClass: 'form__submit_inactive'
}

/* Селекторы для вывода данных Профиля */
export const selectorProfile = {
  name: document.querySelector('.profile__name'),
  about: document.querySelector('.profile__about-me'),
  avatar: document.querySelector('.profile__avatar')
}

/* FormAddCard */
const selectorFormAddCard = document.querySelector('.form_type_add-card');
export const arrayFormAddCard = {
  selectorForm: selectorFormAddCard,
  inputList: Array.from(selectorFormAddCard.querySelectorAll('.form__input')),
  buttonSubmitForm: selectorFormAddCard.querySelector('.form__submit'),
  classErrorText: 'form__error',
  classErrorInput:'form__input_type_error',
  errorList: Array.from(selectorFormAddCard.querySelectorAll('.form__error')),
  inputLocation: selectorFormAddCard.querySelector('input[name="location"]'),
  inputLink: selectorFormAddCard.querySelector('input[name="link"]'),
  inactiveButtonClass: 'form__submit_inactive'
};

/* Секция с карточками */
export const cards = document.querySelector('.cards');

/* Шаблон карточки */
export const cardTemplate = '#card';
