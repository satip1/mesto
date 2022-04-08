import { objForm } from '../utilits/initial-data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Formvalidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/Userinfo.js';
import { Api } from '../components/Api.js';

// импорт главного файла стилей
import '../pages/index.css'

const editUser = document.querySelector('.popup__input_user');
const editAbout = document.querySelector('.popup__input_about');
const btnSaveAvatar = document.querySelector('.editavatar__btn-save');
const btnSaveProfile = document.querySelector('.editprofile__btn-save');
const btnSaveAdd = document.querySelector('.addcard__btn-save');
const tempSelector = '.tempcart';
const validClass = {};
const arrPopup = {};
const userAbout = new UserInfo('.profile__title', '.profile__text', '.profile__avatar');

// const sectionFoto = new Section({ items: initialCards, renderer: creatNewCard }, '.foto');


const servAdress = 'https://mesto.nomoreparties.co/v1/cohort-39';
const servToken = {
  headers: {
    authorization: '58a2884c-c32e-4a00-89a4-083f16aca954',
    'Content-Type': 'application/json'
  }
}
const api = new Api(servAdress, servToken);
let sectionFoto;



// инициализация карточек
function initFoto() {
  sectionFoto.renderItems();
}

// создание разметки новой карточки фото
function creatNewCard({ name, link, like, myLike, idAftorFoto, idUser, idPicture }, temp = tempSelector) {
  const fotoCard = new Card(name, link, like, myLike, idAftorFoto, idUser, idPicture, temp, handleCardClick, handleToggleLikeCard, handleDeleteCard);
  return fotoCard.createCard()
}

// инициализация popup и их обраобтчиков
function initPopup() {
  arrPopup.editprofile = new PopupWithForm('.editprofile', handleSubmitEditProfileForm, objForm);
  arrPopup.editprofile.setEventListeners();
  arrPopup.addcard = new PopupWithForm('.addcard', handleSubmitAddcardForm, objForm);
  arrPopup.addcard.setEventListeners();
  arrPopup.editavatar = new PopupWithForm('.editavatar', handleSubmitEditAvatar, objForm);
  arrPopup.editavatar.setEventListeners();
  arrPopup.delCard = new PopupWithForm('.delCard', handleSubmitDelCard, objForm);
  arrPopup.delCard.setEventListeners();
  arrPopup.fullimage = new PopupWithImage('.fullimage');
  arrPopup.fullimage.setEventListeners();
}
// инициализация валидации форм
function initValidForm() {
  const popupForms = document.querySelectorAll('.popup__form');
  popupForms.forEach((form) => {
    validClass[form.classList[1]] = new FormValidator(objForm, form.classList[1]);
    validClass[form.classList[1]].enableValidation();
  })
}

// открытие фото для полноэкранного просмотра
function handleCardClick() {
  arrPopup.fullimage.setPicterParam(this._src, this._message)
  arrPopup.fullimage.open();
}

// обработчик событий для лаков карточек
function handleToggleLikeCard() {
  if (this._like.classList.contains('foto__like_plus')) {
    this._like.disabled = true;
    api.deletLike(this._idPicture)
      .then(res => {
        this._number.textContent = res.likes.length;
        this._like.disabled = false;
        this._like.classList.toggle('foto__like_plus');
      })
      .catch(err => {
        this._like.disabled = false;
        console.log(err);
      })
  }
  else {
    this._like.disabled = true;
    api.addLike(this._idPicture)
      .then(res => {
        this._like.disabled = false;
        this._number.textContent = res.likes.length;
        this._like.classList.toggle('foto__like_plus');
      })
      .catch(err => {
        this._like.disabled = false;
        console.log(err);
      })
  }

}

// обработчик событий для удалния карточки
function handleDeleteCard() {
  if (this._idUser == 'Error') {
    console.log('Удаление незагрузившейся картинки.');
    this._element.remove();
    return
  }
  arrPopup.delCard.openDel(this._idPicture, this);
}

// обработчик события submit формы подтверждения удаления карточки
function handleSubmitDelCard(evt) {
  evt.preventDefault();
  api.deleteCurrentCard(this._id)
    .then(res => this._element.deleteCard())
    .catch(res => console.error('Ошибка удаления на сервере'));
    this.closeWithoutReset();
}

