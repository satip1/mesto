
export class Section {
  // селектор класса контейнера передается в конструктор c точкой
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    // console.log( this._items);
    this._items.forEach( item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }


}









