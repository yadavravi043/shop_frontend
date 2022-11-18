import React,{ useState ,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form ,Row,Col,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userActions"
import FormContainer from "../components/FormContainer"

const LoginScreen=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin

    useEffect(()=>{
        if(userInfo){
         navigate('/')
        }
    },[userInfo])

    const submitHandler=(e)=>{
        e.preventDefault()
       dispatch(login(email,password))
    }
    return(
        <FormContainer>
         <h1>SignIn</h1>

         {error && <Message variant='danger' >{error}</Message>}
         {loading && <Loader/>}
         <Form onSubmit={submitHandler} >
           <Form.Group controlId="email" >
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            placeholder="enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            >
            </Form.Control>
           </Form.Group>

           <Form.Group controlId="password" >
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder="enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            >
            </Form.Control>
           </Form.Group>

         <Button type='submit'variant='primary' >signin</Button>
         </Form>


         <Row className='py-3'>
         <Col>
         New Customer ?
         <Link to='/register' >
         Register
         </Link>
         </Col>
         </Row>
        
        </FormContainer>  
    )
}
export default LoginScreen