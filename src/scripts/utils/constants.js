/* Кнопка закрытия Popup */
export const ESCAPE_KEY = 'Escape';

/* Popups */
export const arrayPopupProfile = {
  popupElement: document.querySelector('#popup_profile-editor'),
  buttonOpenPopup: document.querySelector('.profile__button-edit'),
  keyClose: ESCAPE_KEY
}

export const arrayPopupAvatar = {
  popupElement: document.querySelector('#popup_avatar'),
  buttonOpenPopup: document.querySelector('.profile__update-avatar'),
  keyClose: ESCAPE_KEY
}

export const arrayPopupAddCard = {
  popupElement: document.querySelector('#popup_add-card'),
  buttonOpenPopup: document.querySelector('.profile__button-add'),
  keyClose: ESCAPE_KEY
}

export const arrayPopupOpenPicture = {
  popupElement: document.querySelector('#popup_picture'),
  keyClose: ESCAPE_KEY
}

export const arrayPopupDeleteCard = {
  popupElement: document.querySelector('#popup_delete-card'),
  formDelete: document.querySelector('.form_type_delete-card'),
  buttonSubmitForm: document.querySelector('#popup_delete-card').querySelector('.form__submit'),
  keyClose: ESCAPE_KEY
}



/* ProfileEditor */
const formProfile = document.querySelector('.form_type_profile-editor');
export const arrayFormProfile = {
  formElement: formProfile,
  inputList: Array.from(formProfile.querySelectorAll('.form__input')),
  buttonSubmitForm: formProfile.querySelector('.form__submit'),
  classErrorText: 'form__error',
  classErrorInput:'form__input_type_error',
  errorList: Array.from(formProfile.querySelectorAll('.form__error')),
  inputName: formProfile.querySelector('input[name="name"]'),
  inputAbout: formProfile.querySelector('input[name="about"]'),
  inactiveButtonClass: 'form__submit_inactive'
}

/* ProfileAvatar */
const formAvatar = document.querySelector('.form_type_avatar');
export const arrayFormAvatar = {
  formElement: formAvatar,
  inputList: Array.from(formAvatar.querySelectorAll('.form__input')),
  buttonSubmitForm: formAvatar.querySelector('.form__submit'),
  classErrorText: 'form__error',
  classErrorInput:'form__input_type_error',
  errorList: Array.from(formAvatar.querySelectorAll('.form__error')),
  inputLink: formAvatar.querySelector('input[name="link"]'),
  inactiveButtonClass: 'form__submit_inactive'
}

/* Селекторы для вывода данных Профиля */
export const elementProfile = {
  name: document.querySelector('.profile__name'),
  about: document.querySelector('.profile__about-me'),
  avatar: document.querySelector('.profile__avatar')
}

/* FormAddCard */
const formAddCard = document.querySelector('.form_type_add-card');
export const arrayFormAddCard = {
  formElement: formAddCard,
  inputList: Array.from(formAddCard.querySelectorAll('.form__input')),
  buttonSubmitForm: formAddCard.querySelector('.form__submit'),
  classErrorText: 'form__error',
  classErrorInput:'form__input_type_error',
  errorList: Array.from(formAddCard.querySelectorAll('.form__error')),
  inputLocation: formAddCard.querySelector('input[name="location"]'),
  inputLink: formAddCard.querySelector('input[name="link"]'),
  inactiveButtonClass: 'form__submit_inactive'
};

/* Секция с карточками */
export const cards = document.querySelector('.cards');

/* Шаблон карточки */
export const cardTemplate = '#card';
