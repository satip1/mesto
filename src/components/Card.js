// модуль класса карточки фото

// картинка для ошибки загрузки через вебпак
import nofoto from '../images/nofoto.png';

export class Card {
  constructor(message, path, count, myLike, idAftorFoto, idUser, idPicture, template, handleCardClick, handleToggleLikeCard, handleDeleteCard) {
    // текст подписи под картинкой
    this._message = message;
    // адрес файла с картинкой
    this._src = path;
    // количество лайков
    this._count = count;
    // флаг лайка пользователя в момент первоначальной загрузки
    this._myLike = myLike;
    // id автора фото
    this._idAftorFoto = idAftorFoto;
    // id текущего пользователя
    this._idUser = idUser;
    // id самой картинки
    this._idPicture = idPicture;
    // шаблон для отображения карточки
    this._template = template;

    this._handleCardClick = handleCardClick.bind(this);
    this._handleToggleLikeCard = handleToggleLikeCard.bind(this);
    this._handleDeleteCard = handleDeleteCard.bind(this);
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
    this._number = this._element.querySelector('.foto__count');
    this._mark = this._element.querySelector('.foto__mark');
  }

  // обработчики событий для элементов карточки
  // удаление карточки
  // _handleDeleteCard() {
  //   this._element.remove();
  // }

  // открытие в полноэкранном просмотре
  _handleOpenFullImage(evt) {
    evt.stopPropagation();
    this._handleCardClick();
  }

  // установка обработчиков событий
  _setEventListeners() {
    // удаление карточки
    // console.log(this._idUser, this._idAftorFoto)
    if (this._idUser === this._idAftorFoto) { this._trash.addEventListener('click', () => { this._handleDeleteCard() }) }
    else { this._trash.classList.add('foto__trash_disabled'); }
    // отметка лайка карточки
    this._like.addEventListener('click', () => { this._handleToggleLikeCard() });
    // полноэкранный просмотр фото
    this._image.addEventListener('click', (evt) => { this._handleOpenFullImage(evt) });
  }


  deleteCard() {
    this._element.remove()
  }

  // публичный метод, создающий полностью готовую карточку
  createCard() {
    // создали элемент
    this._getTemplate();
    // изменили картинку и текст
    this._text.textContent = this._message;
    this._number.textContent = this._count;
    this._image.src = this._src;
    this._image.alt = this._message;
    if (this._myLike) this._like.classList.toggle('foto__like_plus');
    // если картинка с адресом в this._src не загрузится, то загрузится картинка с сообщением об ошибке
    this._image.onerror = () => {
      this._message = `Ошибка загрузки ${this._message}. По указанному адресу файл недоступен`;
      this._src = nofoto;
      this._image.src = nofoto;
      this._text.textContent = this._message;
      this._number.textContent = '0';
      this._image.alt = this._message;
      this._idUser = 'Error'
      this._idAftorFoto = 'Error';
      this._trash.classList.remove('foto__trash_disabled');
      this._mark.classList.remove('foto__mark');
      this._mark.classList.add('foto__trash_disabled');
      this._trash.addEventListener('click', () => { this._handleDeleteCard() });
    }
    this._setEventListeners();
    return this._element;
  }
}
