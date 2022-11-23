// import React ,{useState} from "react";
// import { Link, useParams } from "react-router-dom";
// import Rating from "../components/Rating";
// //import products from "../products";
// import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
// import { useEffect } from "react";
// import axios from "axios";

// const ProductScreen = ({ match }) => {
//   const params = useParams();
//   //const pro = products.find((p) => p._id === params.id);
//   const[pro,setPro]=useState({})

// const fetchProduct= async ()=>{
//   const {data}= await axios.get(`/api/products/${params.id}`);
//   setPro(data);
// }
// useEffect(()=>{
//   fetchProduct()
// },[])

//   return (
//     <>
//       <Link to="/" className="btn btn-light my-3">
//         Go Back
//       </Link>
//       <Row>
//         <Col md={6}>
//           <Image src={pro.image} alt={pro.name} fluid />
//         </Col>
//         <Col>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h3>{pro.name}</h3>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Rating value={pro.rating} text={`${pro.numReviews} reviews`} />
//             </ListGroup.Item>
//             <ListGroup.Item>Price:{pro.price}</ListGroup.Item>
//             <ListGroup.Item>Description :{pro.description}</ListGroup.Item>
//           </ListGroup>
//         </Col>

//         <Col md={3}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <Row>
//                   <Col>price:</Col>
//                   <Col>
//                     <strong>${pro.price}</strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>status:</Col>
//                   <Col>
//                     {pro.countInStock > 0 ? "In Stock" : "Out Of Stock"}
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Button
//                   className='btn-block'
//                   type='button'
//                   disabled={pro.countInStock === 0}
//                 >
//                   Add to Cart
//                 </Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ProductScreen;

//with reducer
import React, { useState } from "react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({match }) => {
  const params = useParams()
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch,match]);

const addToCartHandler = () =>{
  navigate(`/cart/${params.id}?qty=${qty}`)
  }
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price:{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description :{product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x+1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
