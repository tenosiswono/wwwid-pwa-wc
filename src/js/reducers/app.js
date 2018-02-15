import { NAVIGATE } from '../actions/app.js';

function getValue() {
  return location.pathname.substr(1).split('/')[1]
}

const app = (state = {}, action) => {
  switch (action.type) {
    case NAVIGATE:
      const location = action.path;
      const url = window.decodeURIComponent(location.pathname);
      window.scrollTo(0, 0)
      return {
        ...state,
        url,
        val: getValue()
      };
    default:
      return state;
  }
}

export default app;
