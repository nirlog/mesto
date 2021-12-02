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
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation';


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
  arrayFormProfile.buttonSubmitForm.classList.add('loading');

  api.patchUser({
      name: arrayFormProfile.inputName.value,
      about: arrayFormProfile.inputAbout.value
    })
      .then((dataUser) => {
        userInfo.setUserInfo(dataUser);
        userInfo.setUserAvatar(dataUser);
        arrayFormProfile.buttonSubmitForm.textContent = 'Готово';
      })
      .catch(err => console.log(err)).finally(() => {

        setTimeout(popupProfile.close(), 500);
        setTimeout(() => {
          arrayFormProfile.buttonSubmitForm.removeAttribute('disabled');
          arrayFormProfile.buttonSubmitForm.classList.remove('loading');
          arrayFormProfile.buttonSubmitForm.textContent = 'Сохранить';
        }, 500);
      });

}

const popupProfile = new PopupWithForm(arrayPopupProfile, handleFormProfileEditing);
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
  arrayFormAvatar.buttonSubmitForm.textContent = 'Сохранение...';
  arrayFormAvatar.buttonSubmitForm.setAttribute('disabled', true);
  arrayFormAvatar.buttonSubmitForm.classList.add('loading');
  api.patchAvatar({link: arrayFormAvatar.inputLink.value})
      .then((dataUser) => {
        userInfo.setUserAvatar(dataUser);
        arrayFormAvatar.buttonSubmitForm.textContent = 'Готово';
      })
      .catch(err => console.log(err))
      .finally(() =>{
        setTimeout(popupAvatar.close(), 500);
        setTimeout(() => {
          arrayFormAvatar.buttonSubmitForm.classList.remove('loading');
          arrayFormAvatar.buttonSubmitForm.textContent = 'Сохранить';
        }, 500);
      });
}

const popupAvatar = new PopupWithForm(arrayPopupAvatar, handleFormAvatarEditing);
popupAvatar.setEventListeners();

// открытие формы смены аватара
arrayPopupAvatar.buttonOpenPopup.addEventListener('click', () => popupAvatar.open());


//POPUP IMAGE CARD
const popupImage = new PopupWithImage(arrayPopupOpenPicture, );
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


// удаление
const handleCardDelete = (e, card) => {
  e.preventDefault();
  e.target.textContent = 'Удаляем...';
  e.target.setAttribute('disabled', true);
  e.target.classList.add('loading');
  api.deleteCard(card.cardId).then((result) => {
    card.removeElement();
    e.target.textContent = result.message;
  })
  .catch(err => console.log(err))
  .finally(() => {
    setTimeout(popupDeleteCard.close(), 500);
    setTimeout(() => {
      e.target.removeAttribute('disabled');
      e.target.classList.remove('loading');

      e.target.textContent = 'Да';
    }, 500);
  });
}

const popupDeleteCard = new PopupWithConfirmation(arrayPopupDeleteCard, handleCardDelete);
popupDeleteCard.setEventListeners();

// колбэк удаление карточки
const handleDeleteClick = (card) => {
  popupDeleteCard.open(card);
};

// создание корточек
const creatingCard = (item) => {
  return new Card(
    {
      item: {...item, currentUser: userId},
      handleCardClick: handleCardClick,
      handleLikeClick: handleLikeClick,
      handleDeleteClick: handleDeleteClick
    }, cardTemplate);
};

// открытие формы добавления корточки
arrayPopupAddCard.buttonOpenPopup.addEventListener('click', () => popupAddCard.open());

// колбэк добавления карточки
const handleFormAddCard = (e) => {
  e.preventDefault();
  arrayFormAddCard.buttonSubmitForm.textContent = 'Сохранение...';
  arrayFormAddCard.buttonSubmitForm.setAttribute('disabled', true);
  arrayFormAddCard.buttonSubmitForm.classList.add('loading');
  api.addCard({
        name: arrayFormAddCard.inputLocation.value,
        link: arrayFormAddCard.inputLink.value
      })
      .then((item) => {
        const cardElement = creatingCard(item).generateCard();
        addNewLocation.addItem(cardElement);
        arrayFormAddCard.buttonSubmitForm.textContent = 'Готово';
      })
      .catch(err => console.log(err)).finally(() => {
        setTimeout(popupAddCard.close(), 500);
        setTimeout(() => {
          arrayFormAddCard.buttonSubmitForm.removeAttribute('disabled');
          arrayFormAddCard.buttonSubmitForm.classList.remove('loading');
          arrayFormAddCard.buttonSubmitForm.textContent = 'Создать';
        }, 500);
      });

  arrayFormAddCard.selectorForm.reset();
  formAddCardValidation.disableButtonForm();
};


const popupAddCard = new PopupWithForm(arrayPopupAddCard, handleFormAddCard);
popupAddCard.setEventListeners();
