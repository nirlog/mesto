import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit){
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector('.form');
    this.wrapperSubmitForm = (e) => this._submitForm.call(this, e);
  }

  close(){
    super.close();
  }

  _submitForm(e){
    this._handleFormSubmit(e);
  }

  setEventListeners(){
    super.setEventListeners();
    this._formSelector.addEventListener('submit', this.wrapperSubmitForm);
  }
}

