import {createStore,combineReducers,applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer
})
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse
(localStorage.getItem('cartItems')):[]

const initialState={
    cart:{cartItems:cartItemsFromStorage},
}
const middleWare=[thunk]

const store=createStore(
//const store = configureStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)
//module.exports=store
export default store