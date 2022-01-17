let user = document.querySelector('.profile__title');
let job = document.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let editUser = document.getElementById('user');
let editAbout = document.getElementById('about');

// обработчик события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', () => {
    editUser.value = user.textContent;
    editAbout.value = job.textContent;
    popup.classList.add('popup_opened');
});

// обработчик события click кнопки закрытия окна редактирования .popup__btn-close
document.querySelector('.popup__btn-close').addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

// обработчик события click кнопки Сохранить окна редактирования .popup__btn-save
document.querySelector('.popup__btn-save').addEventListener('click', () => {
    user.textContent = editUser.value;
    job.textContent = editAbout.value;   
    popup.classList.remove('popup_opened');
});





