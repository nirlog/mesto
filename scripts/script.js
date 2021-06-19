const popupProfileEditor = document.querySelector('#popup_profile-editor');
const popupAddElement = document.querySelector('#popup_add-element');
const popupPicture = document.querySelector('#popup_picture');
const buttonPopupProfileEditor = document.querySelector('.profile__button-edit');
const buttonPopupAddElement = document.querySelector('.profile__button-add');
const buttonPopupPicture = document.querySelector('.element__picture');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formProfile = document.querySelector('.form_type_profile-editor');
const inputName = formProfile.querySelector('input[name="name"]');
const inputAboutMe = formProfile.querySelector('input[name="about-me"]');

const elements = document.querySelector('.elements');
const elemTemplate = document.querySelector('#element').content;
const popupPictureElementImage = popupPicture.querySelector('.pictures-block__img');
const popupPictureElementTitle = popupPicture.querySelector('.pictures-block__title');

const formAddElement = document.querySelector('.form_type_add-element');
const inputLocation = formAddElement.querySelector('input[name="location"]');
const inputLink = formAddElement.querySelector('input[name="link"]');

const formList = Array.from(document.querySelectorAll('.form'));


const keydownClosePopup = (evt) => {
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', (evt) => {
    if(evt.target === popup) {
      closePopup(popup);
    }
  });
  document.addEventListener('keydown', keydownClosePopup);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownClosePopup);

}


const openPicture = (link, title) => {
  popupPictureElementImage.src = link;
  popupPictureElementImage.setAttribute('alt', title);
  popupPictureElementTitle.textContent = title;
}

const openFormProfileEditing = () => {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
  const formProfileEditor = popupProfileEditor.querySelector('.form');
  const formProfile = {
    formElement: formProfileEditor,
    inputList: Array.from(formProfileEditor.querySelectorAll('.form__input')),
    buttonForm: formProfileEditor.querySelector('.form__submit'),
    errorList: Array.from(formProfileEditor.querySelectorAll('.form__error')),
    errorClassInput:'form__input_type_error'
  };
  clearValidation(formProfile['inputList'], formProfile['errorClassInput'], formProfile['errorList']);
  toggleButtonState(formProfile['inputList'], formProfile['buttonForm']);
  openPopup(popupProfileEditor);

}

const handlerFormProfileEditing = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupProfileEditor);
}

const addElements = (item) => {
  const elem = elemTemplate.querySelector('.element').cloneNode(true);
  const elemName = elem.querySelector('.element__title');
  const elemPicture = elem.querySelector('.element__picture');
  const elemButtonLike = elem.querySelector('.element__like');
  const elemButtonRemove = elem.querySelector('.element__remove');

  elemName.textContent = item.name;
  elemPicture.alt = item.name;
  elemPicture.src = item.link;

  elemButtonLike.addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
  elemButtonRemove.addEventListener('click', (evt) => evt.target.closest('.element').remove());
  elemPicture.addEventListener('click', () => {
    openPicture(elemPicture.src, elemName.textContent);
    openPopup(popupPicture);
  });
  return elem;
}

const createElement = (warp, data) => warp.prepend(addElements(data));

const handlerFormAddElement = (evt) => {
  evt.preventDefault();
  let newLocation = {
    name: inputLocation.value,
    link: inputLink.value
  };
  createElement(elements, newLocation);
  formAddElement.reset();
  closePopup(popupAddElement);
}

initialCards.forEach((item) => createElement(elements, item));
buttonPopupProfileEditor.addEventListener('click', openFormProfileEditing);
formProfile.addEventListener('submit', handlerFormProfileEditing);
buttonPopupAddElement.addEventListener('click', () => openPopup(popupAddElement));
formAddElement.addEventListener('submit', handlerFormAddElement);
buttonsClosePopup.forEach((btnClosePopup) => btnClosePopup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));


formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const form = {
    formElement: formElement,
    inputList: Array.from(formElement.querySelectorAll('.form__input')),
    buttonForm: formElement.querySelector('.form__submit'),
    errorClassSpan: 'form__error',
    errorClassInput:'form__input_type_error'
  };
  enableValidation(form);
});
