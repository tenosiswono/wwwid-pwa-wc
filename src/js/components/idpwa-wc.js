import './list-view'
import './detail-view'
import baseUrl from '../lib/baseUrl'
import { connect } from '../lib/connect-mixin.js';
import { installRouter } from '../lib/router.js';
import { store } from '../store.js';
import { navigate, loadApi, setData } from '../actions/app.js';
import renderList from '../lib/renderList'

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
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYxIiBoZWlnaHQ9IjEzMiIgdmlld0JveD0iMCAwIDE2MSAxMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiMyQTNCOEYiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjlBQkUyIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMCUiIHkxPSI1MCUiIHkyPSI1MCUiIGlkPSJiIj48c3RvcCBzdG9wLWNvbG9yPSIjMkEzQjhGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzI5QUJFMiIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjEwMCUiIHkxPSI1MCUiIHgyPSIwJSIgeTI9IjUwJSIgaWQ9ImMiPjxzdG9wIHN0b3AtY29sb3I9IiNCNEQ0NEUiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRTdGNzE2IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMTAwJSIgeTE9IjUwJSIgeDI9IjAlIiB5Mj0iNTAlIiBpZD0iZCI+PHN0b3Agc3RvcC1jb2xvcj0iI0I0RDQ0RSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiNFN0Y3MTYiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbD0iIzE2NkRBNSIgZD0iTTE2MC42IDY1LjlsLTE3LjQgMjkuMy0yNC40LTI5LjcgMjQuNC0yOC45eiIvPjxwYXRoIGZpbGw9IiM4RkRCNjkiIGQ9Ik0xNDEuMyAxMDAuMmwtMjYuNS0zMS43LTE1LjkgMjYuNiAyNC43IDM2LjF6Ii8+PHBhdGggZmlsbD0iIzE2NkRBNSIgZD0iTTE0MSAzMS40bC0yNi4yIDMxLjgtMTUuOS0yNi42TDEyMy42Ljl6Ii8+PHBhdGggZmlsbD0idXJsKCNhKSIgb3BhY2l0eT0iLjk1IiBkPSJNNjEuMSAzMS40SDE0MUwxMjMuNC45SDc4Ljd6Ii8+PHBhdGggZmlsbD0idXJsKCNiKSIgb3BhY2l0eT0iLjk1IiBkPSJNMTE0LjggNjMuM0gxNTlsLTE1LjktMjYuOEg5OC44Ii8+PHBhdGggZmlsbD0idXJsKCNjKSIgb3BhY2l0eT0iLjk1IiBkPSJNMTQxLjMgMTAwLjNINjFsMTcuNiAzMC41aDQ1eiIvPjxwYXRoIGZpbGw9IiMwMTAxMDEiIGQ9Ik03OC42IDEzMC44TDQxIDY1LjggNzkuMS44SDM3LjlMLjQgNjUuOGwzNy41IDY1eiIvPjxwYXRoIGZpbGw9InVybCgjZCkiIG9wYWNpdHk9Ii45NSIgZD0iTTExNC44IDY4LjRIMTU5bC0xNS45IDI2LjhIOTguOCIvPjwvZz48L3N2Zz4=');
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
  #overlay {
    height: calc(100vh - 48px);
    width: 100%;
    position: fixed;
    top: 48px;
    left: 0;
    background: #eee;
    text-align: center;
    color: #999;
    padding-top: 50vh;
    display: none;
  }
  .loading {
    display: block!important;
  }
  .error {
    display: block!important;
    background: #f58080!important;
    color: #000!important;
  }
</style>
<div>
  <nav>
    <a href="${baseUrl}/">
      <div class="nav-container">
        <div class="logo"></div>
        <div class="title">WWWID PWA</div>
      </div>
    </a>
  </nav>
  <section id="section">
  </section>
  <div id="overlay"></div>
</div>
`

class idpwaWc extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this._state = store.getState();
    this._ready = true;
    this._section = shadowRoot.getElementById('section');
    this._overlay = shadowRoot.getElementById('overlay');

    installRouter(() => {
      store.dispatch(navigate(window.location));
    })
  }

  update(state) {
    if (!this._ready) {
      return;
    }
    if (state.app.url !== this._state.app.url
      || ( state.app.url === this._state.app.url && state.app.val !== this._state.app.val)) {
      this._state = state
      let url = state.app.url;
      const data = state.data.datas.filter((i) => i.url === state.app.url && i.val === state.app.val && i.expiry > Date.now());
      if (state.app.url.indexOf('/detail') > -1 && this._section.getElementsByTagName('list-view'.length === 0)) {
        url = '/detail'
        this._section.innerHTML = '';
        this._section.appendChild(document.createElement("detail-view"))
      } else if (this._section.getElementsByTagName('list-view'.length === 0)) {
        url = '/'
        this._section.innerHTML = '';
        this._section.appendChild(document.createElement("list-view"))
      }
      if (state.data.loading !== this._state.data.loading){
        this.updateLoading(state.data.loading, state.data.errMsg);
      }
      if (data.length === 0) {
        store.dispatch(loadApi(url, state.app.val))
      } else {
        store.dispatch(setData(data[0]))
      }
    }
    this._section
  }

  updateLoading = (loading, errMsg) => {
    if (loading) {
      this._overlay.classList.add("loading");
      this._overlay.innerText = 'Loading...';
    } else if (errMsg.length) {
      this._overlay.classList.add("error");
      this._overlay.innerText = errMsg;
    } else {
      this._overlay.classList.remove("error");
      this._overlay.classList.remove("loading");
      this._overlay.innerText = '';
    }
  }
}

window.customElements.define('idpwa-wc', idpwaWc);
