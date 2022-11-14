import {createStore,combineReducers,applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

const reducer=combineReducers({
    productList:productListReducer
})
const initialState={}
const middleWare=[thunk]

const store=createStore(
//const store = configureStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)
//module.exports=store
export default store