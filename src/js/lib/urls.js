const idpwa = 'https://us-central1-idpwa-wc.cloudfunctions.net/api';

export default {
  '/': (cat) => `${idpwa}?${cat ? `cat=${cat}` : ''}&type=list`,
  '/detail': (slug) => `${idpwa}/detail?slug=${slug}&type=detail`,
};
