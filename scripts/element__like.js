let likes = document.querySelectorAll('.element__like');

function liked() {
  this.classList.toggle('element__like_active');
}

for (let like of likes) {
  like.addEventListener('click', liked);
}
