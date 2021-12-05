import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit){
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this.wrapperSubmitForm = (e) => this._submitForm.call(this, e);
  }

  close(){
    super.close();
    this._form.reset();
  }

  _getInputValues(){
    let formValues = {};
    this._inputList.forEach((input) => formValues[input.name] = input.value);
    return formValues;
  }

  _submitForm(e){
    this._handleFormSubmit(e, this._getInputValues());
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', this.wrapperSubmitForm);
  }
}

