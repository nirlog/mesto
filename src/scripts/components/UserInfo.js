export default class UserInfo {
  constructor(elementProfile){
    this._name = elementProfile.name;
    this._about = elementProfile.about;
    this._avatar = elementProfile.avatar;
  }

  getUserInfo(){
    return  {name: this._name.textContent, about: this._about.textContent};
  }

  setUserInfo({name, about}){
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar({name, avatar}){
    this._avatar.alt = name;
    this._avatar.src = avatar;
  }
}
