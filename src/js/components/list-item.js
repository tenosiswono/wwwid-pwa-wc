import renderList from '../lib/renderList'

let template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    margin: 16px 0;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    border-radius: 2px;
    display: block;
  }
  a {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
    text-decoration: none;
    color: inherit;
    display: block;
  }
  article {
    margin: 16px;
  }
  #title {
    margin: 0 0 4px 0;
  }
  #thumbnail {
    border: 1px solid rgba(0,0,0,.15);
    background-position: 50% 50%;
    background-origin: border-box;
    background-size: cover;
    background-color: #f0f0f0;
    height: 172px;
  }
  .meta {
    display: flex;
    color: #636363;
    font-size: 13px;
    margin-bottom: 8px;
  }
  #author {
    flex: 1;
  }
  #description {
    text-align: justify;
  }
</style>
<a id="url">
  <div id="thumbnail"></div>
  <article>
    <h3 id="title">
    </h3>
    <div class="meta">
      <div id="author"></div>
      <div id="pub-date"></div>
    </div>
    <div id="description"></div>
  </article>
</a>
`

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

  render(props) {
    this._title.innerText = props.title;
    this._url.href = `/detail/${props.slug}`;
    this._author.innerText = props.author;
    this._pubDate.innerText = (new Date(props.pubDate)).toLocaleDateString();
    this._description.innerText = props.description;
    if (!('IntersectionObserver' in window)) {
      this._thumbnail.style.backgroundImage = `url('${props.thumbnail}')`;
    }
  }

  viewImage(visiblity) {
    if (visiblity) {
      this._thumbnail.style.backgroundImage = `url('${this._dataItem.thumbnail}')`;
    } else {
      this._thumbnail.style.backgroundImage = '';
    }
  }

}

window.customElements.define('list-item', ListItem);
