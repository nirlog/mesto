export default class Section {
  constructor({renderer}, container){
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items){
    this._renderedItems = items;
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element){
    this._container.prepend(element);
  }
}
