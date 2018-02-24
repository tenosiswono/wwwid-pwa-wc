import './list-item'
import './detail-view'
import fetch from 'unfetch'
import urls from '../lib/urls'
import {
  installRouter
} from '../lib/router.js'

let template = document.createElement('template');
template.innerHTML = `
<style>
  a {
    text-decoration: none;
  }
  nav {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
    height: 48px;
    background-color: #5762D5;
  }
  section {
    max-width: 1024px;
    margin: 54px auto 0 auto;
  }
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='161' height='132'%3E%3Cdefs%3E%3ClinearGradient x1='0%25' y1='50%25' y2='50%25' id='a'%3E%3Cstop stop-color='%232A3B8F' offset='0%25'/%3E%3Cstop stop-color='%2329ABE2' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='0%25' y1='50%25' y2='50%25' id='b'%3E%3Cstop stop-color='%232A3B8F' offset='0%25'/%3E%3Cstop stop-color='%2329ABE2' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='100%25' y1='50%25' x2='0%25' y2='50%25' id='c'%3E%3Cstop stop-color='%23B4D44E' offset='0%25'/%3E%3Cstop stop-color='%23E7F716' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='100%25' y1='50%25' x2='0%25' y2='50%25' id='d'%3E%3Cstop stop-color='%23B4D44E' offset='0%25'/%3E%3Cstop stop-color='%23E7F716' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23166DA5' d='M160.6 65.9l-17.4 29.3-24.4-29.7 24.4-28.9z'/%3E%3Cpath fill='%238FDB69' d='M141.3 100.2l-26.5-31.7-15.9 26.6 24.7 36.1z'/%3E%3Cpath fill='%23166DA5' d='M141 31.4l-26.2 31.8-15.9-26.6L123.6.9z'/%3E%3Cpath fill='url%28%23a%29' opacity='.95' d='M61.1 31.4H141L123.4.9H78.7z'/%3E%3Cpath fill='url%28%23b%29' opacity='.95' d='M114.8 63.3H159l-15.9-26.8H98.8'/%3E%3Cpath fill='url%28%23c%29' opacity='.95' d='M141.3 100.3H61l17.6 30.5h45z'/%3E%3Cpath fill='%23010101' d='M78.6 130.8L41 65.8 79.1.8H37.9L.4 65.8l37.5 65z'/%3E%3Cpath fill='url%28%23d%29' opacity='.95' d='M114.8 68.4H159l-15.9 26.8H98.8'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 40px auto;
    background-repeat: no-repeat;
    background-position: center;
  }
  .nav-container {
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
  }
  .title {
    color: white;
  }
  .loading {
    height: calc(100vh - 48px);
    width: 100%;
    position: fixed;
    top: 48px;
    left: 0;
    background: #eee;
    text-align: center;
    color: #999;
    padding-top: 50vh;
    margin: 0;
    max-width: none;
  }
</style>
<div>
  <nav>
    <a href="/">
      <div class="nav-container">
        <div class="logo"></div>
        <div class="title">WWWID PWA</div>
      </div>
    </a>
  </nav>
  <section id="section">
  </section>
</div>
`

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
