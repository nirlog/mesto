import './index.css';

import {
  arrayPopupProfile,
  arrayFormProfile,
  arrayPopupAvatar,
  arrayFormAvatar,
  selectorProfile,
  arrayFormAddCard,
  arrayPopupAddCard,
  arrayPopupOpenPicture,
  cardTemplate,
  cards,
  arrayPopupDeleteCard
} from '../scripts/utils/constants.js';

import Api from '../scripts/components/Api.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import ValidationForm from '../scripts/components/ValidationForm.js';
import Card from '../scripts/components/Card';
import Section from '../scripts/components/Section';
import PopupWithImage from '../scripts/components/PopupWithImage';
import UserInfo from '../scripts/components/UserInfo';
import Popup from '../scripts/components/Popup';


//API
const api  = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
              authorization: 'd212ae53-16c4-4655-af75-395db9babc88',
              'Content-Type': 'application/json'
            }
});

//КЛАССЫ
const userInfo = new UserInfo(selectorProfile);
const popupProfile = new PopupWithForm(arrayPopupProfile, handleFormProfileEditing);
const popupDeleteCard = new Popup(arrayPopupDeleteCard);

//SECTION
const addNewLocation = new Section({
  renderer: (item) => {
    const cardElement = creatingCard(item).generateCard();
    addNewLocation.addItem(cardElement);
  }
}, cards);

// VALIDATION
const profileFormValidation = new ValidationForm(arrayFormProfile);
profileFormValidation.enableValidation();

const avatarFormValidation = new ValidationForm(arrayFormAvatar);
avatarFormValidation.enableValidation();

const formAddCardValidation = new ValidationForm(arrayFormAddCard);
formAddCardValidation.enableValidation();


let userId = null;
Promise.all([api.getCards(), api.getUser()])
.then(([dataCards, dataUser]) => {
  userId = dataUser._id;
  userInfo.setUserInfo(dataUser); // Заполняем данные Профиля
  userInfo.setUserAvatar(dataUser); // Заполняем данные Аватара
  addNewLocation.renderItems(dataCards); // Заполняем Карточки
})
.catch(err => console.log(err));


/* колбэк при отправке формы Профиля */
const handleFormProfileEditing = (e) => {
  e.preventDefault();
  arrayFormProfile.buttonSubmitForm.textContent = 'Сохранение...';
  arrayFormProfile.buttonSubmitForm.setAttribute('disabled', true);
  api.patchUser({
      name: arrayFormProfile.inputName.value,
      about: arrayFormProfile.inputAbout.value
    })
      .then((dataUser) => {
        userInfo.setUserInfo(dataUser);
        userInfo.setUserAvatar(dataUser);
        arrayFormProfile.buttonSubmitForm.textContent = 'Готово';
        setTimeout(popupProfile.close(), 500);
        setTimeout(() => {
          arrayFormProfile.buttonSubmitForm.removeAttribute('disabled');
          arrayFormProfile.buttonSubmitForm.textContent = 'Сохранить';
        }, 500);
      })
      .catch(err => console.log(err));

}

popupProfile.setEventListeners();

/* открытие popup с формой Профиля */
const handleOpenPopupProfile = () => {
    api.getUser()
        .then((dataUser) => {
          arrayFormProfile.inputName.value = dataUser.name;  // Заполняем поле формы, inputName
          arrayFormProfile.inputAbout.value = dataUser.about;  // Заполняем поле формы, inputAbout
          popupProfile.open();
        })
        .catch(err => console.log(err));
};

/* вешаем обрабочик на кнопку открытия PopupProfile */
arrayPopupProfile.buttonOpenPopup.addEventListener('click', handleOpenPopupProfile);


