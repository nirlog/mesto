export default class Popup {
  constructor(popup){
    this._popup = popup.popupElement;
    this._buttonClosePopup = this._popup.querySelector('.popup__close');
    this._popupContainer = this._popup.querySelector('.popup__container');
    this._keyClose = popup.keyClose;
    this.wrapperClickOverlay = (e) => this._clickOverlay.call(this, e);
    this.wrapperClickButtonClose = (e) => this._clickButtonClose.call(this, e);
    this.wrapperHandleEscClose = (e) => this._handleEscClose.call(this, e);
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.wrapperHandleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.wrapperHandleEscClose);

  }

  _handleEscClose(e){
    if(e.key === this._keyClose){
      this.close();
    }
  }

  _clickOverlay(e){
    if(e.target === this._popup){
      this.close();
    }
  }

  _clickButtonClose(e){
    if(e.target === this._buttonClosePopup){
      this.close();
    }
  }

  setEventListeners(){
    this._popup.addEventListener('mousedown', this.wrapperClickOverlay);
    this._popup.addEventListener('click', this.wrapperClickButtonClose);
  }
}

