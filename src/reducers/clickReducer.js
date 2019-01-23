import { CLICK_UPDATE_VALUE, ERR_UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  quote: {
    companyName: '',
    latestPrice: ''
  },
  chart: [],
  error: false,
  errorMessage: ''
};

export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
      const { quote, chart } = action.payload;
      return {
        ...state,
        quote,
        chart,
        error: false
      };
    case ERR_UPDATE_VALUE:
      return {
        ...state,
        error: true,
        errorMessage: action.message
      };
    default:
      return state;
  }
};
