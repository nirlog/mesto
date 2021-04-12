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



const openPopup = (popup) => popup.classList.add('popup_opened');

const closePopup = (popup) => popup.classList.remove('popup_opened');

const openPicture = (link, title) => {
  popupPictureElementImage.src = link;
  popupPictureElementImage.setAttribute('alt', title);
  popupPictureElementTitle.textContent = title;
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

const createElement = (elem) => elements.prepend(addElements(elem));

const formSubmitAddElement = (nameLocation, linkPicture) => {
  let newLocation = {
    name: nameLocation,
    link: linkPicture
  };
  createElement(newLocation);
}



formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupProfileEditor);
});

buttonPopupProfileEditor.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
  openPopup(popupProfileEditor);
});

buttonsClosePopup.forEach((btnClosePopup) => btnClosePopup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

buttonPopupAddElement.addEventListener('click', () => openPopup(popupAddElement));

initialCards.forEach((item) => createElement(item));

formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formSubmitAddElement(inputLocation.value, inputLink.value);
  formAddElement.reset();
  closePopup(popupAddElement);
});
