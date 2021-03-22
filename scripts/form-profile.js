let profileEdit = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let formProfile = document.querySelector('.form-profile');
let inputName = formProfile.querySelector('input[name="name"]');
let inputAboutMe = formProfile.querySelector('input[name="about-me"]');


function editProfile(name, about) {
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

formProfile.addEventListener('submit', formSubmitHandler);
