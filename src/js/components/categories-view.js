import renderList from '../lib/renderList'
import toTitleCase from '../lib/toTitleCase'
import templateHtml from './categories-view.html'

let template = document.createElement('template');
template.innerHTML = templateHtml

class CategoriesView extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this._cat = this.shadowRoot.getElementById('cat');
  }

  get categories() {
    return this._categories
  }
  set categories(categories) {
    this._categories = categories
  }

  connectedCallback() {
    this.render(this._categories);
  }

  render = (categories) => {
    this._cat.innerHTML = renderList(categories, this.generateContent)
  }

  generateContent  = (value) => {
    return `<li><a href="/cat/${value}" >${toTitleCase(value)}</a></li>`
  }
}

window.customElements.define('categories-view', CategoriesView);
