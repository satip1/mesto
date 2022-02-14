const objForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
}

// скрыть ошибки поля ввода input 
function hiddeError(elem, message, classInput, classMessage) {
    message.textContent = '';
    message.classList.remove(classMessage);
    elem.classList.remove(classInput);
}

// показать ошибки поля ввода input 
function showError(elem, message, classInput, classMessage) {
    message.textContent = elem.validationMessage;
    message.classList.add(classMessage);
    elem.classList.add(classInput);
}

// блокировка и разблокировка кнопки сохранения формы блока popup
function checkBtnSaveValid(form, btn, inactiveButtonClass) {
    if (!form.checkValidity()) {
        btn.setAttribute('disabled', '');
        btn.classList.add(inactiveButtonClass);
    }
    else {
        btn.removeAttribute('disabled');
        btn.classList.remove(inactiveButtonClass);
    }
}

// обработчик для валидации поля ввода по событию input
function checkInputValid(item, obj, form, btn) {
    const currentForm = item.closest(obj.formSelector);
    const messageError = currentForm.querySelector(`.${item.id}-error`);
    if (item.validity.valid) hiddeError(item, messageError, obj.inputErrorClass, obj.errorClass)
    else showError(item, messageError, obj.inputErrorClass, obj.errorClass);
    checkBtnSaveValid(form, btn, obj.inactiveButtonClass);
}

// назначение событий валидации всем формам
function enableValidation(obj) {
    const forms = document.querySelectorAll(obj.formSelector);
    forms.forEach((form) => {
        const inputFields = form.querySelectorAll(obj.inputSelector);
        const btnSave = form.querySelector(obj.submitButtonSelector);
        inputFields.forEach((field) => {
            field.addEventListener('input', () => checkInputValid(field, obj, form, btnSave))
        })
    });
}

enableValidation(objForm);