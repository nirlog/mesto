let popup = document.querySelector('.popup');
let popupBtnOpen = document.querySelector('.popup__btn-open');
let popupBtnClose = popup.querySelector('.popup__close');

function popupOpen() {
  popup.classList.add('popup__open');
}

function popupClose(){
  popup.classList.remove('popup__open');
}


popupBtnOpen.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', popupClose);
