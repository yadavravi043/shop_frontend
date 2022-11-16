import { useEffect } from "react"
import React from 'react'
import { Link ,useParams,useLocation} from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import Message from "../components/Message"
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap"
import { addToCart } from "../actions/cartActions"
const CartScreen = () => {
    const param=useParams()
    const location=useLocation()
    const productId=param.id
    const qty = new URLSearchParams(location.search).get('qty');
  const dispatch=useDispatch()

  useEffect(()=>{
     if(productId){
        dispatch(addToCart(productId,qty))
     }
  },[dispatch,productId,qty])

  return (
    <div>
      <h1>cart</h1>
    </div>
  )
}

export default CartScreen
