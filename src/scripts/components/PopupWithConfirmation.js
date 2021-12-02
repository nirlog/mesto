import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, handleCardDelete){
    super(selectorPopup);
    this._buttonSubmitForm = selectorPopup.buttonSubmitForm;
    this.popup = selectorPopup;
    this.handleCardDelete = handleCardDelete;
    this.wrapperSubmitForm = (e) => this._submitForm.call(this, e);
  }

  open(card){
    super.open();
    this._card = card;
    this._buttonSubmitForm.addEventListener('click', this.wrapperSubmitForm);
  }

  close(){
    super.close();
    this._buttonSubmitForm.removeEventListener('click', this.wrapperSubmitForm);
  }

  _submitForm(e){
    this.handleCardDelete(e, this._card);
  }
  setEventListeners(){
    super.setEventListeners();
  }
}
