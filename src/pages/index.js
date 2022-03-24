// import { initialCards, objForm } from '../script/initial-data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Formvalidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/Userinfo.js';

// импорт главного файла стилей
import '../pages/index.css'

// импорт картинок
import pic_1 from '../images/foto-1.jpg';
import pic_2 from '../images/foto-2.jpg';
import pic_3 from '../images/foto-3.jpg';
import pic_4 from '../images/foto-4.jpg';
import pic_5 from '../images/foto-5.jpg';
import pic_6 from '../images/foto-6.jpg';
// import nofoto from '../images/nofoto.png';

const initialCards = [
  {
      name: 'Мужик на велосипеде cgdfg fgdf dfg',
      link: pic_1
  },
  {
      name: 'Олень',
      link: pic_2
  },
  {
      name: 'Итальянская улица',
      link: pic_3
  },
  {
      name: 'Марс',
      link: pic_4
  },
  {
      name: 'Юпитер. Большое красное пятно',
      link: pic_5
  },
  {
      name: 'Мужик на велосипеде',
      link: pic_6
  }
];

// данные о формах для их валидации
const objForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

const editUser = document.getElementById('user');
const editAbout = document.getElementById('about');
const fotoSection = document.querySelector('.foto');
const tempSelector = '.tempcart';
const validClass = {};
const arrPopup = {};
const userAbout = new UserInfo('.profile__title', '.profile__text');

// инициализация карточек
function initFoto() {
  // console.log(initialCards);
  const sectionFoto = new Section({items: initialCards, renderer: renderCards},'.foto');
  sectionFoto.renderItems();
}

// отрисовка карточки приинициализации
function renderCards({name, link}, ) {
  const fotoCard = new Card(name, link, tempSelector, handleCardClick);
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
  console.log(this._message);
  arrPopup.fullimage.setPicterParam(this._src, this._message)
  arrPopup.fullimage.open();
}

// создание новой карточки фото
function creatNewCard(name, link, temp = tempSelector) {
  const fotoCard = new Card(name, link, temp, handleCardClick);
  return fotoCard.createCard()
}

// обработчики событий
// обработчик события click кнопки редактирования .profile__btn-edit
function handleClickProfileBtnEdit() {
  const {name, info} = userAbout.getUserInfo();
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
  fotoSection.prepend(creatNewCard(dataText.trim(), dataLink.trim(), tempSelector));
  this.close();
}
// назначение обработчика события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', handleClickProfileBtnEdit);

// назначение обработчка события click кнопки добавления карточки .profile__btn-add
document.querySelector('.profile__btn-add').addEventListener('click', handleClickProfileBtnAdd);


initPopup();
initValidForm();
initFoto();







