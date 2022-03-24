
export class UserInfo {
  // селекторы классов с точкой
  constructor(selectName, selectInfo) {
    this._selectName = selectName;
    this._selectInfo = selectInfo;

    this._userName = document.querySelector(this._selectName);
    this._userInfo = document.querySelector(this._selectInfo);
  }

  getUserInfo() {
    const dataUser = {}
    dataUser.name = this._userName.textContent;
    dataUser.info = this._userInfo.textContent;
    return dataUser
  }

  setUserInfo(name, info) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }


}







