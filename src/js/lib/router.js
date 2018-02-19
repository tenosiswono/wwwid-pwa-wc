export const installRouter = (locationUpdatedCallback) => {
  document.body.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 ||
        e.metaKey || e.ctrlKey || e.shiftKey) return;

    const location = window.location;
    const origin = location.origin || location.protocol + '//' + location.host;
    if (href.indexOf(origin) !== 0) return;

    e.preventDefault();
    if (href !== location.href) {
      window.history.pushState({}, '', href);
      locationUpdatedCallback();
    }
  });

  window.addEventListener('popstate', () => locationUpdatedCallback());
  locationUpdatedCallback();
};
