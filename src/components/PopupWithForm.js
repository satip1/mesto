import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  // селектор класса передается в конструктор c точкой
  constructor(selectorPopup, evtSubmit, obj) {
    super(selectorPopup);
    this._evtSubmit = evtSubmit.bind(this);
    this._selectorForm = obj.formSelector;
    this._selectorInput = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;

    this._form = this._popup.querySelector(this._selectorForm);
    this._submit = this._popup.querySelector(this._submitButtonSelector);
    this._formInputs = this._popup.querySelectorAll(this._selectorInput);
  }

  // возвращает объект со значениями полей ввода input формы
  getInputValues() {
    this._formValues = {};
    this._formInputs.forEach(item => {
      this._formValues[item.name] = item.value
    });
    return this._formValues
  }

  // закрывает форму с очисткой полей ввода
  close() {
    this._form.reset();
    super.close();
  }

  // данные о карточке при открытии попапа подтверждения удаления
  setDelCard(element) {
    this._element = element;
  }

  // возврат данных о карточке на удаление, записанной при открытии попапа подтверждения удаления
  getDelCard() {
    return this._element
  }

  // назначает события кликов, esc родительского класса и сабмита
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => { this._evtSubmit(evt, this) })
  }

  setTextBtnSave(flag) {
    if (flag) {
      this._submit.textContent = 'Сохранение ...';
      this._submit.disabled = true;
    }
    else {
      this._submit.textContent = 'Сохранить';
      this._submit.disabled = false;
    }
  }






}
