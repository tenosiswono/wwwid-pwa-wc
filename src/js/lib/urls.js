
const host = process.env.NODE_ENV || 'development';
const idpwa = host === 'development' ? 'https://us-central1-idpwa-wc.cloudfunctions.net/api' : '/api';

export default {
  '/': (cat) => `${idpwa}?${cat ? `cat=${cat}` : ''}&type=list`,
  '/detail': (slug) => `${idpwa}?slug=${slug}&type=detail`,
};
