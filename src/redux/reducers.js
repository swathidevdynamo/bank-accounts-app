import { combineReducers } from 'redux';
import {
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  SAVE_ACCOUNTS_REQUEST,
  SAVE_ACCOUNTS_SUCCESS,
  SAVE_ACCOUNTS_FAILURE,
  DELETE_ACCOUNTS_REQUEST,
  DELETE_ACCOUNTS_SUCCESS,
  DELETE_ACCOUNTS_FAILURE,
  SET_THEME
} from './actions'

const initialState = {
  theme: {
    primary: '#64B5F6',
    secondary: '#1976D2',
    background: '#0b2a39',
    text: '#fff',
    error: '#FF5722',
    hover: '#94b512'
  },
  data: [],
  loading: false,
  error: null,
};

const accountsReducer = (state = initialState.data, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SAVE_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      };
    case SAVE_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DELETE_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const themeReducer = (state = initialState.theme, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  accounts: accountsReducer,
  theme: themeReducer,
});
