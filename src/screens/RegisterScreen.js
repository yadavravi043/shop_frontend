import React,{ useState ,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form ,Row,Col,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"
import FormContainer from "../components/FormContainer"

const RegisterScreen=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister

    useEffect(()=>{
        if(userInfo){
         navigate('/login')
        }
    },[userInfo])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage("password do not match")
        }else{
            dispatch(register(name,email,password))
        }
    }
    return(
        <FormContainer>
         <h1>SignUp</h1>

         {message && <Message variant='danger' >{message}</Message>}
         {error && <Message variant='danger' >{error}</Message>}
         {loading && <Loader/>}
         <Form onSubmit={submitHandler} >
           <Form.Group controlId="name" >
            <Form.Label>name</Form.Label>
            <Form.Control
            type='text'
            placeholder="enter name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            >
            </Form.Control>
           </Form.Group>
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
           <Form.Group controlId="confirmPassword" >
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
            type='password'
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            >
            </Form.Control>
           </Form.Group>

         <Button type='submit'variant='primary' >Register</Button>
         </Form>


         <Row className='py-3'>
         <Col>
         Already Have an Account ?
         <Link to='/login' >
          signin
         </Link>
         </Col>
         </Row>
        
        </FormContainer>  
    )
}
export default RegisterScreen