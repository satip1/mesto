export class Popup {
  // селектор класса передается в конструктор c точкой
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(this._selectorPopup);
    this._handleEscClose = this._popupEscClose.bind(this)
  }
  // открытие popup
  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }
  // закрытие popup
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }

  // логика закрытия popup при нажатии по Esc
  _popupEscClose(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.close();
    }
  }
  // назначает обработчик popup по клику на крестик и оверлей
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    })
  }
}
