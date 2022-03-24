import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  // селектор класса передается в конструктор c точкой
  constructor(selectorPopup) {
    super(selectorPopup);
    this._src = '';
    this._text = '';

    this.fullPicter = this._popup.querySelector('.fullimage__image');
    this.fullText = this._popup.querySelector('.fullimage__text');
  }

  setPicterParam(src, text) {
    this._src = src;
    this._text = text;
  }

  // переопределяем родительский метод, добавляя параметры изображения
  open() {
    this.fullPicter.src = this._src;
    this.fullPicter.alt = this._text;
    this.fullText.textContent = this._text;
    super.open();
  }
}



