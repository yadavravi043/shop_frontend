import { useEffect } from "react";
import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Row, Col, Image, Card, Button, ListGroup ,Form} from "react-bootstrap";
import { addToCart } from "../actions/cartActions";
const CartScreen = () => {
  const param = useParams();
  const location = useLocation();
  const productId = param.id;
  const qty = new URLSearchParams(location.search).get("qty");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //console.log(cartItems)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler=(id)=>{

  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            your cart is empty <Link to="/">Go For Shopping</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} >
                  <Link to={`/product/${item.product}`} >{item.name}</Link>
                  </Col>
                  <Col md={2} >{item.price}</Col>
                  <Col md={2} >
                  <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x+1}</option>
                          ))}
                        </Form.Control>
                  </Col>
                  <Col md={2}>
                  <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
