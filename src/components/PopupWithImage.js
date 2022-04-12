import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  // селектор класса передается в конструктор c точкой
  constructor(selectorPopup) {
    super(selectorPopup);
    
    this.fullPicter = this._popup.querySelector('.fullimage__image');
    this.fullText = this._popup.querySelector('.fullimage__text');
  }

  // переопределяем родительский метод, добавляя параметры изображения
  open(src, text) {
    this.fullPicter.src = src;
    this.fullPicter.alt = text;
    this.fullText.textContent = text;
    super.open();
  }
}



