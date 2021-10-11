export default class Card {
  constructor(item, cardSelector, handleCardClick){
    this.name = item.name;
    this.link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  _openPicture(){
    this._handleCardClick(this.name, this.link);
  }

  _liked(){
    this._cardButtonLike.classList.toggle('card__like_active');
  }

  _removeElement(){
    this._element.remove();
  }

  _setEventListeners(){
    this._cardButtonLike.addEventListener('click', this._liked.bind(this));
    this._cardButtonRemove.addEventListener('click', this._removeElement.bind(this));
    this._cardPicture.addEventListener('click', this._openPicture.bind(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.card__title');
    this._cardPicture = this._element.querySelector('.card__picture');
    this._cardButtonLike = this._element.querySelector('.card__like');
    this._cardButtonRemove = this._element.querySelector('.card__remove');
    this._setEventListeners();

    this._cardName.textContent = this.name;
    this._cardPicture.alt = this.name;
    this._cardPicture.src = this.link;
    return this._element;
  }
}
