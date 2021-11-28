import { ESCAPE_KEY } from "../utils/constants.js";
export default class Popup {
  constructor(popup){
    this._popupSelector = popup.popupSelector;
    this._buttonClosePopup = this._popupSelector.querySelector('.popup__close');
    this._popupContainer = this._popupSelector.querySelector('.popup__container');
    this.wrapperClickOverlay = (e) => this._clickOverlay.call(this, e);
    this.wrapperClickButtonClose = (e) => this._clickButtonClose.call(this, e);
    this.wrapperHandleEscClose = (e) => this._handleEscClose.call(this, e);
  }

  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this.wrapperHandleEscClose);
  }

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.wrapperHandleEscClose);

  }

  _handleEscClose(e){
    if(e.key === ESCAPE_KEY){
      this.close();
    }
  }

  _clickOverlay(e){
    if(e.target === this._popupSelector){
      this.close();
    }
  }

  _clickButtonClose(e){
    if(e.target === this._buttonClosePopup){
      this.close();
    }
  }

  setEventListeners(){
    this._popupSelector.addEventListener('mousedown', this.wrapperClickOverlay);
    this._popupSelector.addEventListener('click', this.wrapperClickButtonClose);
  }
}

