import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer, productDetailsReducer, productDeleteReducer,
    productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userRegisterReducer, userLoginReducer, userDetailsReducer,
    userUpdateProfileReducer, userListReducer, userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer,
    orderListMyReducer, orderListReducer, orderDeliverReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer
})

const cartItemFromStrorage = localStorage.getItem('cartItems') ? JSON.parse
    (localStorage.getItem('cartItems')) : []

const userInfoFromStrorage = localStorage.getItem('userInfo') ? JSON.parse
    (localStorage.getItem('userInfo')) : null

const shippingAddressFromStrorage = localStorage.getItem('shippingAddress') ? JSON.parse
    (localStorage.getItem('shippingAddress')) : {}

const paymentMethodsFromStrorage = localStorage.getItem('paymentMethod') ? JSON.parse
    (localStorage.getItem('paymentMethod')) : {}

const initailState = {
    cart: { cartItems: cartItemFromStrorage, paymentMethod: paymentMethodsFromStrorage, shippingAddress: shippingAddressFromStrorage },
    userLogin: { userInfo: userInfoFromStrorage }
}

const middleware = [thunk]

const store = createStore(reducer, initailState, composeWithDevTools(applyMiddleware(...middleware)))

export default store