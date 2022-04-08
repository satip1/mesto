
export class UserInfo {
  // селекторы классов с точкой
  constructor(selectName, selectInfo, selectAvatar) {
    this._selectName = selectName;
    this._selectInfo = selectInfo;
    this._selectAvatar = selectAvatar;


    this._userName = document.querySelector(this._selectName);
    this._userInfo = document.querySelector(this._selectInfo);
    this._userAvatar = document.querySelector(this._selectAvatar);

  }

  getUserInfo() {
    const dataUser = {}
    dataUser.name = this._userName.textContent;
    dataUser.info = this._userInfo.textContent;
    return dataUser
  }

  getUserId() {
    return this._userId
  }

  setUserId(id) {
   this._userId = id;
    // console.log(id) ;
    // console.log(this._userId) ;
  }

  setUserInfo(name, info) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }

  setUserAvatar(src) {
    this._userAvatar.src = src;
  }


}







