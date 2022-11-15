import axios from "axios";
import { CART_ADD_ITEM,CART_REMOVE_ITEM } from "../constants/cartConstant";
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
  qty:data.qty
    }
    })
    //it gives json or javascript object so use json.stringfy bcoz we only save string in localstorage
    //for string to json use json.parse ie see in store.js 
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItems))
}