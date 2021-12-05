import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popup){
    super(popup);
  }

  open({nameImage, linkImage}){
    super.open();
    this._popupPictureCardImage = this._popup.querySelector('.pictures-block__img');
    this._popupPictureCardTitle = this._popup.querySelector('.pictures-block__title');
    this._popupPictureCardImage.src = linkImage;
    this._popupPictureCardImage.setAttribute('alt', nameImage);
    this._popupPictureCardTitle.textContent = nameImage;
  }
}
