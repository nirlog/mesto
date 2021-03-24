let popup = document.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__close');
let profileEdit = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let form = document.querySelector('.form');
let inputName = form.querySelector('input[name="name"]');
let inputAboutMe = form.querySelector('input[name="about-me"]');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function editProfile(name, about) {
  popup.classList.add('popup_opened');
  inputName.value = name.textContent;
  inputAboutMe.value = about.textContent;
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  popupClose();
}

profileEdit.addEventListener('click', function () {
  editProfile(profileName, profileAboutMe);
});
popupBtnClose.addEventListener('click', popupClose);
form.addEventListener('submit', formSubmitHandler);
