import { initialCards, objForm } from '../utilits/initial-data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Formvalidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/Userinfo.js';

// импорт главного файла стилей
import '../pages/index.css'

const editUser = document.querySelector('.popup__input_user');
const editAbout = document.querySelector('.popup__input_about');
const tempSelector = '.tempcart';
const validClass = {};
const arrPopup = {};
const userAbout = new UserInfo('.profile__title', '.profile__text');
const sectionFoto = new Section({ items: initialCards, renderer: creatNewCard }, '.foto');


// инициализация карточек
function initFoto() {
  sectionFoto.renderItems();
}

// создание разметки новой карточки фото
function creatNewCard({name, link}, temp = tempSelector) {
  const fotoCard = new Card(name, link, temp, handleCardClick);
  return fotoCard.createCard()
}

// инициализация popup и их обраобтчиков
function initPopup() {
  arrPopup.editprofile = new PopupWithForm('.editprofile', handleSubmitEditProfileForm, objForm);
  arrPopup.editprofile.setEventListeners();
  arrPopup.addcard = new PopupWithForm('.addcard', handleSubmitAddcardForm, objForm);
  arrPopup.addcard.setEventListeners();
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
  const [dataUser, dataJob] = this._getInputValues();
  userAbout.setUserInfo(dataUser, dataJob);
  this.close();
}

// обработчик события click кнопки добавления карточки .profile__btn-add
function handleClickProfileBtnAdd() {
  arrPopup.addcard.open();
}

// обработчик события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
function handleSubmitAddcardForm(event) {
  event.preventDefault();
  const [dataText, dataLink] = this._getInputValues();
  sectionFoto.addItem('prepend', creatNewCard({name:dataText.trim(), link: dataLink.trim()}, tempSelector));
  this.close();
}
// назначение обработчика события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', handleClickProfileBtnEdit);

// назначение обработчка события click кнопки добавления карточки .profile__btn-add
document.querySelector('.profile__btn-add').addEventListener('click', handleClickProfileBtnAdd);


initPopup();
initValidForm();
initFoto();

