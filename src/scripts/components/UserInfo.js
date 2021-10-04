export default class UserInfo {
  constructor({selectorName, selectorAboutMe}){
    this._selectorName = document.querySelector(selectorName);
    this._selectorAboutMe = document.querySelector(selectorAboutMe);
  }

  getUserInfo(){
    return  {name: this._selectorName.textContent, aboutMe: this._selectorAboutMe.textContent};
  }

  setUserInfo({name, aboutMe}){
    this._selectorName.textContent = name;
    this._selectorAboutMe.textContent = aboutMe;
  }
}
