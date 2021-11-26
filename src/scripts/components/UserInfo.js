export default class UserInfo {
  constructor({selectorName, selectorAboutMe}){
    this._selectorName = document.querySelector(selectorName);
    this._selectorAboutMe = document.querySelector(selectorAboutMe);
  }

  getUserInfo(){
    return  {name: this._selectorName.textContent, about: this._selectorAboutMe.textContent};
  }

  setUserInfo({name, about}){
    fetch('https://mesto.nomoreparties.co/v1/cohort-30/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'd212ae53-16c4-4655-af75-395db9babc88',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      this._selectorName.textContent = name;
      this._selectorAboutMe.textContent = about;

    })
    .catch((err) => {
      console.log('Ошибка PATCH/cards: ' + err);
    });;
  }
}
