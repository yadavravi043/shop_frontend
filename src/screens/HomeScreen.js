import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
//import products from '../products'
import axios from 'axios'
const HomeScreen = () => {
  const [products,setProducts]=useState([])


  // useEffect(()=>{
  //   const fetchProdcts = async ()=>{
  //   const { data } = await axios.get('/api/products')
  //   setProducts(data)
  //   }
  //   fetchProdcts()
  // },[])



  //here we access products from backend so mention proxy in frontend package.json
  const fetchProdcts = async ()=>{
  const { data } = await axios.get('/api/products')
  setProducts(data)
  }
  useEffect(()=>{
    fetchProdcts()
  },[])


  return (
  <>
    <h1>Latest Products</h1>
    <Row>
    {
        products.map(it=> (
         <Col key={it._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={it}/>
         </Col>
     ))
    }
    </Row>
  </>
  )
}

export default HomeScreen;