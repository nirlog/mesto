import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selectorPopup){
    super(selectorPopup);

  }
  open({nameImage, linkImage}){
    super.open();
    this._popupPictureCardImage = this._selectorPopup.querySelector('.pictures-block__img');
    this._popupPictureCardTitle = this._selectorPopup.querySelector('.pictures-block__title');
    this._popupPictureCardImage.src = linkImage;
    this._popupPictureCardImage.setAttribute('alt', nameImage);
    this._popupPictureCardTitle.textContent = nameImage;
  }
}
