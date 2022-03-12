// модуль класса карточки фото
export class Card {
  constructor(message, path, template, handleCardClick) {
    this._message = message;
    this._src = path;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  // клонирование html структуры карточки
  _getTemplate() {
    this._element = document
      .querySelector(this._template)
      .content
      .querySelector('.foto__card')
      .cloneNode(true);

    this._text = this._element.querySelector('.foto__text');
    this._trash = this._element.querySelector('.foto__trash');
    this._image = this._element.querySelector('.foto__image');
    this._like = this._element.querySelector('.foto__like');
  }
  // обработчики событий для элементов карточки
  // удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // отметка лайк .foto__like в карточке
  _handleToggleLikeCard() {
    this._like.classList.toggle('foto__like_plus');
  }

  _handleOpenFullImage(evt) {
    evt.stopPropagation();
    this._handleCardClick(this._message, this._src);
  }

_setEventListeners(){
    // установка обработчиков событий
    // удаление карточки
    this._trash.addEventListener('click', () => { this._handleDeleteCard() });
    // отметка лайка карточки
    this._like.addEventListener('click', () => { this._handleToggleLikeCard() });
    // полноэкранный просмотр фото
    this._image.addEventListener('click', (evt) => { this._handleOpenFullImage(evt) });
}


  // публичный метод, создающий полностью готовую карточку
  creatCart() {
    // создали элемент
    this._getTemplate();
    // изменили картинку и текст
    this._text.textContent = this._message;
    this._image.src = this._src;
    this._image.alt = this._message;
    // если картинка не загрузится, то загрузится картинка с сообщением об ошибке
    this._image.onerror = () => {
      this._src = './images/nofoto.png';
      this._message = `Ошибка загрузки ${this._message}`;
      this._text.textContent = this._message;
      this._image.src = this._src;
      this._image.alt = this._message;
    }
    this._setEventListeners();
    return this._element;
  }
}
