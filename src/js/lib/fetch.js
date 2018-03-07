import unfetch from 'unfetch'
window.fetch = ((url, isNav) => {
  if (isNav) {
    return unfetch(url)
  }
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onerror = reject;
    request.onload = () => resolve({
      json: () => Promise.resolve(request.responseText).then(JSON.parse),
    });
    request.open('get', url);
    request.send();
  })
});
