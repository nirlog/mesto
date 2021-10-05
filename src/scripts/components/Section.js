export default class Section {
  constructor({renderer}, selectorCotainer){
    this._renderer = renderer;
    this._selectorCotainer = selectorCotainer;
  }

  renderItems(items){
    this._renderedItems = items;
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element){
    this._selectorCotainer.prepend(element);
  }
}
