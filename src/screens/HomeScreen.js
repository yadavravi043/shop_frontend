// import React,{useState,useEffect} from 'react'
// import {Row,Col} from 'react-bootstrap'
// import Product from '../components/Product'
// //import products from '../products'
// import axios from 'axios'
// const HomeScreen = () => {
//   const [products,setProducts]=useState([])
//   // useEffect(()=>{
//   //   const fetchProdcts = async ()=>{
//   //   const { data } = await axios.get('/api/products')
//   //   setProducts(data)
//   //   }
//   //   fetchProdcts()
//   // },[])

//   //here we access products from backend so mention proxy in frontend package.json
//   const fetchProdcts = async ()=>{
//   const { data } = await axios.get('/api/products')
//   setProducts(data)
//   }
//   useEffect(()=>{
//     fetchProdcts()
//   },[])
//   return (
//   <>
//     <h1>Latest Products</h1>
//     <Row>
//     {
//         products.map(it=> (
//          <Col key={it._id} sm={12} md={6} lg={4} xl={3}>
//           <Product product={it}/>
//          </Col>
//      ))
//     }
//     </Row>
//   </>
//   )
// }
// export default HomeScreen;








//after action and redux so didnt require localstate ie usestate
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  //select product here from state so selectors comesin
  //take productList which is mention in store.js
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  //const products=[]
  return (
    <>
      <h1>Latest Products</h1>
      {loading?
        //(<h2>loading...</h2>)
        <Loader/>
        :error?
        <Message variant='danger'>{error}</Message>
        : <Row>
      {products.map((it) => (
        <Col key={it._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={it} />
        </Col>
      ))}
    </Row>}
     
    </>
  );
};

export default HomeScreen;
