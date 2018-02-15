import renderList from '../lib/renderList'
import { connect } from '../lib/connect-mixin.js';
import { store } from '../store.js';
import './list-item'
let template = document.createElement('template');
template.innerHTML = `
<div id="content">
</div>
`

class ListView extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._state = store.getState();
    this._ready = true;

    this._content = shadowRoot.getElementById('content');
  }

  update(state) {
    if (!this._ready) {
      return;
    }
    if (state.data.currentData !== this._state.data.currentData){
      this.updateDatas(state.data.currentData);
    }
    this._state = state
  }

  updateDatas = (val) => {
    if (val && val.data && val.data.length > 0) {
      this._content.innerHTML = renderList(val.data, this.generateContent);
    }
  }

  generateContent = (props) => {
    return `
      <list-item
        data-title="${props.title}"
        data-thumbnail="${props.thumbnail}"
        data-slug="${props.slug}"
        data-author="${props.author}"
        data-pub-date="${props.pubDate}"
        data-description="${props.description}"
      ></list-item>
    `
  }
}

window.customElements.define('list-view', ListView);
