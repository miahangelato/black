// reducer.js
import { SET_SHIPPING_ADDRESS, CLEAR_SHIPPING_ADDRESS } from '../constants/shippingConstants';

const initialState = {
  shippingAddress: null,
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CLEAR_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: null,
      };

    default:
      return state;
  }
};

export default shippingReducer;
