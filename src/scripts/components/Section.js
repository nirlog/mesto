export default class Section {
  constructor({items, renderer}, selectorCotainer){
    this._renderedItems = items;
    this._renderer = renderer;
    this._selectorCotainer = selectorCotainer;
  }

  renderItems(){
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element){
    this._selectorCotainer.prepend(element);
  }
}
