import axios from 'axios';
import { CART_LOAD_SHIPPING_ADDRESS, CART_SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants';

export const saveShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));

    const { userLogin: { userInfo } } = getState();
    
    try {
        console.log('Request Payload:', { ...data, user: userInfo.id }); // Change userInfo._id to userInfo.id
        await axios.post('http://127.0.0.1:8000/shipping/', { ...data, user: userInfo.id });
    } catch (error) {
        console.error('Error saving shipping address:', error.message);
    }
};

export const loadShippingAddress = () => (dispatch) => {
    const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {};

    dispatch({
        type: CART_LOAD_SHIPPING_ADDRESS,
        payload: shippingAddressFromStorage,
    });
};
