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


function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function openPicture(link, title){
  popupPictureElementImage.setAttribute('src', link);
  popupPictureElementImage.setAttribute('alt', title);
  popupPictureElementTitle.textContent = title;
}

function addElements(item){
  const elem = elemTemplate.querySelector('.element').cloneNode(true);
  const elemName = elem.querySelector('.element__title');
  const elemPicture = elem.querySelector('.element__picture');
  const elemButtonLike = elem.querySelector('.element__like');
  const elemButtonRemove = elem.querySelector('.element__remove');

  elemName.textContent = item.name;
  elemPicture.alt = item.name;
  elemPicture.src = item.link;

  elemButtonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  elemButtonRemove.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  elemPicture.addEventListener('click', function() {
    openPicture(elemPicture.getAttribute('src'), elemName.textContent);
    openPopup(popupPicture);
  });
  elements.prepend(elem);
}

function formSubmitAddElement(nameLocation, linkPicture) {
  let newLocation = {
    name: nameLocation,
    link: linkPicture
  };
  addElements(newLocation);
}


formProfile.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupProfileEditor);
});

buttonPopupProfileEditor.addEventListener('click', function(){
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
  openPopup(popupProfileEditor);
});

buttonsClosePopup.forEach(function(btnClosePopup){
  btnClosePopup.addEventListener('click', function(evt){
    closePopup(evt.target.closest('.popup'));
  });
});

buttonPopupAddElement.addEventListener('click', function(){
  openPopup(popupAddElement);
});

initialCards.forEach((item) => addElements(item));

formAddElement.addEventListener('submit', function(evt){
  evt.preventDefault();
  formSubmitAddElement(inputLocation.value, inputLink.value);
  formAddElement.reset();
  closePopup(popupAddElement);
});
