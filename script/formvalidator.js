export class FormValidator {
  constructor(obj, typeform) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._currenform = typeform;
    this._form = document.querySelector(`.${typeform}`);
    this._btnSave = this._form.querySelector(this._submitButtonSelector);
    this._inputFields = this._form.querySelectorAll(this._inputSelector);
  }

// скрыть ошибки поля ввода input
_hiddeError(elem, message, classInput, classMessage) {
  message.textContent = '';
  message.classList.remove(this._errorClass);
  elem.classList.remove(this._inputErrorClass);
}

// показать ошибки поля ввода input
_showError(elem, message,classMessage) {
  message.textContent = elem.validationMessage;
  message.classList.add(this._errorClass);
  elem.classList.add(this._inputErrorClass);
}

// блокировка и разблокировка кнопки сохранения формы блока popup
_checkBtnSaveValid() {
  const validForm = this._form.querySelector('.popup__form');
  if (!validForm.checkValidity()) {
    this._btnSave.setAttribute('disabled', '');
    this._btnSave.classList.add(this._inactiveButtonClass);
  }
  else {
    this._btnSave.removeAttribute('disabled');
    this._btnSave.classList.remove(this._inactiveButtonClass);
  }
}

// обработчик для валидации поля ввода по событию input
_checkInputValid(item) {
  const messageError = this._form.querySelector(`.${item.id}-error`);
  if (item.validity.valid) this._hiddeError(item, messageError, this._inputErrorClass, this._errorClass)
  else this._showError(item, messageError);
  this._checkBtnSaveValid();
}
  // включение валидации полей формы
  enableValidation() {
    this._inputFields.forEach((field) => {
      field.addEventListener('input', () => this._checkInputValid(field));
      field.addEventListener('keydown', (evt) => evt.stopPropagation());
  })
}

  }







