import renderList from '../lib/renderList'
import toTitleCase from '../lib/toTitleCase'
import { connect } from '../lib/connect-mixin.js';
import { store } from '../store.js';

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
    text-decoration: none;
    color: inherit;
    display: block;
  }
  article {
    padding: 16px;
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
  #categories {
    letter-spacing: 0;
    font-weight: 400;
    font-style: normal;
    padding: 0;
    list-style: none;
    list-style-image: none;
  }
  #categories li {
    border: none;
    color: rgba(0,0,0,.68);
    background: rgba(0,0,0,.05);
    padding: 5px 10px;
    border-radius: 3px;
    display: inline-block;
  }
  #content img {
    width: 100%;
    height: auto;
  }
</style>
<div id="thumbnail"></div>
<article>
  <a id="url">
    <h3 id="title">
    </h3>
  </a>
  <div class="meta">
    <div id="author"></div>
    <div id="pub-date"></div>
  </div>
  <div id="content"></div>
  <ul id="categories">
  </ul>
</article>
`

class DetailView extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._state = store.getState();
    this._ready = true;

    this._title = this.shadowRoot.getElementById('title');
    this._thumbnail = this.shadowRoot.getElementById('thumbnail');
    this._url = this.shadowRoot.getElementById('url');
    this._author = this.shadowRoot.getElementById('author');
    this._pubDate = this.shadowRoot.getElementById('pub-date');
    this._content = this.shadowRoot.getElementById('content');
    this._categories = this.shadowRoot.getElementById('categories');
  }

  update(state) {
    if (!this._ready) {
      return;
    }
    if (state.app.url.indexOf('/detail') > -1) {
      if (state.data.currentData !== this._state.data.currentData){
        this.updateDatas(state.data.currentData.data);
      }
    }
    this._state = state
  }

  updateDatas = (props) => {
    this._title.innerText = props.title;
    this._thumbnail.style.backgroundImage = `url('${props.thumbnail}')`;
    this._url.href = `/detail/${props.slug}`;
    this._author.innerText = props.author;
    this._pubDate.innerText = (new Date(props.pubDate)).toLocaleDateString();
    this._content.innerHTML = props.content;
    this._categories.innerHTML = renderList(props.categories, this.generateContent)
  }

  generateContent = (value) => {
    return `
      <li><a href="/cat/${value}" >${toTitleCase(value)}</a></li>
    `
  }
}

window.customElements.define('detail-view', DetailView);
