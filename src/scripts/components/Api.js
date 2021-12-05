export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;

  }
  _checkResponse(res){
    return res.ok ? res.json() : Promise.reject(`Ошибка method: ${res}`);
  }


  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers})
      .then(this._checkResponse);
  }

  patchUser(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then(this._checkResponse);
  }

  patchAvatar({link}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers})
      .then(this._checkResponse);
  }

  addCard(body) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers})
      .then(this._checkResponse);
  }

  toggleCardLike(cardId, method) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers})
      .then(this._checkResponse);
  }
}
