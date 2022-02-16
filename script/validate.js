// валидация формы при открытии
function validationOpenForm(block) {
    const errorMessage = block.querySelectorAll(objForm.errorSelector);
    errorMessage.forEach((item) => {
        item.textContent = '';
        item.classList.remove(objForm.errorClass);
    });
    const errorInput = block.querySelectorAll(objForm.inputSelector);
    errorInput.forEach((item) => {
        item.classList.remove(objForm.inputErrorClass);
    });
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
            field.addEventListener('input', (evt) => checkInputValid(field, obj, form, btnSave));
            field.addEventListener('keydown', (evt) => evt.stopPropagation());
        })
    });
}

enableValidation(objForm);