export default class ValidationForm {
  constructor (from){
    this._from = from;
    this.inputList = this._from['inputList'];
    this.formElement = this._from['formElement'];
    this.errorClassSpan = this._from['errorClassSpan'];
    this.errorClassInput = this._from['errorClassInput'];
    this.buttonForm = this._from['buttonForm'];
    this.errorList = this._from['errorList'];
    this._inactiveButtonClass = this._from['inactiveButtonClass'];
  }

  _showInputError(inputElement, errorClass, errorMessage) {
    inputElement.classList.add(this.errorClassInput);
    this.formElement.querySelector('.' + errorClass).textContent = errorMessage;
  };

  _hideInputError(inputElement, errorClass){
      inputElement.classList.remove(this.errorClassInput);
      this.formElement.querySelector('.' + errorClass).textContent = '';
  };

  _isValid(inputElement){
    this.errorClass = this.errorClassSpan + `-${inputElement.getAttribute('name')}`;
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, this.errorClass, inputElement.validationMessage);
    }else{
      this._hideInputError(inputElement, this.errorClass);
    }
  }

  _hasInvalidInput(){
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  disableButtonForm(){
    this.buttonForm.setAttribute('disabled', true);
    this.buttonForm.classList.add(this._inactiveButtonClass);
  }
  activateButtonForm(){
    this.buttonForm.removeAttribute('disabled');
    this.buttonForm.classList.remove(this._inactiveButtonClass);

  }

  _toggleButtonState(){
    if (this._hasInvalidInput(this.inputList)) {
      this.disableButtonForm();
    } else {
      this.activateButtonForm();
    }
  }

  enableValidation(){
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  clearValidation(){
    this.inputList.forEach((inputElement) => {
      inputElement.classList.remove(this.errorClassInput);
    });

    this.errorList.forEach((errorBlock) => {
      errorBlock.textContent = '';
    });
    this._toggleButtonState();
  };
}
