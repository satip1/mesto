import { objForm } from '../utilits/initial-data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Formvalidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/Userinfo.js';
import { Api } from '../components/Api.js';
import {
  editUser, editAbout, tempSelector,
  validClass, popupsObject,
  servAdress, servToken
} from '../utilits/constants.js';

// импорт главного файла стилей
import '../pages/index.css'


let sectionFoto;
const userAbout = new UserInfo('.profile__title', '.profile__text', '.profile__avatar');
const api = new Api(servAdress, servToken);


// создание разметки новой карточки фото
function creatNewCard(dataFoto, temp = tempSelector) {
  const fotoCard = new Card(dataFoto, temp, handleCardClick, handleToggleLikeCard, handleDeleteCard);
  return fotoCard.createCard()
}

// инициализация popup и их обраобтчиков
function initPopup() {
  popupsObject.editprofile = new PopupWithForm('.editprofile', handleSubmitEditProfileForm, objForm);
  popupsObject.editprofile.setEventListeners();
  popupsObject.addcard = new PopupWithForm('.addcard', handleSubmitAddcardForm, objForm);
  popupsObject.addcard.setEventListeners();
  popupsObject.editavatar = new PopupWithForm('.editavatar', handleSubmitEditAvatar, objForm);
  popupsObject.editavatar.setEventListeners();
  popupsObject.delCard = new PopupWithForm('.delCard', handleSubmitDelCard, objForm);
  popupsObject.delCard.setEventListeners();
  popupsObject.fullimage = new PopupWithImage('.fullimage');
  popupsObject.fullimage.setEventListeners();
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
function handleCardClick(objCard) {
  const data = objCard.getLinkMessage();
  popupsObject.fullimage.open(data.link, data.message);
}

// обработчик событий для лаков карточек
function handleToggleLikeCard(objCard) {
  objCard.setLockLike();
  if (objCard.getStateLike()) {
    api.deletLike(objCard._idPicture)
      .then(res => {
        objCard.changeStateLike(res.likes.length);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { objCard.setUnLockLike() })
  }
  else {
    api.addLike(objCard._idPicture)
      .then(res => {
        objCard.changeStateLike(res.likes.length);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { objCard.setUnLockLike() })
  }
}

// обработчик событий для удалния карточки, открывает попап подтверждения
function handleDeleteCard(objCard) {
  popupsObject.delCard.setData(objCard);
  popupsObject.delCard.open();
}

// обработчик события submit формы подтверждения удаления карточки
function handleSubmitDelCard(evt, popup) {
  evt.preventDefault();
  const elem = popup.getData();
  const id = elem.getCardIdPicture();
  api.deleteCurrentCard(id)
    .then(res => {
      elem.deleteCard()
      popup.close();
    })
    .catch(res => console.error('Ошибка удаления на сервере'));

}

// обработчики событий
// обработчик события click кнопки редактирования .profile__btn-edit
function handleClickProfileBtnEdit() {
  validClass.editprofile__form.resetValidation();
  const { name, info } = userAbout.getUserInfo();
  editUser.value = name;
  editAbout.value = info;
  popupsObject.editprofile.open();
}

// обработчик события submit формы редактирования .popup при нажатии кнопки Сохранить
function handleSubmitEditProfileForm(event, popup) {
  event.preventDefault();
  popup.setTextBtnSave(true);
  const { edit__name: dataUser, edit__about: dataJob } = popup.getInputValues();
  api.setProfileSave(dataUser, dataJob)
    .then(res => {
      userAbout.setUserInfo(res.name, res.about);
      popup.close();
    })
    .catch(err => {
      console.error('Ошибка загрузки изображения');
    })
    .finally(() => {
      popup.setTextBtnSave(false);
    })
}

// обработчик события click кнопки добавления карточки .profile__btn-add
function handleClickProfileBtnAdd() {
  validClass.addcard__form.resetValidation();
  popupsObject.addcard.open();
}

// обработчик события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
function handleSubmitAddcardForm(event, popup) {
  event.preventDefault();
  popup.setTextBtnSave(true);
  const idUserFoto = userAbout.getUserId();
  const { addcard__name: dataText, addcard__about: dataLink } = popup.getInputValues();
  api.recordNewCard(dataText, dataLink)
    .then(result => result)
    .then(res => {
      const dataFoto = {
        name: dataText.trim(),
        link: dataLink.trim(),
        like: 0,
        myLike: false,
        idAftorFoto: idUserFoto,
        idUser: idUserFoto,
        idPicture: res._id
      }
      sectionFoto.addItem('prepend', creatNewCard(dataFoto, tempSelector));
      popup.close()
    })
    .catch(err => {
      console.error('Ошибка загрузки изображения');
    })
    .finally(() => {
      popup.setTextBtnSave(false);
    })
}

// обработчик события click кнопки редактирования фотопользователя .profile__btn-avatar
function handleClickAvatarBtnEdit() {
  validClass.editavatar__form.resetValidation();
  popupsObject.editavatar.open();
}

// обработчик события submit формы редактирования фото пользователя .editavatar при нажатии кнопки Сохранить
function handleSubmitEditAvatar(event, popup) {
  event.preventDefault();
  const { editavatar__about: dataSrc } = popup.getInputValues();
  popup.setTextBtnSave(true);
  api.recordNewAvatar(dataSrc)
    .then(res => {
      userAbout.setUserAvatar(res.avatar);
      popup.close();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      popup.setTextBtnSave(false);
    })
}

// назначение обработчика события click кнопки смены фото пользователя profile__btn-avatar
document.querySelector('.profile__btn-avatar').addEventListener('click', handleClickAvatarBtnEdit);

// назначение обработчика события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', handleClickProfileBtnEdit);

// назначение обработчка события click кнопки добавления карточки .profile__btn-add
document.querySelector('.profile__btn-add').addEventListener('click', handleClickProfileBtnAdd);


// обработка запроса на заполнение занчениями объекта пользователя
function processAPIUserAbout(res) {
  userAbout.setUserInfo(res.name, res.about);
  userAbout.setUserId(res._id)
  userAbout.setUserAvatar(res.avatar);
}

// обработка запроса на заполнение карточками с фото
function processAPICreatSectionFoto(res) {
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
}


initPopup();
initValidForm();

Promise.all([api.getUserData(), api.getInitCard()])
  .then(res => {
    processAPIUserAbout(res[0]);
    processAPICreatSectionFoto(res[1]);
  })
  .catch(err => console.log('Что-то пошло нет так'))











