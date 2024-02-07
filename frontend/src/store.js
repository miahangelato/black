import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productsReducers';
import { userLoginReducer } from './reducers/userReducers';
import  shippingReducer  from './reducers/shippingReducer';
// If both files are in the same directory



import { cartReducer } from './reducers/cartReducers';

// Define rootReducer using combineReducers
const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,

    userLogin: userLoginReducer,
    shippingAddress: shippingReducer,
});

// Retrieve cartItems and userInfo from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

// Set initialState with data from localStorage
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

// Configure Redux store with rootReducer, initialState, and middleware
const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Subscribe to store updates and update localStorage with cartItems
store.subscribe(() => {
    const { cart } = store.getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
});

export default store;