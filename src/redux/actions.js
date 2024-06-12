import axios from 'axios';

const BASE_URL = `http://localhost:8080/accounts/`;
const OPEN_API = `https://openiban.com/countries`;


export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

const fetchAccountsRequest = () => ({
  type: FETCH_ACCOUNTS_REQUEST,
});

const fetchAccountsSuccess = (data) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  payload: data,
});

const fetchAccountsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FAILURE,
  payload: error,
});

export const fetchInitialAccounts = () => {
  return async (dispatch) => {
    dispatch(fetchAccountsRequest());
    try {
      const response = await axios.get(BASE_URL);
      dispatch(fetchAccountsSuccess(response?.data?._embedded?.accounts));
    } catch (error) {
      dispatch(fetchAccountsFailure(error.message));
    }
  };
};

export const SAVE_ACCOUNTS_REQUEST = 'SAVE_ACCOUNTS_REQUEST';
export const SAVE_ACCOUNTS_SUCCESS = 'SAVE_ACCOUNTS_SUCCESS';
export const SAVE_ACCOUNTS_FAILURE = 'SAVE_ACCOUNTS_FAILURE';


const saveAccountsRequest = () => ({
  type: SAVE_ACCOUNTS_REQUEST,
});

const saveAccountsSuccess = (data) => ({
  type: SAVE_ACCOUNTS_SUCCESS,
  payload: data,
});

const saveAccountsFailure = (error) => ({
  type: SAVE_ACCOUNTS_FAILURE,
  payload: error,
});

export const saveBankAccounts = (accounts) => {
  const { country, bankcode, accountNo } = accounts
  return async (dispatch) => {
    dispatch(saveAccountsRequest());
    try {
      const ibanResult = await axios.get(`https://openiban.com/calculate/${country}/${bankcode}/${accountNo}`)
      const iban = ibanResult?.data?.iban

      if (iban) {
        let bicResult = await axios.get(`https://openiban.com/validate/${iban}?getBIC=true&validateBankCode=true`);
        const bic = bicResult?.data?.bankData?.bic;
        let payload = {
          "iban": iban,
          "bic": bic
        }
        const response = await axios.post(BASE_URL, payload);
        const results = { ...accounts, ...response.data }
        dispatch(saveAccountsSuccess(results));
      }
    } catch (error) {
      dispatch(saveAccountsFailure(error.message))
    }
  }
}



export const DELETE_ACCOUNTS_REQUEST = 'DELETE_ACCOUNTS_REQUEST';
export const DELETE_ACCOUNTS_SUCCESS = 'DELETE_ACCOUNTS_SUCCESS';
export const DELETE_ACCOUNTS_FAILURE = 'DELETE_ACCOUNTS_FAILURE';


const deleteAccountsRequest = () => ({
  type: DELETE_ACCOUNTS_REQUEST,
});

const deleteAccountsSuccess = (data) => ({
  type: DELETE_ACCOUNTS_SUCCESS,
  payload: data,
});

const deleteAccountsFailure = (error) => ({
  type: DELETE_ACCOUNTS_FAILURE,
  payload: error,
});


export const deleteBankAccounts = (account) => {
  return async (dispatch) => {
    dispatch(deleteAccountsRequest());
    try {
      const response = await axios.delete(account?._links?.account?.href);
      dispatch(deleteAccountsSuccess(response.status === '204' ? {"data" : "successfully deleted"} : []));
    } catch (error) {
      dispatch(deleteAccountsFailure(error.message));
    }
  };
};



export const fetchCountries = async () => {
  try {
    const response = await axios.get(OPEN_API)
    return response;
  } catch (error) {
    new Error('Error fetching countries:', error);
  }
};




export const SET_THEME = 'SET_THEME';


export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
