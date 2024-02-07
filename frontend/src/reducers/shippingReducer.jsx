import {
    CART_SAVE_SHIPPING_ADDRESS,
    CART_LOAD_SHIPPING_ADDRESS,
    // ... other imports
} from "../constants/shippingConstants";

const initialState = {
    // ... your other initial state properties
    shippingAddress: {}, // Initial value for shippingAddress
};

const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        // ... other cases

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        case CART_LOAD_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        // ... other cases

        default:
            return state;
    }
};

export default shippingReducer;
