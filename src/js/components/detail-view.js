import renderList from '../lib/renderList'
import toTitleCase from '../lib/toTitleCase'
import templateHtml from './detail-view.html'

let template = document.createElement('template');
template.innerHTML = templateHtml

class DetailView extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this._title = this.shadowRoot.getElementById('title');
    this._thumbnail = this.shadowRoot.getElementById('thumbnail');
    this._author = this.shadowRoot.getElementById('author');
    this._pubDate = this.shadowRoot.getElementById('pub-date');
    this._content = this.shadowRoot.getElementById('content');
    this._categories = this.shadowRoot.getElementById('categories');
  }

  get detail() {
    return this._detail
  }
  set detail(detail) {
    this._detail = detail
  }

  connectedCallback() {
    this.render(this._detail);
  }

  render = (props) => {
    this._title.innerText = props.title;
    this._thumbnail.style.backgroundImage = `url('${props.thumbnail}')`;
    this._author.innerText = props.author;
    this._pubDate.innerText = (new Date(props.pubDate)).toLocaleDateString();
    this._content.innerHTML = props.content;
    this._categories.innerHTML = renderList(props.categories, this.generateContent)
  }

  generateContent  = (value) => {
    return `<li><a href="/cat/${value}" >${toTitleCase(value)}</a></li>`
  }
}

window.customElements.define('detail-view', DetailView);