/* колбэк при отправке формы Аватарки */
const handleFormAvatarEditing = (e) => {
  e.preventDefault();
  arrayFormAvatar.buttonSubmitForm.textContent = 'Загрузка...';
  arrayFormAvatar.buttonSubmitForm.setAttribute('disabled', true);
  api.patchAvatar({link: arrayFormAvatar.inputLink.value})
      .then((dataUser) => {
        userInfo.setUserAvatar(dataUser);
        arrayFormAvatar.buttonSubmitForm.textContent = 'Готово';
        setTimeout(popupAvatar.close(), 500);
        setTimeout(() => {
          arrayFormAvatar.buttonSubmitForm.removeAttribute('disabled');
          arrayFormAvatar.buttonSubmitForm.textContent = 'Сохранить';
        }, 500);

      })
      .catch(err => console.log(err));
}

const popupAvatar = new PopupWithForm(arrayPopupAvatar, handleFormAvatarEditing);
popupAvatar.setEventListeners();

// открытие формы смены аватара
arrayPopupAvatar.buttonOpenPopup.addEventListener('click', () => popupAvatar.open());


//POPUP IMAGE CARD
const popupImage = new PopupWithImage(arrayPopupOpenPicture);
popupImage.setEventListeners();


//CARD
// колбэк на открытие карточки
const handleCardClick = (name, link) => {
  popupImage.open({nameImage:name, linkImage:link});
}

// колбэк переключения лайков
const handleLikeClick = (card) => {
  const isLiked = card.likes.some(like => like._id == card.currentUser);
  api.toggleCardLike(card.cardId, (isLiked ? 'DELETE' : 'PUT'))
      .then((result) => {
        card.setArrayLikes(result.likes);
        card.liked(isLiked);
      })
      .catch(err => console.log(err));

}

// колбэк удаление карточки
const handleDeleteClick = (card) => {
  popupDeleteCard.open();
  arrayPopupDeleteCard.buttonSubmitForm.addEventListener('click', (e) => {
    e.preventDefault();
    arrayPopupDeleteCard.buttonSubmitForm.textContent = 'Удаляем...';
    arrayPopupDeleteCard.buttonSubmitForm.setAttribute('disabled', true);

    api.deleteCard(card.cardId).then((result) => {
      card.removeElement();
      arrayPopupDeleteCard.buttonSubmitForm.textContent = result.message;
      setTimeout(popupDeleteCard.close(), 500);
      setTimeout(() => {
        arrayPopupDeleteCard.buttonSubmitForm.removeAttribute('disabled');
        arrayPopupDeleteCard.buttonSubmitForm.textContent = 'Да';
      }, 500);
    })
    .catch(err => console.log(err));
  })
};

// создание корточек
const creatingCard = (item) => {
  return new Card({item: {...item, currentUser: userId}, handleCardClick: handleCardClick, handleLikeClick: handleLikeClick, handleDeleteClick: handleDeleteClick}, cardTemplate);
};

// открытие формы добавления корточки
arrayPopupAddCard.buttonOpenPopup.addEventListener('click', () => popupAddCard.open());

// колбэк добавления карточки
const handleFormAddCard = (e) => {
  e.preventDefault();
  arrayFormAddCard.buttonSubmitForm.textContent = 'Загрузка...';
  arrayFormAddCard.buttonSubmitForm.setAttribute('disabled', true);
  api.addCard({
        name: arrayFormAddCard.inputLocation.value,
        link: arrayFormAddCard.inputLink.value
      })
      .then((item) => {
        const cardElement = creatingCard(item).generateCard();
        addNewLocation.addItem(cardElement);
        arrayFormAddCard.buttonSubmitForm.textContent = 'Готово';
        setTimeout(popupAddCard.close(), 500);
        setTimeout(() => {
          arrayFormAddCard.buttonSubmitForm.removeAttribute('disabled');
          arrayFormAddCard.buttonSubmitForm.textContent = 'Сохранить';
        }, 500);
      })
      .catch(err => console.log(err));

  arrayFormAddCard.selectorForm.reset();
  formAddCardValidation.disableButtonForm();
};


const popupAddCard = new PopupWithForm(arrayPopupAddCard, handleFormAddCard);
popupAddCard.setEventListeners();
