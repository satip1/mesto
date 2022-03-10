import { initialCards, objForm } from './initial-data.js';
import { Card } from './card.js';
import { FormValidator } from './formvalidator.js';

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
const tempSelector = '.tempcart';

// открытие и закрытие popup
function togglePopup(block) {
    block.classList.toggle('popup_opened');
}

// закрытие окна popup и его событий
function closePopup(block) {
    togglePopup(block);
    window.onkeydown = null;
}

// функция для обработчика Escape для popup на закрытие
function closeEscapePopup(evt, block) {
    if ((evt.key === 'Escape') || (evt.key === 'Enter')) {
        evt.preventDefault();
        closePopup(block);
    }
}

// назначение событий по нажатию кнопки Escape окну popup при открытии
function openPopupEvent(block) {
    window.onkeydown = (evt) => closeEscapePopup(evt, block);
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

// инициализация блока карточек .foto
function initCards(listCards) {
    listCards.forEach((item) => {
      const fotoCard = new Card (item.name, item.link, tempSelector);
        fotoSection.append(fotoCard.creatCart());
    })
}

// общие операции при открытии popup c формами
function initOpenPopup(block) {
    togglePopup(block);
    openPopupEvent(block);
}

// очистка инпутов и блокировка кнопки сохранения формы добавления новой карточки addcard__form
function clearFormAddCard(form) {
    form.reset();
    addBtnSave.setAttribute('disabled', '');
    addBtnSave.classList.add(objForm.inactiveButtonClass);
}
// инициализация валидации форм
function initValidForm() {
  const popupForm = document.querySelectorAll('.popup');
  popupForm.forEach((form) => {
    const inputForm = form.querySelector('.popup__input');
    if (!inputForm) return;
    const validClass = new FormValidator(objForm, form.classList[1]);
    validClass.enableValidation();
  })
}

// обработчики событий
// обработчик события click кнопки редактирования .profile__btn-edit
function handlerClickProfileBtnEdit() {
    editUser.value = user.textContent;
    editAbout.value = job.textContent;
    initOpenPopup(editProfile);
}

// обработчик события submit формы редактирования .popup при нажатии кнопки Сохранить
function handlerSubmitEditProfileForm(event) {
    event.preventDefault();
    user.textContent = editUser.value;
    job.textContent = editAbout.value;
    closePopup(editProfile);
    editBtnSave.classList.add('popup__btn-save_disabled');
    editBtnSave.setAttribute('disabled', '');
}

// обработчик события click кнопки добавления карточки .profile__btn-add
function handlerClickProfileBtnAdd() {
    addPlace.value = '';
    addHref.value = '';
    addPlace.placeholder = 'Название';
    addHref.placeholder = 'Ссылка на картинку';
    initOpenPopup(addCard);
}

// обработчик события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
function handlerSubmitAddcardForm(event) {
    event.preventDefault();
    const fotoCard = new Card (addPlace.value.trim(), addHref.value.trim(), tempSelector);
        fotoSection.append(fotoCard.creatCart());
    // const newCard = creatNewCard(addPlace.value.trim(), addHref.value.trim());
    // addNewCard(newCard);
    clearFormAddCard(event.currentTarget)
    closePopup(addCard);
}

// назначение обработчика события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', handlerClickProfileBtnEdit);

// назначение обработчика события submit формы редактирования .popup при нажатии кнопки Сохранить
document.querySelector('.editprofile__form').addEventListener('submit', handlerSubmitEditProfileForm);

// назначение обработчка события click кнопки добавления карточки .profile__btn-add
document.querySelector('.profile__btn-add').addEventListener('click', handlerClickProfileBtnAdd);

// назначение обработчика события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
document.querySelector('.addcard__form').addEventListener('submit', handlerSubmitAddcardForm);


initClosePopup();
initCards(initialCards);
initValidForm();















