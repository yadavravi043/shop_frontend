import React,{ useState ,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form ,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from "../actions/cartActions"
const ShippingScreen = () => {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const [address,setAddress]=useState(shippingAddress.address)
    const[city,setCity]=useState(shippingAddress.city)
    const[postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const[country,setCountry]=useState(shippingAddress.country)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(saveShippingAddress({address,city,postalCode,country}))
      navigate('/payment')
    }
  return (
    <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler} >
           <Form.Group controlId="address" >
            <Form.Label>address</Form.Label>
            <Form.Control
            type='text'
            required
            placeholder="enter address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            >
            </Form.Control>
            </Form.Group>

           <Form.Group controlId="city" >
            <Form.Label>City</Form.Label>
            <Form.Control
            type='text'
            required
            placeholder="enter city name"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            >
            </Form.Control>
            </Form.Group>

           <Form.Group controlId="postalCode" >
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            type='text'
            required
            placeholder="enter postal code"
            value={postalCode}
            onChange={(e)=>setPostalCode(e.target.value)}
            >
            </Form.Control>
            </Form.Group>
        
           <Form.Group controlId="country" >
            <Form.Label>country</Form.Label>
            <Form.Control
            type='text'
            required
            placeholder="enter country"
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            >
            </Form.Control>
            </Form.Group>
        
           <Button type="submit" variant='primary' >continue</Button>

            </Form>
    </FormContainer>
  )
}

export default ShippingScreen
