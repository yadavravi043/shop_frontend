import React,{ useState ,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {Form ,Row,Col,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails } from "../actions/userActions"

const ProfileScreen=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    const navigate=useNavigate()

    const dispatch=useDispatch()

    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    useEffect(()=>{
        if(!userInfo){
         navigate('/login')
        }
        else{
            if(!user || !user.name){
              console.log(user,"user1")
              dispatch(getUserDetails('profile'))
            }else{
              console.log(user,"user2")
              setName(user.name)
              setEmail(user.email)
            }
        }
    },[dispatch,userInfo,user])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage("password do not match")
        }else{
           // dispatch(register(name,email,password))
        }
    }
    return(
         <Row>
         <Col md={3}><h2>User Profile</h2>

         {message && <Message variant='danger' >{message}</Message>}
         {error && <Message variant='danger' >{error}</Message>}
         {loading && <Loader/>}
         <Form onSubmit={submitHandler} >
           <Form.Group controlId="name" >
            <Form.Label>name</Form.Label>
            <Form.Control
            type='name'
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

         <Button type='submit'variant='primary' >Update</Button>
         </Form>


</Col>
         <Col md={9}>My order</Col>
         </Row>
    )
}
export default ProfileScreen