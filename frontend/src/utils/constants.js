export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit-error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const apiOptions = {
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
}
