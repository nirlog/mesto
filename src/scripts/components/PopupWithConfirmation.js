import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popup, handleCardDelete){
    super(popup);
    this._formDelete = popup.formDelete;
    this.handleCardDelete = handleCardDelete;
    this.wrapperSubmitForm = (e) => this._submitForm.call(this, e);
  }

  open(card){
    super.open();
    this._card = card;
    this._formDelete.addEventListener('submit', this.wrapperSubmitForm);
  }

  close(){
    super.close();
    this._formDelete.removeEventListener('submit', this.wrapperSubmitForm);
  }

  _submitForm(e){
    this.handleCardDelete(e, this._card);
  }
}
