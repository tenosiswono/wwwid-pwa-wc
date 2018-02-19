const idpwa = '/api';

export default {
  '/': (cat) => `${idpwa}?${cat ? `cat=${cat}` : ''}&type=list`,
  '/detail': (slug) => `${idpwa}?slug=${slug}&type=detail`,
};
