import React,{ useState ,useEffect} from "react"
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { Link,  useNavigate ,useParams} from "react-router-dom"
import {Button,Row ,Col,ListGroup,Image,Card} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails ,payOrder} from "../actions/orderActions"
import { ORDER_PAY_RESET } from "../constants/orderConstant"


const OrderScreen = () => {
    const params=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
 
  const orderId=params.id;
  const orderDetails=useSelector(state=>state.orderDetails)
  const {order,loading,error}=orderDetails

  const orderPay=useSelector(state=>state.orderPay)
  const {loading:loadingPay,success:successPay}=orderPay


  const [sdkReady,setSdkReady]=useState(false)

  useEffect(() => {

 const addPaypalScript = async ()=>{
  const {data:clientId}=await axios.get('/api/config/paypal')
const script= document.createElement('script')
script.type='text/javascript'
script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
script.async=true
script.onload=()=>{
  setSdkReady(true)
}
document.body.appendChild(script)
 }
    if(!order || order._id !== orderId || successPay) {
      dispatch({type:ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId))
    }
    else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript()
      }
      else{
        setSdkReady(true)
      }
    }
  }, [dispatch,order,orderId,successPay]) 


  const successPaymentHandler=(paymentResult)=>{
    dispatch(payOrder(orderId,paymentResult))
  }

  return loading ?<Loader/>
                 : error?<Message varianr='danger'>{error}</Message>
                 :<>
                 <h1>Order {order._id}</h1>
                 <Row>
     <Col md={8} >
       <ListGroup variant='flush' >
          <ListGroup.Item>
             <h1>Shipping</h1>
              
             <p>
             <strong>Name:</strong>{order.user.name}
             </p>
             <p>
               <strong>Email</strong>{''}
               <a href={`mailto:${order.user.email}`} >{order.user.email}</a>
             </p>

             <p>
             <strong>Address:</strong>
             {order.shippingAddress.address},
             {order.shippingAddress.city},
             {order.shippingAddress.postalCode},
             {order.shippingAddress.country}
             </p> 
             {order.isDelivered ?(<Message variant='success' >delivered at {order.deliveredAt}</Message>):
               (<Message variant='danger' >Not Delivered</Message>)}   
          </ListGroup.Item>

             <ListGroup.Item>
               <h1>payment method</h1>
               <p>
               <strong>Method:</strong>
               {order.paymentMethod}
               </p>
               {order.isPaid ?(<Message variant='success' >paid on {order.paidAt}</Message>):
               (<Message variant='danger' >Not Paid</Message>)}
             </ListGroup.Item>

         <ListGroup.Item>
         <h2>Order</h2>
         {order.orderItems.length===0 ? <Message> order is empty</Message>:
        (
            <ListGroup variant='flush'>
                  {order.orderItems.map((item,index)=>(
                    <ListGroup.Item key={index}>
                      <Row>
                       <Col md={1}>
                       <Image src={item.image} alt={item.name}  fluid rounded />
                       </Col>
                      <Col>
                       <Link to={`/product/${item.product}`}> {item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty}* ${item.price}=${item.price*item.qty}
                      </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
            </ListGroup>
        )}
         </ListGroup.Item>
       </ListGroup>
     </Col>


      <Col md={4}>
     <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
        <h2>order summary</h2>
        </ListGroup.Item>
         
        <ListGroup.Item>
        <Row>
        <Col>Items</Col>
        <Col>${order.itemsPrice}</Col>
        </Row>
        </ListGroup.Item>

        <ListGroup.Item>
        <Row>
        <Col>Shipping</Col>
        <Col>${order.shippingPrice}</Col>
        </Row>
        </ListGroup.Item>

        <ListGroup.Item>
        <Row>
        <Col>Tax</Col>
        <Col>${order.taxPrice}</Col>
        </Row>
        </ListGroup.Item>

        <ListGroup.Item>
        <Row>
        <Col>Total</Col>
        <Col>${order.totalPrice}</Col>
        </Row>
        </ListGroup.Item>

        
          {!order.isPaid &&(
            <ListGroup.Item>
            {loadingPay && <Loader/>}
            {!sdkReady ?<Loader/>:(
              <PayPalButton    amount={order.totalPrice}  onSuccess={successPaymentHandler}/>
            )}
            </ListGroup.Item>
          )}
        

        </ListGroup>
     </Card>
     </Col>
    </Row>

                 </>
      
}

export default OrderScreen