// обработчики событий
// обработчик события click кнопки редактирования .profile__btn-edit
function handleClickProfileBtnEdit() {
  const { name, info } = userAbout.getUserInfo();
  editUser.value = name;
  editAbout.value = info;
  arrPopup.editprofile.open();
}

// обработчик события submit формы редактирования .popup при нажатии кнопки Сохранить
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  btnSaveProfile.textContent = 'Сохранение ...';
  btnSaveProfile.disabled = true;
  const [dataUser, dataJob] = this._getInputValues();
  // profileBtnEdit.textContent = 'Cccc';
  Promise.resolve(api.setProfileSave(dataUser, dataJob))
    .then(res => {
      userAbout.setUserInfo(res.name, res.about);
      this.close();
      btnSaveProfile.textContent = 'Сохранить';
      btnSaveProfile.disabled = false;
    }
    );

}

// обработчик события click кнопки добавления карточки .profile__btn-add
function handleClickProfileBtnAdd() {
  arrPopup.addcard.open();
}

// обработчик события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
function handleSubmitAddcardForm(event) {
  event.preventDefault();
  btnSaveAdd.textContent = 'Сохранение ...';
  btnSaveAdd.disabled = true;
  const idUserFoto = userAbout.getUserId();
  const [dataText, dataLink] = this._getInputValues();
  api.recordNewCard(dataText, dataLink)
    .then(result => result)
    .then(res => {
      // console.log(res);
      sectionFoto.addItem('prepend', creatNewCard({
        name: dataText.trim(),
        link: dataLink.trim(),
        like: 0,
        myLike: false,
        idAftorFoto: idUserFoto,
        idUser: idUserFoto,
        idPicture: res._id
      }, tempSelector));
      btnSaveAdd.textContent = 'Сохранить';
      btnSaveAdd.disabled = false;
      this.close();
    })
    .catch(err => {
      console.error('Ошибка загрузки изображения');
      btnSaveAdd.textContent = 'Сохранить';
      btnSaveAdd.disabled = false;
      this.close();
    });
}

// обработчик события click кнопки редактирования фотопользователя .profile__btn-avatar
function handleClickAvatarBtnEdit() {
  arrPopup.editavatar.open();
}

// обработчик события submit формы редактирования фото пользователя .editavatar при нажатии кнопки Сохранить
function handleSubmitEditAvatar(event) {
  event.preventDefault();
  const [dataSrc] = this._getInputValues();
  btnSaveAvatar.textContent = 'Сохранение ...';
  btnSaveAvatar.disabled = true;
  api.recordNewAvatar(dataSrc)
    .then(res => {
      userAbout.setUserAvatar(res.avatar);
      btnSaveAvatar.textContent = 'Сохранить';
      btnSaveAvatar.disabled = false;
      this.close();
    })
    .catch(err => {
      btnSaveAvatar.textContent = 'Сохраненить';
      btnSaveAvatar.disabled = false;
      console.log(err)
    })
}

// назначение обработчика события click кнопки смены фото пользователя profile__btn-avatar
document.querySelector('.profile__btn-avatar').addEventListener('click', handleClickAvatarBtnEdit);

// назначение обработчика события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', handleClickProfileBtnEdit);

// назначение обработчка события click кнопки добавления карточки .profile__btn-add
document.querySelector('.profile__btn-add').addEventListener('click', handleClickProfileBtnAdd);


initPopup();
initValidForm();

// инициализация профиля пользователя
api.getUserData()
  .then(res => {
    userAbout.setUserInfo(res.name, res.about);
    userAbout.setUserId(res._id)
    userAbout.setUserAvatar(res.avatar);
  })
  .catch(err => console.log(err))

// инициализация карточек
api.getInitCard()
  .then(res => {
    // console.log(res)
    let initialCards = [];
    const idUserFoto = userAbout.getUserId();
    let trueLike = '';
    initialCards = res.map(item => {
      trueLike = item.likes.find((item, index) => item._id == idUserFoto);
      if (trueLike) trueLike = true
      else trueLike = false;
      return {
        name: item.name,
        link: item.link,
        like: item.likes.length,
        myLike: trueLike,
        idAftorFoto: item.owner._id,
        idUser: idUserFoto,
        idPicture: item._id
      }
    })
    sectionFoto = new Section({ items: initialCards, renderer: creatNewCard }, '.foto');
    sectionFoto.renderItems();
  })
  .catch(err => console.log(err))














