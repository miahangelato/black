// ShippingAddressForm.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; // Import connect
import { setShippingAddress } from '../actions/shippingActions'; // Import the action creator
import axios from 'axios';

const ShippingAddressForm = ({ order, setShippingAddress }) => {
    const [shippingAddress, setShippingAddressState] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    useEffect(() => {
        const fetchShippingAddress = async () => {
            try {
                const response = await axios.get(`/shipping/${order._id}/`);
                setShippingAddress(response.data);
            } catch (error) {
                console.error('Error fetching shipping address:', error);
            }
        };

        fetchShippingAddress();
    }, [order._id, setShippingAddress]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`/shipping/${order._id}/`, shippingAddress);
            // Dispatch the action to update the shipping address in Redux
            setShippingAddress(shippingAddress);
            console.log('Shipping address updated successfully');
        } catch (error) {
            console.error('Error updating shipping address:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label>Address:</label>
            <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddressState({ ...shippingAddress, address: e.target.value })}
            />
            <label>City:</label>
            <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddressState({ ...shippingAddress, city: e.target.value })}
            />
            <label>Postal Code:</label>
            <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddressState({ ...shippingAddress, postalCode: e.target.value })}
            />
            <label>Country:</label>
            <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddressState({ ...shippingAddress, country: e.target.value })}
            />
            <button type="submit">Save Shipping Address</button>
        </form>
    );
};

// Map dispatch to props: Connect the action creator to the component
const mapDispatchToProps = (dispatch) => ({
    setShippingAddress: (address) => dispatch(setShippingAddress(address)),
});

// Connect the component to the Redux store
export default connect(null, mapDispatchToProps)(ShippingAddressForm);
