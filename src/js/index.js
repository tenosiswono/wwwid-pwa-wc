import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter'
import 'unfetch'
if (!('import' in document.createElement('link'))) {
  window.addEventListener('WebComponentsReady', _ => {
    require("./components/idpwa-wc");
  });
} else {
  require("./components/idpwa-wc");
}
