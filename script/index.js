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

// открытие и закрытие popup
function togglePopup(block) {
  block.classList.toggle('popup_opened');
}

// закрытие окна popup и его событий
function closePopup(block) {
  togglePopup(block);
  window.removeEventListener('keydown', closeEscapePopup);
}

// функция для обработчика Escape для popup на закрытие
function closeEscapePopup(evt) {
  if ((evt.key === 'Escape') || (evt.key === 'Enter')) {
    evt.preventDefault();
    const block = document.querySelector('.popup_opened');
    closePopup(block);
  }
}


// назначение событий по нажатию кнопки Escape окну popup при открытии
function openPopupEvent() {
  window.addEventListener('keydown', closeEscapePopup);
}

// назначение события click кнопки __btn-close закрятия окна popup
function initBtnClose(block) {
  document.querySelector(`.${block.classList[1]}__btn-close`).addEventListener('click', (evt) => {
    evt.stopPropagation();
    closePopup(block);
  });
}

// назначение события click по оверлею закрятия окна popup
function initOverlayClose(block) {
  block.addEventListener('click', (evt) => {
    if (evt.target === block) closePopup(block)
  });
}

// инициализация закрытия popup кликами по оверлею и кнопкам
function initClosePopup() {
  initBtnClose(editProfile);
  initBtnClose(addCard);
  initBtnClose(fullImage);

  initOverlayClose(editProfile);
  initOverlayClose(addCard);
  initOverlayClose(fullImage);
}

// создание новой карточки фото
function creatNewCard(name, link, temp) {
  const fotoCard = new Card(name, link, temp, handleCardClick);
  return fotoCard.creatCart()
}

// инициализация блока карточек .foto
function initCards(listCards) {
  listCards.forEach((item) => {
    fotoSection.append(creatNewCard(item.name, item.link, tempSelector));
  })
}

// общие операции при открытии popup c формами
function initOpenPopup(block) {
  togglePopup(block);
  openPopupEvent();
}

// очистка инпутов и блокировка кнопки сохранения формы добавления новой карточки addcard__form
function clearFormCard(form) {
  validClass[form.classList[1]].resetValidation();
}
// инициализация валидации форм
function initValidForm() {
  const popupForms = document.querySelectorAll('.popup');
  popupForms.forEach((form) => {
    const inputForm = form.querySelector('.popup__form');
    if (!inputForm) return;
    validClass[inputForm.classList[1]] = new FormValidator(objForm, form.classList[1]);
    validClass[inputForm.classList[1]].enableValidation();
  })
}

// открытие фото дляполноэкранного просмотра
function handleCardClick(name, link) {
  fullPicter.src = link;
  fullPicter.alt = name;
  fullText.textContent = name;
  openPopupEvent(fullImage);
  togglePopup(fullImage);
}


// обработчики событий
// обработчик события click кнопки редактирования .profile__btn-edit
function handleClickProfileBtnEdit() {
  editUser.value = user.textContent;
  editAbout.value = job.textContent;
  initOpenPopup(editProfile);
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
  initOpenPopup(addCard);
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















