import { DATA_LOADING, DATA_LOADED, DATA_ERROR, SET_DATA } from '../actions/app.js';

export const insertData = (state, action) => {
  switch(action.type) {
    case DATA_LOADED:
      const { data, val, expiry, url } = action;
      return [
        ...state,
        {
          url,
          data,
          val,
          expiry
        }
      ];
    default:
      return state;
  }
};

const app = (state = { datas: [], errMsg: '', loading: false, currentData: {} }, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
        errMsg: ''
      }
      case DATA_LOADED:
        const { data, val, expiry, url } = action;
        return {
          ...state,
          datas: insertData(state.datas, action),
          currentData: { data, val, expiry, url },
          loading: false,
          errMsg: ''
        }
      case DATA_ERROR:
        return {
          ...state,
          loading: false,
          errMsg: action.errMsg
        }
      case SET_DATA:
        return {
          ...state,
          currentData: action.data,
          loading: false,
          errMsg: ''
        }
    default:
      return state;
  }
}

export default app;
