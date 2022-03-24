import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  // селектор класса передается в конструктор c точкой
  constructor(selectorPopup, evtSubmit, obj) {
    super(selectorPopup);
    this._evtSubmit = evtSubmit.bind(this);
    this._selectorForm = obj.formSelector;
    this._selectorInput = obj.inputSelector;

    this._form = this._popup.querySelector(this._selectorForm);
    this._formInput = this._popup.querySelectorAll(this._selectorInput);
  }

  // возвращает массив со строковыми значениями полей ввода input формы
  _getInputValues() {
    return Array.from(this._formInput).map(item => item.value);
  }

// закрывает форму с очисткой полей ввода
  close() {
    this._form.reset();
    super.close();
  }

  // назначает события кликов, esc родительского класса и сабмита
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._evtSubmit)
   }



}









