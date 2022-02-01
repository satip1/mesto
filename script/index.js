const user = document.querySelector('.profile__title');
const job = document.querySelector('.profile__text');
const popup = document.querySelector('.popup');
const editUser = document.getElementById('user');
const editAbout = document.getElementById('about');
const foto = document.querySelector('.foto');
const tempCart = document.querySelector('.tempcart').content;
const addCart = document.querySelector('.addcart');
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

// удаление карточки .foto__cart в таблице
function deleteCart(evt) {
    evt.parentElement.remove();
}

// отмечаем лайк .foto__like в карточке .foto__cart в таблице
function noteLikeCart(evt) {
    evt.classList.toggle('foto__like_plus');
}

// создает новый объект карточки .foto__cart
function creatNewCart(place, path) {
    let newCart = tempCart.cloneNode(true);
    let newImage = newCart.querySelector('.foto__image');
    let newTitle = newCart.querySelector('.foto__text');

    newTitle.textContent = place;
    newImage.src = path;
    newImage.alt = place;
    newImage.onerror = () => {
        newImage.src = '../images/nofoto.png';
        newImage.alt = 'Ошибка загрузки изображения'; newTitle.textContent = newImage.alt;
    }
    return newCart
}

// добавляем один объект новой карточки в таблицу .foto
function addNewCart(fotoCart) {
    foto.prepend(fotoCart);
}

// передает параметры изображения в полноэкранный просмотр 
function demoFullImage(target) {
    fullPicter.src = target.src;
    fullPicter.alt = target.alt;
    fullText.textContent = target.alt;
    fullImage.classList.add('fullimage_opened');
}

// инициализация блока карточек .foto
function initCards(listCards) {
    initialCards.forEach((item) => {
        foto.append(creatNewCart(item.name, item.link))
    })
}

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

// обработчик события submit формы редактирования .popup при нажатии кнопки Сохранить
document.querySelector('.popup__form').addEventListener('submit', (event) => {
    event.preventDefault();
    user.textContent = editUser.value;
    job.textContent = editAbout.value;
    popup.classList.remove('popup_opened');
});

// обработчик события click кнопки добавления карточки .profile__btn-add 
document.querySelector('.profile__btn-add').addEventListener('click', () => {
    addPlace.value = '';
    addHref.value = '';
    addPlace.placeholder = 'Название';
    addHref.placeholder = 'Ссылка на картинку';
    addCart.classList.add('addcart_opened');
})

// обработчик события click кнопки закрытия окна редактирования .addcart__btn-close
document.querySelector('.addcart__btn-close').addEventListener('click', () => {
    addCart.classList.remove('addcart_opened');
});

// обработчик события submit формы добавления карточки .addcart при нажатии кнопки Сохранить
document.querySelector('.addcart__form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(addPlace.value) || !(addHref.value)) {
        addPlace.placeholder = 'Поле названия нельзя оставлять пустым';
        addHref.placeholder = 'Ссылка на картинку не может быть пустой';
        return
    }
    let a = creatNewCart(addPlace.value.trim(), addHref.value.trim());
    addNewCart(a);
    addCart.classList.remove('addcart_opened');
});

// обработчик события click кнопки закрытия окна полноразмерного просмотра .fullimage__btn-close
document.querySelector('.fullimage__btn-close').addEventListener('click', () => {
    fullImage.classList.remove('fullimage_opened');
});

// обработчик событий в карточках фото
foto.addEventListener('click', function (evt) {
    let target = evt.target;
    if (target.className === 'foto__trash') { deleteCart(target); }
    else if (target.className === 'foto__image') { demoFullImage(target); }
    else if (target.classList.contains('foto__like')) { noteLikeCart(target); }
    evt.stopPropagation();
})



initCards(initialCards);






















