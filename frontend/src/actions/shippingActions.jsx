// actions.js
import { SET_SHIPPING_ADDRESS, CLEAR_SHIPPING_ADDRESS } from '../constants/shippingConstants';

export const setShippingAddress = (shippingAddress) => ({
  type: SET_SHIPPING_ADDRESS,
  payload: shippingAddress,
});

export const clearShippingAddress = () => ({
  type: CLEAR_SHIPPING_ADDRESS,
});
