
export class Section {
  // селектор класса контейнера передается в конструктор c точкой
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(place, element) {
    if (place =='append') this._container.append(element)
    else this._container.prepend(element)
  }

  renderItems() {
    this._items.forEach( item => {
      const element = this._renderer(item);
      this.addItem('append', element);
    });
  }
}









