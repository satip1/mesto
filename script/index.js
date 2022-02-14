const user = document.querySelector('.profile__title');
const job = document.querySelector('.profile__text');
const editProfile = document.querySelector('.editprofile');
const editUser = document.getElementById('user');
const editAbout = document.getElementById('about');
const fotoSection = document.querySelector('.foto');
const tempCart = document.querySelector('.tempcart').content;
const addCard = document.querySelector('.addcard');
const addPlace = document.getElementById('place');
const addHref = document.getElementById('href');
const fullImage = document.querySelector('.fullimage');
const fullPicter = fullImage.querySelector('.fullimage__image');
const fullText = fullImage.querySelector('.fullimage__text');

const initialCards = [
    {
        name: 'Мужик на велосипеде cgdfg fgdf dfg',
        link: './images/foto-1.jpg'
    },
    {
        name: 'Олень',
        link: './images/foto-2.jpg'
    },
    {
        name: 'Итальянская улица',
        link: './images/foto-3.jpg'
    },
    {
        name: 'Марс',
        link: './images/foto-4.jpg'
    },
    {
        name: 'Юпитер. Большое красное пятно',
        link: './images/foto-5.jpg'
    },
    {
        name: 'Мужик на велосипеде',
        link: './images/foto-6.jpg'
    }
];

// открытие и закрытие popup
function togglePopup(block) {
    block.classList.toggle('popup_opened');

}
// закрытие окна popup и его событий
function closePopup(block) {
    togglePopup(block);
    window.onkeydown = '';
}

// функция для обработчика Escape для popup на закрытие
function closeEscapePopup(evt, block) {
    if (evt.key === 'Escape') {
        closePopup(block);
    }
}

// назначение событий окну popup при открытии
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

// удаление карточки .foto__cart в таблице
function deleteCard(btn) {
    btn.closest('.foto__card').remove();
}

// отмечаем лайк .foto__like в карточке .foto__cart в таблице
function toggleLikeCard(like) {
    like.classList.toggle('foto__like_plus');
}

// создает новый объект карточки .foto__cart
function creatNewCard(place, path) {
    const newCart = tempCart.cloneNode(true);
    const newImage = newCart.querySelector('.foto__image');
    const newTitle = newCart.querySelector('.foto__text');

    newTitle.textContent = place;
    newImage.src = path;
    newImage.alt = place;
    newImage.onerror = () => {
        newImage.src = './images/nofoto.png';
        newImage.alt = `Ошибка загрузки ${place}`;
        newTitle.textContent = newImage.alt;
    }
    return newCart
}

// добавляем один объект новой карточки в таблицу .foto
function addNewCard(fotoCard) {
    fotoSection.prepend(fotoCard);
}

// передает параметры изображения в полноэкранный просмотр 
function openFullImage(target) {
    fullPicter.src = target.src;
    fullPicter.alt = target.alt;
    fullText.textContent = target.alt;
    openPopupEvent(fullImage);
    togglePopup(fullImage);
}

// инициализация блока карточек .foto
function initCards(listCards) {
    initialCards.forEach((item) => {
        fotoSection.append(creatNewCard(item.name, item.link))
    })
}

// валидация формы при открытии
function validationOpenForm(block) {
    const errorMessage = block.querySelectorAll('.popup__error');
    errorMessage.forEach((item) => {
        item.textContent = '';
        item.classList.remove('popup__error_active');
    });
    const errorInput = block.querySelectorAll('.popup__input');
    errorInput.forEach((item) => {
        item.classList.remove('popup__input_error');
    });
}

// обработчик события click кнопки редактирования .profile__btn-edit
document.querySelector('.profile__btn-edit').addEventListener('click', () => {
    editUser.value = user.textContent;
    editAbout.value = job.textContent;
    validationOpenForm(editProfile);
    togglePopup(editProfile);
    openPopupEvent(editProfile);

});

// обработчик события submit формы редактирования .popup при нажатии кнопки Сохранить
document.querySelector('.editprofile__form').addEventListener('submit', (event) => {
    event.preventDefault();
    user.textContent = editUser.value;
    job.textContent = editAbout.value;
    closePopup(editProfile);
});

// обработчик события click кнопки добавления карточки .profile__btn-add 
document.querySelector('.profile__btn-add').addEventListener('click', () => {
    addPlace.value = '';
    addHref.value = '';
    addPlace.placeholder = 'Название';
    addHref.placeholder = 'Ссылка на картинку';
    validationOpenForm(addCard);
    openPopupEvent(addCard);
    togglePopup(addCard);
})

// обработчик события submit формы добавления карточки .addcard при нажатии кнопки Сохранить
document.querySelector('.addcard__form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(addPlace.value) || !(addHref.value)) {
        addPlace.placeholder = 'Поле названия нельзя оставлять пустым';
        addHref.placeholder = 'Ссылка на картинку не может быть пустой';
        return
    }
    const newCard = creatNewCard(addPlace.value.trim(), addHref.value.trim());
    addNewCard(newCard);
    closePopup(addCard);
    // addPlace.value = '';
    // addHref.value = '';
});

// обработчик событий в карточках фото
fotoSection.addEventListener('click', function (evt) {
    const target = evt.target;
    if (target.className === 'foto__trash') { deleteCard(target); }
    else if (target.className === 'foto__image') { openFullImage(target); }
    else if (target.classList.contains('foto__like')) { toggleLikeCard(target); }
    evt.stopPropagation();
})

initClosePopup();
initCards(initialCards);













