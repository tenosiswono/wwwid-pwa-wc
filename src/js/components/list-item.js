import templateHtml from './list-item.html'
import './categories-view'

let template = document.createElement('template');
template.innerHTML = templateHtml

class ListItem extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this._title = this.shadowRoot.getElementById('title');
    this._thumbnail = this.shadowRoot.getElementById('thumbnail');
    this._url = this.shadowRoot.getElementById('url');
    this._author = this.shadowRoot.getElementById('author');
    this._pubDate = this.shadowRoot.getElementById('pub-date');
    this._description = this.shadowRoot.getElementById('description');
    this._categories = this.shadowRoot.getElementById('categories');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        let visiblity = false;
        if (entries[0].intersectionRatio !== 0) {
          visiblity = true;
        } else {
          visiblity = false;
        }
        this.viewImage(visiblity);
      });
      io.observe(this._thumbnail);
    }
  }

  get dataItem() {
    return this._dataItem
  }
  set dataItem(dataItem) {
    this._dataItem = dataItem
  }

  connectedCallback() {
    this.render(this._dataItem)
  }

  render = (props) => {
    this._title.innerText = props.title;
    this._url.href = `/detail/${props.slug}`;
    this._author.innerText = props.author;
    this._pubDate.innerText = (new Date(props.pubDate)).toLocaleDateString();
    this._description.innerText = props.description;
    if (!('IntersectionObserver' in window)) {
      this._thumbnail.style.backgroundImage = `url('${props.thumbnail}')`;
    }
    const categoriesView = document.createElement('categories-view')
    categoriesView.categories = props.categories
    this._categories.appendChild(categoriesView)
  }

  viewImage = (visiblity) => {
    if (visiblity) {
      this._thumbnail.style.backgroundImage = `url('${this._dataItem.thumbnail}')`;
    } else {
      this._thumbnail.style.backgroundImage = '';
    }
  }
}

window.customElements.define('list-item', ListItem);
