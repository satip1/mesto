// модуль класса карточки фото
export class Card {
  constructor(message, path, template) {
    this._message = message;
    this._src = path;
    this._template = template;
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
  _handlerDeleteCard() {
    this._element.remove();
  }

  // отметка лайк .foto__like в карточке
  _handlerToggleLikeCard() {
    this._like.classList.toggle('foto__like_plus');
  }

  // полноэкранный просмотр фото
  _togglePopup(block) {
    block.classList.toggle('popup_opened');
  }

  // закрытие окна popup и его событий
  _closePopup(block) {
    this._togglePopup(block);
    window.onkeydown = null;
  }

  // функция для обработчика Escape для popup на закрытие
  _closeEscapePopup(evt, block) {
    if ((evt.key === 'Escape') || (evt.key === 'Enter')) {
      evt.preventDefault();
      this._closePopup(block);
    }
  }

  // назначение событий по нажатию кнопки Escape окну popup при открытии
  _openPopupEvent(block) {
    window.onkeydown = (evt) => this._closeEscapePopup(evt, block);
  }

  // назначение события click по оверлею закрятия окна popup
  _initOverlayClose(block) {
    block.addEventListener('click', (evt) => {
        if (evt.target === block) this._closePopup(block)
    });
}

  _handlerOpenFullImage(evt) {
    evt.stopPropagation();
    this._fullImage = document.querySelector('.fullimage');
    this._fullImage.querySelector('.fullimage__image').src = this._src;
    this._fullImage.querySelector('.fullimage__image').alt = this._message;
    this._fullImage.querySelector('.fullimage__text').textContent = this._message;
    // назначаем обработчик на по нажатию кнопки Escape окну popup
    this._openPopupEvent(this._fullImage);
    // открываем окно
    this._togglePopup(this._fullImage);
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
    // установка обработчиков событий
    // удаление карточки
    this._trash.addEventListener('click', () => { this._handlerDeleteCard() });
    // отметка лайка карточки
    this._like.addEventListener('click', () => { this._handlerToggleLikeCard() });
    // полноэкранный просмотр фото
    this._image.addEventListener('click', (evt) => { this._handlerOpenFullImage(evt) });

    return this._element;
  }
}
