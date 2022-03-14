import { initialCards, objForm } from './initial-data.js';
import { Card } from './Card.js';
import { FormValidator } from './Formvalidator.js';

const user = document.querySelector('.profile__title');
const job = document.querySelector('.profile__text');
const editProfile = document.querySelector('.editprofile');
const editUser = document.getElementById('user');
const editAbout = document.getElementById('about');
const editBtnSave = document.querySelector('.editprofile__btn-save');
const fotoSection = document.querySelector('.foto');
const tempCart = document.querySelector('.tempcart').content;
const addCard = document.querySelector('.addcard');
const addBtnSave = document.querySelector('.addcard__btn-save');
const addPlace = document.getElementById('place');
const addHref = document.getElementById('href');
const fullImage = document.querySelector('.fullimage');
const fullPicter = fullImage.querySelector('.fullimage__image');
const fullText = fullImage.querySelector('.fullimage__text');
const tempSelector = '.tempcart';
const validClass = {};

// функция для обработчика Escape для popup на закрытие
function closeEscapePopup(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const block = document.querySelector('.popup_opened');
    closePopup(block);
  }
}

// открытие popup
function openPopup(block) {
  block.classList.add('popup_opened');
  window.addEventListener('keydown', closeEscapePopup);
}

// закрытие окна popup и его событий
function closePopup(block) {
  block.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeEscapePopup);
}

// инициализация закрытия popup кликами по оверлею и кнопкам
function initClosePopup() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__btn-close')) {
        // evt.stopPropagation();
        closePopup(popup);
      }
    })
  })
}

// создание новой карточки фото
function creatNewCard(name, link, temp) {
  const fotoCard = new Card(name, link, temp, handleCardClick);
  return fotoCard.createCard()
}

// инициализация блока карточек .foto
function initCards(listCards) {
  listCards.forEach((item) => {
    fotoSection.append(creatNewCard(item.name, item.link, tempSelector));
  })
}

// очистка инпутов и блокировка кнопки сохранения формы
function clearFormCard(form) {
  validClass[form.classList[1]].resetValidation();
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
function handleCardClick(name, link) {
  fullPicter.src = link;
  fullPicter.alt = name;
  fullText.textContent = name;
  openPopup(fullImage);
}


// обработчики событий
// обработчик события click кнопки редактирования .profile__btn-edit
function handleClickProfileBtnEdit() {
  editUser.value = user.textContent;
  editAbout.value = job.textContent;
  openPopup(editProfile);
}

// обработчик события submit формы редактирования .popup при нажатии кнопки Сохранить
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  user.textContent = editUser.value;
  job.textContent = editAbout.value;
  closePopup(editProfile);
  clearFormCard(event.currentTarget);
}

// обработчик события click кнопки добавления карточки .profile__btn-add
function handleClickProfileBtnAdd() {
  addPlace.value = '';
  addHref.value = '';
  openPopup(addCard);
}

// обработчик события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
function handleSubmitAddcardForm(event) {
  event.preventDefault();
  fotoSection.prepend(creatNewCard(addPlace.value.trim(), addHref.value.trim(), tempSelector));
  clearFormCard(event.currentTarget);
  closePopup(addCard);
}

// назначение обработчика события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', handleClickProfileBtnEdit);

// назначение обработчика события submit формы редактирования .popup при нажатии кнопки Сохранить
document.querySelector('.editprofile__form').addEventListener('submit', handleSubmitEditProfileForm);

// назначение обработчка события click кнопки добавления карточки .profile__btn-add
document.querySelector('.profile__btn-add').addEventListener('click', handleClickProfileBtnAdd);

// назначение обработчика события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
document.querySelector('.addcard__form').addEventListener('submit', handleSubmitAddcardForm);


initClosePopup();
initCards(initialCards);
initValidForm();
