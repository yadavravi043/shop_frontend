import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
          <Form.Check
          type='radio'
            label='Paypal or Credit Card'
            id='PayPal'
            name='paymentMethod'
            value='Paypal'
            checked
            onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
            type='radio'
            label='Razor Pay'
            id='Razor Pay'
            name='paymentMethod'
            value='Razor Pay'
            onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>
            
            </Col>
            </Form.Group>

        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
