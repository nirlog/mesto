import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit){
    super(selectorPopup);
    this.handleFormSubmit = handleFormSubmit;
    this._formSelector = this._selectorPopup.querySelector('.form');
    this.wrapperSubmitForm = (e) => this._submitForm.call(this, e);
  }

  _getInputValues(){
    this._inputList = this._formSelector.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  close(){
    super.close();
    this._formSelector.reset();

  }

  _submitForm(e){
    this.inputList = this._getInputValues();
    this.handleFormSubmit(e, this.inputList);
    this.close();
  }

  setEventListeners(){
    super.setEventListeners();
    this._formSelector.addEventListener('submit', this.wrapperSubmitForm);
  }
}

