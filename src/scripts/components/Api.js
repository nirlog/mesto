function onResponce(res){
  return res.ok ? res.json() : Promise.Promise.reject(`Ошибка method: ${res}`)
}

export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;

  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers})
      .then(onResponce);
  }

  patchUser(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then(onResponce);
  }

  patchAvatar({link}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(onResponce);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers})
      .then(onResponce);
  }

  addCard(body) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then(onResponce);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers})
      .then(onResponce);
  }

  toggleCardLike(cardId, method) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers})
      .then(onResponce);
  }
}


