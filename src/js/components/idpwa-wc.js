import './list-item'
import './detail-view'
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

    installRouter((isNav) => {
      this.getData(window.location, isNav);
    })
  }

  getData = (path, isNav) => {
    if (this.loading) return
    this.loading = true
    this._section.innerHTML = 'Loading...'
    this._section.classList.add('loading')
    this._currentPath = path
    const val = path.pathname.substr(1).split('/')[1]
    if (path.pathname.indexOf('/detail') > -1) {
      this.loadData('/detail', val,isNav)
    } else {
      this.loadData('/', val,isNav)
    }
  }

  loadData = (url, val, isNav) => {
    fetch(urls[url](val), isNav).then(resp => {
      resp.json().then(results => {
        this.createElements(results, url, val)
        this.loading = false
      })
    })
  }

  createElements = (results, url, val) => {
    this._section.innerHTML = ''
    this._section.classList.remove('loading')
    if (url === '/detail') {
      this.addBackHome()
      const detailView = document.createElement('detail-view')
      detailView.detail = results
      this._section.appendChild(detailView)
    } else {
      if (val) {
        this.addBackHome()
      }
      results.forEach(result => {
        const listItem = document.createElement('list-item')
        listItem.dataItem = result
        this._section.appendChild(listItem)
      })
    }
  }

  addBackHome = () => {
    const back = document.createElement('div')
    back.innerHTML = `
    <a href="/" class="back">
      <div class="icon"></div>
      <div class="name">Home</div>
    </a>
    `
    this._section.appendChild(back)
  }
}

window.customElements.define('idpwa-wc', idpwaWc);
