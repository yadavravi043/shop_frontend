import axios from "axios"
import { ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

 } from "../constants/orderConstant"


 export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
     dispatch({
       type:ORDER_CREATE_REQUEST
     })
     //destructuring for token
     const {userLogin:{userInfo}} = getState()
     const config={
       headers:{
           'Content-Type':'application/json',
           Authorization:`Bearer ${userInfo.token}`
       },
     }
     const { data }= await axios.post(`/api/orders`,order,config)
     dispatch({
       type:ORDER_CREATE_SUCCESS,
       payload:data
     })
    //  dispatch({
    //    type:USER_LOGIN_SUCCESS,
    //    payload:data
    //  })
    //  logout.setItem('userInfo',JSON.stringify(data))
    }
    catch(error){
       dispatch({
           type:ORDER_CREATE_FAIL,
           payload:error.response && error.response.data.mesage?error.response.data.mesage:error.message,
         })
    }
   }
   
   