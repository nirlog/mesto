/* popup */
let popup = document.querySelectorAll('[data-popup]');
let popupBtnClose = document.querySelectorAll('.popup__close');


function popupOpened(id) {
    id.classList.add('popup_opened');
};

function popupClose(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}


popup.forEach(function(btn){
  btn.addEventListener('click', function (evt) {
    let id = document.querySelector('#' + evt.target.getAttribute('data-popup'));
    popupOpened(id);
  });
});

popupBtnClose.forEach(function(btnClose){
  btnClose.addEventListener('click', popupClose);
});


/* Prifile editor */
const profileEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formProfile = document.querySelector('.form__profile-editor');
const inputName = formProfile.querySelector('input[name="name"]');
const inputAboutMe = formProfile.querySelector('input[name="about-me"]');


function editProfile(name, about) {
  inputName.value = name.textContent;
  inputAboutMe.value = about.textContent;
};

function formSubmitProfileEditor(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  popupClose(evt);
}


profileEdit.addEventListener('click', function (){
  editProfile(profileName, profileAboutMe);
});

formProfile.addEventListener('submit', formSubmitProfileEditor);


/* elements */
const elements = document.querySelector('.elements');
let elementPicture = document.querySelectorAll('.element__picture');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function elementLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function elementRemove(evt) {
  evt.target.closest('.element').remove();
}

function pictureOpened(id, src, title){
  id.querySelector('.pictures-block__img').setAttribute('src', src);
  id.querySelector('.pictures-block__title').textContent = title;
}

function addElements(item){
  console.log(item);
  const elemTemplate = document.querySelector('#element').content;
  const elem = elemTemplate.querySelector('.element').cloneNode(true);
  const elemName = elem.querySelector('.element__title');
  const elemPicture = elem.querySelector('.element__picture');
  elem.querySelector('.element__title').textContent = item.name;
  elem.querySelector('.element__picture').alt = item.name;
  elem.querySelector('.element__picture').src = item.link;
  elem.querySelector('.element__like').addEventListener('click', elementLike);
  elem.querySelector('.element__remove').addEventListener('click', elementRemove);
  elem.querySelector('.element__picture').addEventListener('click', function (evt){
    let id = document.querySelector('#' + evt.target.getAttribute('data-popup'));
    let src = evt.target.getAttribute('src');
    let title = elem.querySelector('.element__title').textContent;
    popupOpened(id);
    pictureOpened(id, src, title);
  });
  elements.prepend(elem);
}

initialCards.forEach((item) => addElements(item));


/* Add elements */
const formAddElement = document.querySelector('.form__add-element');
const inputLocation = formAddElement.querySelector('input[name="location"]');
const inputLink = formAddElement.querySelector('input[name="link"]');

function formSubmitAddElement(nameLocation, linkPicture) {
  let newLocation = {
    name: nameLocation,
    link: linkPicture
  };
  addElements(newLocation);
}

formAddElement.addEventListener('submit', function(evt){
  evt.preventDefault();
  formSubmitAddElement(inputLocation.value, inputLink.value);
  inputLocation.value = '';
  inputLink.value = '';
  popupClose(evt);
});
