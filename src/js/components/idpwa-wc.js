import './list-item'
import './detail-view'
import fetch from 'unfetch'
import urls from '../lib/urls'
import {
  installRouter
} from '../lib/router.js'

import templateHtml from './idpwa-wc.html'

let template = document.createElement('template');
template.innerHTML = templateHtml

class idpwaWc extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this._section = shadowRoot.getElementById('section');
    this._overlay = shadowRoot.getElementById('overlay');
    this._loading = false

    installRouter(() => {
      this.getData(window.location);
    })
  }

  getData(path) {
    if (this.loading) return
    this.loading = true
    this._section.innerHTML = 'Loading...'
    this._section.classList.add('loading')
    this._currentPath = path
    const val = path.pathname.substr(1).split('/')[1]
    if (path.pathname.indexOf('/detail') > -1) {
      this.loadData('/detail', val)
    } else {
      this.loadData('/', val)
    }
  }

  loadData(url, val) {
    fetch(urls[url](val)).then(resp => {
      resp.json().then(results => {
        this.createElements(results, url)
        this.loading = false
      })
    })
  }

  createElements(results, url) {
    this._section.innerHTML = ''
    this._section.classList.remove('loading')
    if (url === '/detail') {
      const detailView = document.createElement('detail-view')
      detailView.detail = results
      this._section.appendChild(detailView)
    } else {
      results.forEach(result => {
        const listItem = document.createElement('list-item')
        listItem.dataItem = result
        this._section.appendChild(listItem)
      })
    }
  }
}

window.customElements.define('idpwa-wc', idpwaWc);
