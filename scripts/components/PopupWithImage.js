import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selectorPopup,{nameImage, linkImage}){
    super(selectorPopup);
    this._nameImage = nameImage;
    this._linkImage = linkImage;
    this._popupPictureCardImage = this._selectorPopup.querySelector('.pictures-block__img');
    this._popupPictureCardTitle = this._selectorPopup.querySelector('.pictures-block__title');
  }
  open(){
    super.open();
    this._popupPictureCardImage.src = this._linkImage;
    this._popupPictureCardImage.setAttribute('alt', this._nameImage);
    this._popupPictureCardTitle.textContent = this._nameImage;
  }
}
