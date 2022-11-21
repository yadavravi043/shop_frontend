import {createStore,combineReducers,applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer,userRegisterReducer,userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer'
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
     userUpdateProfile:userUpdateProfileReducer
})
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse
(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse
(localStorage.getItem('userInfo')):null

const initialState={
    cart:{cartItems:cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage},
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