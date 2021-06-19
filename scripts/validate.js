const enableValidation = (form) => {
  form['inputList'].forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form['formElement'], inputElement, form['errorClassSpan'], form['errorClassInput']);
      toggleButtonState(form['inputList'], form['buttonForm']);
    });
  });
};

const showInputError = (formElement, inputElement, errorClassSpan, errorClassInput, errorMessage) => {
  inputElement.classList.add(errorClassInput);
  formElement.querySelector('.' + errorClassSpan).textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, errorClassSpan, errorClassInput) => {
    inputElement.classList.remove(errorClassInput);
    formElement.querySelector('.' + errorClassSpan).textContent = '';
};

const isValid = (formElement, inputElement, errorClassSpan, errorClassInput) => {
  errorClassSpan = errorClassSpan + `-${inputElement.getAttribute('name')}`;
  if(!inputElement.validity.valid){

    showInputError(formElement, inputElement, errorClassSpan, errorClassInput, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement, errorClassSpan, errorClassInput);
  }
};

const toggleButtonState = (inputList, buttonForm) => {
  if (hasInvalidInput(inputList)) {
    buttonForm.setAttribute('disabled', true);
  } else {
    buttonForm.removeAttribute('disabled');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const clearValidation = (inputList, errorClassInput, errorList) => {
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(errorClassInput);
  });

  errorList.forEach((errorBlock) => {
    errorBlock.textContent = '';
  });
};
