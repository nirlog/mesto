export class Card {
  constructor(item, cardSelector, popupCardPicture){
    this.name = item.name;
    this.link = item.link;
    this._popupPicture = popupCardPicture;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    this._cardButtonLike.addEventListener('click', () => this._cardButtonLike.classList.toggle('card__like_active'));
    this._cardButtonRemove.addEventListener('click', () => this._cardButtonRemove.closest('.card').remove());
      this._cardPicture.addEventListener('click', () => {
        openPicture(this.link, this.name);
        openPopup(this._popupPicture);
      });
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
