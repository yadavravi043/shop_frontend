import axios from "axios"
// import { json } from "react-router-dom"
import { USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS,
     USER_LOGIN_FAIL,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    
    USER_LOGOUT } from "../constants/userConstant"
export const login=(email,password)=>async(dispatch)=>{
 try{
  dispatch({
    type:USER_LOGIN_REQUEST
  })

  const config={
    headers:{
        'Content-Type':'application/json'
    }
  }
  console.log(" frontend data")
  const { data }= await axios.post('/api/users/login',{email,password},config)
  console.log(" frontend data2",data)
  dispatch({
    type:USER_LOGIN_SUCCESS,
    payload:data
  })
  localStorage.setItem('userInfo',JSON.stringify(data))
 }
 catch(error){
    dispatch({
        type:USER_LOGIN_FAIL,
        payload:error.response && error.response.data.mesage?error.response.data.mesage:error.message,
      })
 }
}


export const register=(name,email,password)=>async(dispatch)=>{
 try{
  dispatch({
    type:USER_REGISTER_REQUEST
  })

  const config={
    headers:{
        'Content-Type':'application/json'
    }
  }
  const { data }= await axios.post('/api/users',{name,email,password},config)
  dispatch({
    type:USER_REGISTER_SUCCESS,
    payload:data
  })
  dispatch({
    type:USER_LOGIN_SUCCESS,
    payload:data
  })
  localStorage.setItem('userInfo',JSON.stringify(data))
 }
 catch(error){
    dispatch({
        type:USER_REGISTER_FAIL,
        payload:error.response && error.response.data.mesage?error.response.data.mesage:error.message,
      })
 }
}
// user info consist token and if we need it we can get with help of getState
export const getUserDetails=(id)=>async(dispatch,getState)=>{
 try{
  dispatch({
    type:USER_DETAILS_REQUEST
  })
  //destructuring for token
  const {userLogin:{userInfo}} = getState()
  const config={
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
    },
  }
  const { data }= await axios.get(`/api/users/${id}`,config)
  dispatch({
    type:USER_DETAILS_SUCCESS,
    payload:data
  })
 }
 catch(error){
    dispatch({
        type:USER_DETAILS_FAIL,
        payload:error.response && error.response.data.mesage?error.response.data.mesage:error.message,
      })
 }
}
export const logout=()=>(dispatch)=>{
localStorage.removeItem('userInfo')
dispatch({
    type:USER_LOGOUT
})
}