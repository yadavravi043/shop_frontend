import axios from "axios";
import { CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant";
export const addToCart=(id,qty)=> async(dispatch,getState)=>{
  const{data}=await axios.get(`/api/products/${id}`)
   
  dispatch({
    type:CART_ADD_ITEM,
    payload:{
  product:data._id,
  name:data.name,
  image:data.image,
  price:data.price,
  countInStock:data.countInStock,
  qty
    }
    })
    //it gives json or javascript object so use json.stringfy bcoz we only save string in localstorage
    //for string to json use json.parse ie see in store.js 
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart=(id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}