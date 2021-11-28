export default class Card {
  constructor({item, handleCardClick, handleLikeClick, handleDeleteClick}, cardSelector){
    this.item = item;
    this.name = item.name;
    this.link = item.link;
    this.likes = item.likes;
    this.cardId = item._id;
    this.ownerId = item.owner._id;
    this.currentUser = item.currentUser;
    this._nubmerOfLikes = item.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

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

  liked(isLiked){
    if(isLiked){
      this._buttonCardLike.classList.remove('card__like_active');
      this._numberingOfLikes.textContent = this._nubmerOfLikes;
    }else{
      this._buttonCardLike.classList.add('card__like_active');
      this._numberingOfLikes.textContent = this._nubmerOfLikes;
    }

  }

  setArrayLikes(dataLikes){
    this.likes = dataLikes;
    this._nubmerOfLikes = dataLikes.length;
  }

  removeElement(){
    this._element.remove();
  }

  _setEventListeners(){
    this._buttonCardLike.addEventListener('click', () => this._handleLikeClick(this));
    this._cardPicture.addEventListener('click', this._openPicture.bind(this));
    this._cardButtonRemove.addEventListener('click', () => this._handleDeleteClick(this));

  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.card__title');
    this._cardPicture = this._element.querySelector('.card__picture');
    this._buttonCardLike = this._element.querySelector('.card__like');
    this._numberingOfLikes = this._element.querySelector('.card__number-of-likes');
    this._cardButtonRemove = this._element.querySelector('.card__remove');
    this._setEventListeners();

    this._cardName.textContent = this.name;
    this._cardPicture.alt = this.name;
    this._cardPicture.src = this.link;
    this._numberingOfLikes.textContent = this._nubmerOfLikes;
    if(this.likes.some(like => like._id == this.currentUser))
    this._buttonCardLike.classList.add('card__like_active');
    if(this.currentUser != this.ownerId){
      this._cardButtonRemove.remove();
    }
    return this._element;
  }
}
