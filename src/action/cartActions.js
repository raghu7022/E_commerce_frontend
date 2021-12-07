import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    if (id === '614837beec46e4181814aa16') {
        console.log('adding bundell to cart');
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        axios.get(`/api/products/61482b362060f644a8179189`)
            .then(function (response) {
                // handle success
                dispatch({
                    type: CART_ADD_ITEM,
                    payload: {
                        product: '61482b362060f644a8179189',
                        name: response.data.name,
                        image: response.data.image,
                        price: response.data.price,
                        countInStock: response.data.countInStock,
                        qty
                    }
                })
                console.log(response);
            })
        axios.get(`/api/products/61482ccb5e2e5d3b146e667b`)
            .then(function (response) {
                // handle success
                dispatch({
                    type: CART_ADD_ITEM,
                    payload: {
                        product: '61482ccb5e2e5d3b146e667b',
                        name: response.data.name,
                        image: response.data.image,
                        price: response.data.price,
                        countInStock: response.data.countInStock,
                        qty
                    }
                })
                console.log(response);
            })

    } else {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}