if (!('import' in document.createElement('link'))) {
  window.addEventListener('WebComponentsReady', _ => {
    require("./components/idpwa-wc");
  });
} else {
  require("./components/idpwa-wc");
}
