export default class UserInfo {
  constructor(selectorProfile){
    this._selectorName = selectorProfile.name;
    this._selectorAbout = selectorProfile.about;
    this._selectorAvatar = selectorProfile.avatar;
  }

  setUserInfo(user){
    this._selectorName.textContent = user.name;
    this._selectorAbout.textContent = user.about;
  }

  setUserAvatar(user){
    this._selectorAvatar.alt = user.name;
    this._selectorAvatar.src = user.avatar;
  }
}
