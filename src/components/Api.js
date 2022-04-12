// класс запросов на сервер

export class Api {
  constructor(baseUrl, header) {
    this._baseUrl = baseUrl;
    this._header = header;
  }

  // контроль положительного ответа и возврата тела запроса
  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // получить данные профиля пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, this._header)
      .then(this._checkResponse)
      // .then(result => result)

  }

  // получение карточек для инициализации
  getInitCard() {
    return fetch(`${this._baseUrl}/cards`, this._header)
      .then(this._checkResponse)
      // .then(result => result)

  }

  // сохранение профиля пользователя
  setProfileSave(newName, newAbout) {
    const option = {
      method: 'PATCH',
      headers: this._header.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      })
    }
    return fetch(`${this._baseUrl}/users/me`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  // отправка на сайт новой карточки
  recordNewCard(name, link) {
    const option = {
      method: 'POST',
      headers: this._header.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }
    return fetch(`${this._baseUrl}/cards`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  deleteCurrentCard(id) {
    const option = {
      method: 'DELETE',
      headers: this._header.headers
    }
    return fetch(`${this._baseUrl}/cards/${id}`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  // обновление фото пользователя на сайте
  recordNewAvatar(link) {
    const option = {
      method: 'PATCH',
      headers: this._header.headers,
      body: JSON.stringify({
        avatar: link
      })
    }
    return fetch(`${this._baseUrl}/users/me/avatar`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  // добавить лайк карточке
  addLike(id) {
    const option = {
      method: 'PUT',
      headers: this._header.headers
    }
    return fetch(`${this._baseUrl}/cards/${id}/likes`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }
  // удалить лайк с карточки
  deletLike(id) {
    const option = {
      method: 'DELETE',
      headers: this._header.headers
    }
    return fetch(`${this._baseUrl}/cards/${id}/likes`, option)
      .then(this._checkResponse)
      // .then(result => result);
  }



}
















