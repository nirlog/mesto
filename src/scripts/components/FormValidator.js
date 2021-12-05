export default class FormValidator {
  constructor (form){
    this._form = form.formElement;
    this._inputList = form.inputList;
    this._classErrorText = form.classErrorText;
    this._classErrorInput = form.classErrorInput;
    this._buttonSubmitForm = form.buttonSubmitForm;
    this.errorList = form.errorList;
    this._inactiveButtonClass = form.inactiveButtonClass;
  }

  _showInputError(inputItem, errorClass, errorMessage) {
    inputItem.classList.add(this._classErrorInput);
    this._form.querySelector('.' + errorClass).textContent = errorMessage;
  };

  _hideInputError(inputItem, errorClass){
      inputItem.classList.remove(this._classErrorInput);
      this._form.querySelector('.' + errorClass).textContent = '';
  };

  _isValid(inputItem){
    this.errorClass = this._classErrorText + `-${inputItem.getAttribute('name')}`;
    if(!inputItem.validity.valid){
      this._showInputError(inputItem, this.errorClass, inputItem.validationMessage);
    }else{
      this._hideInputError(inputItem, this.errorClass);
    }
  }

  _hasInvalidInput(){
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  }

  disableButtonForm(){
    this._buttonSubmitForm.setAttribute('disabled', true);
    this._buttonSubmitForm.classList.add(this._inactiveButtonClass);
  }
  activateButtonForm(){
    this._buttonSubmitForm.removeAttribute('disabled');
    this._buttonSubmitForm.classList.remove(this._inactiveButtonClass);

  }

  _toggleButtonState(){
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButtonForm();
    } else {
      this.activateButtonForm();
    }
  }

  enableValidation(){
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem);
        this._toggleButtonState();
      });
    });
  }

  clearValidation(){
    this._inputList.forEach((inputItem) => {
      inputItem.classList.remove(this._classErrorInput);
    });

    this.errorList.forEach((errorBlock) => {
      errorBlock.textContent = '';
    });
    this._toggleButtonState();
  };
}
